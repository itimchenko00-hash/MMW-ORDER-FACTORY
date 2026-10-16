-- UNITY initial schema. Apply only to the dedicated UNITY Supabase project.
-- Authentication secrets stay in Supabase Auth; never store passwords in public tables.
create extension if not exists pgcrypto;

create type public.account_status as enum ('pending', 'active', 'rejected', 'suspended');
create type public.profile_visibility as enum ('public', 'connections', 'private');
create type public.connection_status as enum ('pending', 'accepted', 'rejected');
create type public.content_status as enum ('published', 'hidden', 'removed', 'pending_review');
create type public.report_status as enum ('open', 'reviewing', 'resolved', 'dismissed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  handle text not null unique check (handle = lower(handle) and handle ~ '^[a-z0-9_]{3,24}$'),
  display_name text not null check (char_length(trim(display_name)) between 1 and 80),
  bio text not null default '' check (char_length(bio) <= 500),
  avatar_path text,
  visibility public.profile_visibility not null default 'public',
  account_status public.account_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.friendships (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references public.profiles(id) on delete cascade,
  addressee_id uuid not null references public.profiles(id) on delete cascade,
  status public.connection_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (requester_id <> addressee_id),
  unique (requester_id, addressee_id)
);
create index friendships_addressee_status_idx on public.friendships(addressee_id, status);

create table public.blocks (
  blocker_id uuid not null references public.profiles(id) on delete cascade,
  blocked_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id),
  check (blocker_id <> blocked_id)
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(trim(body)) between 1 and 10000),
  visibility public.profile_visibility not null default 'public',
  status public.content_status not null default 'pending_review',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index posts_author_created_idx on public.posts(author_id, created_at desc);
create index posts_feed_idx on public.posts(status, created_at desc);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(trim(body)) between 1 and 3000),
  status public.content_status not null default 'pending_review',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index comments_post_created_idx on public.comments(post_id, created_at);

create table public.reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  reaction_type text not null default 'like' check (reaction_type in ('like', 'support', 'celebrate')),
  created_at timestamptz not null default now(),
  unique (post_id, user_id, reaction_type)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(trim(body)) between 1 and 5000),
  created_at timestamptz not null default now(),
  read_at timestamptz,
  check (sender_id <> recipient_id)
);
create index messages_conversation_idx on public.messages(sender_id, recipient_id, created_at desc);

