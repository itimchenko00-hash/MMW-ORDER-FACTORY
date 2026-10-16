-- UNITY signup profile fields: persist the optional bio and visibility selected at registration.
-- Preserve the safe fallback for dashboard-created users without profile metadata.
create or replace function public.handle_new_unity_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  requested_handle text;
  requested_name text;
  requested_bio text;
  requested_visibility public.profile_visibility;
begin
  requested_handle := lower(coalesce(new.raw_user_meta_data ->> 'handle', ''));
  requested_name := trim(coalesce(new.raw_user_meta_data ->> 'display_name', ''));
  requested_bio := trim(coalesce(new.raw_user_meta_data ->> 'bio', ''));
  if char_length(requested_bio) > 500 then
    raise exception 'Bio must be 500 characters or fewer';
  end if;

  if requested_handle = '' and requested_name = '' then
    requested_handle := 'member_' || left(replace(new.id::text, '-', ''), 12);
    requested_name := coalesce(nullif(trim(split_part(coalesce(new.email, ''), '@', 1)), ''), 'Новый участник');
    requested_name := left(requested_name, 80);
  elsif requested_handle !~ '^[a-z0-9_]{3,24}$' or char_length(requested_name) < 1 or char_length(requested_name) > 80 then
    raise exception 'Valid handle and display_name are required';
  end if;

  begin
    requested_visibility := coalesce(nullif(new.raw_user_meta_data ->> 'visibility', '')::public.profile_visibility, 'public'::public.profile_visibility);
  exception when invalid_text_representation then
    raise exception 'Invalid profile visibility';
  end;

  insert into public.profiles(id, handle, display_name, bio, visibility, account_status)
  values (new.id, requested_handle, requested_name, requested_bio, requested_visibility, 'pending');
  return new;
end;
$$;

revoke all on function public.handle_new_unity_user() from public, anon, authenticated;
