-- UNITY security hardening: keep trigger-only function out of the public RPC surface.
create or replace function public.is_unity_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'unity_role') = 'admin', false);
$$;

revoke all on function public.handle_new_unity_user() from public, anon, authenticated;