create table public.communities (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.profiles(id) on delete restrict,
  name text not null check (char_length(trim(name)) between 3 and 80),
  description text not null default '' check (char_length(description) <= 1000),
  is_private boolean not null default false,
  status public.content_status not null default 'pending_review',
  created_at timestamptz not null default now()
);
create table public.community_members (
  community_id uuid not null references public.communities(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member' check (role in ('member', 'moderator', 'owner')),
  joined_at timestamptz not null default now(),
  primary key (community_id, user_id)
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  target_type text not null check (target_type in ('profile', 'post', 'comment', 'message', 'community')),
  target_id uuid not null,
  category text not null check (category in ('spam', 'harassment', 'hate', 'violence', 'sexual_content', 'impersonation', 'privacy', 'other')),
  details text not null default '' check (char_length(details) <= 2000),
  status public.report_status not null default 'open',
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);
create index reports_status_created_idx on public.reports(status, created_at);

create table public.moderation_actions (
  id uuid primary key default gen_random_uuid(),
  moderator_id uuid not null references public.profiles(id) on delete restrict,
  target_type text not null,
  target_id uuid not null,
  action text not null check (action in ('approve_account', 'reject_account', 'suspend_account', 'restore_account', 'hide_content', 'remove_content', 'resolve_report')),
  reason text not null check (char_length(trim(reason)) between 3 and 1000),
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  kind text not null,
  payload jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index notifications_recipient_created_idx on public.notifications(recipient_id, created_at desc);

create table public.audit_events (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  event_type text not null,
  target_type text,
  target_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Trust decisions are based on server-controlled app_metadata, never user-editable user_metadata.
create or replace function public.is_unity_admin()
returns boolean
language sql stable
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'unity_role') = 'admin', false);
$$;

-- Create a pending profile on Auth signup. The handle/display_name are profile input only.
create or replace function public.handle_new_unity_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  requested_handle text;
  requested_name text;
begin
  requested_handle := lower(coalesce(new.raw_user_meta_data ->> 'handle', ''));
  requested_name := trim(coalesce(new.raw_user_meta_data ->> 'display_name', ''));
  if requested_handle !~ '^[a-z0-9_]{3,24}$' or char_length(requested_name) < 1 or char_length(requested_name) > 80 then
    raise exception 'Valid handle and display_name are required';
  end if;
  insert into public.profiles(id, handle, display_name, account_status)
  values (new.id, requested_handle, requested_name, 'pending');
  return new;
end;
$$;

create trigger on_auth_user_created_unity
after insert on auth.users
for each row execute function public.handle_new_unity_user();

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = ''
as $$ begin new.updated_at = now(); return new; end; $$;
create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
create trigger posts_updated_at before update on public.posts
for each row execute function public.set_updated_at();
create trigger comments_updated_at before update on public.comments
for each row execute function public.set_updated_at();
create trigger friendships_updated_at before update on public.friendships
for each row execute function public.set_updated_at();

-- Enable RLS everywhere in the exposed schema.
alter table public.profiles enable row level security;
alter table public.friendships enable row level security;
alter table public.blocks enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.reactions enable row level security;
alter table public.messages enable row level security;
alter table public.communities enable row level security;
alter table public.community_members enable row level security;
alter table public.reports enable row level security;
alter table public.moderation_actions enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_events enable row level security;

-- Column grants prevent a user changing account_status/handle/identity fields via the Data API.
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to anon, authenticated;
grant update(display_name, bio, avatar_path, visibility) on public.profiles to authenticated;
grant select, insert, delete on public.friendships to authenticated;
grant update(status) on public.friendships to authenticated;
grant select, insert, update, delete on public.blocks to authenticated;
grant select, insert, delete on public.posts, public.comments, public.reactions, public.messages, public.communities, public.community_members, public.reports to authenticated;
grant update(body, visibility) on public.posts to authenticated;
grant update(body) on public.comments to authenticated;
grant update(read_at) on public.messages to authenticated;
grant update(read_at) on public.notifications to authenticated;
grant update(name, description, is_private) on public.communities to authenticated;
grant select, insert, delete on public.notifications to authenticated;
grant select on public.moderation_actions to authenticated;
grant select on public.audit_events to authenticated;

create policy "public profiles visible by visibility" on public.profiles
for select to anon, authenticated
using (
  account_status = 'active'
  and (
    visibility = 'public'
    or id = auth.uid()
    or public.is_unity_admin()
    or (visibility = 'connections' and exists (
      select 1 from public.friendships f
      where f.status = 'accepted'
        and ((f.requester_id = profiles.id and f.addressee_id = auth.uid())
          or (f.addressee_id = profiles.id and f.requester_id = auth.uid()))
    ))
  )
  or id = auth.uid()
  or public.is_unity_admin()
);
create policy "users update own editable profile" on public.profiles
for update to authenticated
using (id = auth.uid() and account_status in ('pending', 'active'))
with check (id = auth.uid() and account_status in ('pending', 'active'));

create policy "friendship participants read" on public.friendships for select to authenticated
using (requester_id = auth.uid() or addressee_id = auth.uid() or public.is_unity_admin());
create policy "active users send connection requests" on public.friendships for insert to authenticated
with check (requester_id = auth.uid() and exists(select 1 from public.profiles p where p.id = auth.uid() and p.account_status = 'active') and not exists(select 1 from public.blocks b where (b.blocker_id = auth.uid() and b.blocked_id = addressee_id) or (b.blocker_id = addressee_id and b.blocked_id = auth.uid())));
create policy "recipient or admin handles connection" on public.friendships for update to authenticated
using (addressee_id = auth.uid() or public.is_unity_admin())
with check (addressee_id = auth.uid() or public.is_unity_admin());
create policy "requester cancels pending connection" on public.friendships for delete to authenticated
using (requester_id = auth.uid() or public.is_unity_admin());

create policy "participants manage own blocks" on public.blocks for all to authenticated
using (blocker_id = auth.uid() or public.is_unity_admin())
with check (blocker_id = auth.uid() or public.is_unity_admin());

create policy "read published visible posts" on public.posts for select to anon, authenticated
using (
  public.is_unity_admin()
  or (status = 'published' and exists (
    select 1 from public.profiles p where p.id = posts.author_id and p.account_status = 'active'
      and (p.visibility = 'public' or p.id = auth.uid()
        or (p.visibility = 'connections' and exists(select 1 from public.friendships f where f.status='accepted' and ((f.requester_id=p.id and f.addressee_id=auth.uid()) or (f.addressee_id=p.id and f.requester_id=auth.uid())))))
  ))
  or author_id = auth.uid()
);
create policy "active users create own posts" on public.posts for insert to authenticated
with check (author_id = auth.uid() and status = 'pending_review' and exists(select 1 from public.profiles p where p.id=auth.uid() and p.account_status='active'));
create policy "authors edit own posts" on public.posts for update to authenticated
using (author_id = auth.uid() or public.is_unity_admin())
with check (author_id = auth.uid() or public.is_unity_admin());
create policy "authors delete own posts" on public.posts for delete to authenticated using (author_id = auth.uid() or public.is_unity_admin());

create policy "comments visible with visible post" on public.comments for select to anon, authenticated
using (
  author_id = auth.uid() or public.is_unity_admin()
  or (status = 'published' and exists (
    select 1 from public.posts p
    join public.profiles author_profile on author_profile.id = p.author_id
    where p.id = comments.post_id and p.status = 'published'
      and author_profile.account_status = 'active'
      and (p.visibility = 'public' or p.author_id = auth.uid()
        or (p.visibility = 'connections' and exists(select 1 from public.friendships f where f.status='accepted' and ((f.requester_id=p.author_id and f.addressee_id=auth.uid()) or (f.addressee_id=p.author_id and f.requester_id=auth.uid())))))
  ))
);
create policy "active users comment" on public.comments for insert to authenticated
with check (author_id = auth.uid() and status = 'pending_review' and exists(select 1 from public.profiles p where p.id=auth.uid() and p.account_status='active'));
create policy "authors or admin update comments" on public.comments for update to authenticated
using (author_id = auth.uid() or public.is_unity_admin())
with check (author_id = auth.uid() or public.is_unity_admin());
create policy "authors or admin delete comments" on public.comments for delete to authenticated
using (author_id = auth.uid() or public.is_unity_admin());

create policy "reactions visible with published post" on public.reactions for select to anon, authenticated
using (exists(select 1 from public.posts p where p.id=post_id and p.status='published') or user_id=auth.uid() or public.is_unity_admin());
create policy "active users react" on public.reactions for insert to authenticated
with check (user_id=auth.uid() and exists(select 1 from public.profiles p where p.id=auth.uid() and p.account_status='active'));
create policy "users remove own reactions" on public.reactions for delete to authenticated using (user_id=auth.uid() or public.is_unity_admin());

create policy "message participants read" on public.messages for select to authenticated
using ((sender_id=auth.uid() or recipient_id=auth.uid()) and not exists(select 1 from public.blocks b where (b.blocker_id=sender_id and b.blocked_id=recipient_id) or (b.blocker_id=recipient_id and b.blocked_id=sender_id)) or public.is_unity_admin());
create policy "active users send messages" on public.messages for insert to authenticated
with check (sender_id=auth.uid() and exists(select 1 from public.profiles p where p.id=auth.uid() and p.account_status='active') and not exists(select 1 from public.blocks b where (b.blocker_id=sender_id and b.blocked_id=recipient_id) or (b.blocker_id=recipient_id and b.blocked_id=sender_id)));
create policy "recipient marks messages read" on public.messages for update to authenticated
using (recipient_id=auth.uid()) with check (recipient_id=auth.uid());

create policy "visible communities read" on public.communities for select to anon, authenticated
using ((status='published' and (not is_private or exists(select 1 from public.community_members m where m.community_id=id and m.user_id=auth.uid()))) or creator_id=auth.uid() or public.is_unity_admin());
create policy "active users propose communities" on public.communities for insert to authenticated
with check (creator_id=auth.uid() and status='pending_review' and exists(select 1 from public.profiles p where p.id=auth.uid() and p.account_status='active'));
create policy "creator or admin update community" on public.communities for update to authenticated
using (creator_id=auth.uid() or public.is_unity_admin()) with check (creator_id=auth.uid() or public.is_unity_admin());
create policy "creator or admin delete community" on public.communities for delete to authenticated using (creator_id=auth.uid() or public.is_unity_admin());

create policy "members see own membership or admins" on public.community_members for select to authenticated
using (user_id = auth.uid() or public.is_unity_admin());
create policy "users join as member" on public.community_members for insert to authenticated
with check (user_id=auth.uid() and role='member' and exists(select 1 from public.profiles p where p.id=auth.uid() and p.account_status='active'));
create policy "users leave or admin manage membership" on public.community_members for delete to authenticated
using (user_id=auth.uid() or public.is_unity_admin());

create policy "users create reports" on public.reports for insert to authenticated
with check (reporter_id=auth.uid() and exists(select 1 from public.profiles p where p.id=auth.uid() and p.account_status='active'));
create policy "reporter reads own report or admin" on public.reports for select to authenticated
using (reporter_id=auth.uid() or public.is_unity_admin());
create policy "admins update reports" on public.reports for update to authenticated
using (public.is_unity_admin()) with check (public.is_unity_admin());

create policy "admins read moderation actions" on public.moderation_actions for select to authenticated using (public.is_unity_admin());
create policy "admins create moderation actions" on public.moderation_actions for insert to authenticated with check (public.is_unity_admin() and moderator_id=auth.uid());
create policy "users read own notifications" on public.notifications for select to authenticated using (recipient_id=auth.uid() or public.is_unity_admin());
create policy "users update own notifications" on public.notifications for update to authenticated using (recipient_id=auth.uid()) with check (recipient_id=auth.uid());
create policy "admins read audit" on public.audit_events for select to authenticated using (public.is_unity_admin());
-- No direct insert/update/delete policies for audit_events: writes must be server-controlled.
