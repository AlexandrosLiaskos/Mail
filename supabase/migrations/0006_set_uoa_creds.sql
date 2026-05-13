-- 0006_set_uoa_creds.sql
-- Upsert the current user's UoA credentials. Stores the password in Vault
-- and writes (or updates) the public.user_mail_credentials row.
--
-- Call from the credentials-setup page:
--   select public.set_uoa_creds('alexliaskos', '<password>');
-- Returns nothing on success; throws on failure.

create or replace function public.set_uoa_creds(
  p_imap_user text,
  p_imap_pass text
)
returns void
language plpgsql
security definer
set search_path = public, vault
as $$
declare
  v_uid uuid := auth.uid();
  v_existing_secret_id uuid;
  v_new_secret_id uuid;
  v_secret_name text;
begin
  if v_uid is null then
    raise exception 'not authenticated';
  end if;
  if length(coalesce(p_imap_user, '')) = 0 or length(coalesce(p_imap_pass, '')) = 0 then
    raise exception 'imap_user and imap_pass required';
  end if;

  v_secret_name := 'uoa_imap_pass:' || v_uid::text;

  select secret_id into v_existing_secret_id
  from public.user_mail_credentials
  where user_id = v_uid;

  if v_existing_secret_id is not null then
    -- Rotate the password in place.
    perform vault.update_secret(v_existing_secret_id, p_imap_pass, v_secret_name, 'UoA IMAP password');
    update public.user_mail_credentials
      set imap_user = p_imap_user
      where user_id = v_uid;
  else
    v_new_secret_id := vault.create_secret(p_imap_pass, v_secret_name, 'UoA IMAP password');
    insert into public.user_mail_credentials (user_id, imap_user, secret_id)
      values (v_uid, p_imap_user, v_new_secret_id);
  end if;
end;
$$;

revoke all on function public.set_uoa_creds(text, text) from public;
grant execute on function public.set_uoa_creds(text, text) to authenticated;

comment on function public.set_uoa_creds(text, text) is
  'Stores or rotates the current authenticated user''s UoA password in Vault.';
