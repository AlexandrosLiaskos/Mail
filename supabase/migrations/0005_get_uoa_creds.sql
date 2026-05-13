-- 0005_get_uoa_creds.sql
-- SECURITY DEFINER function called from Edge Functions to fetch the
-- decrypted UoA password for the current authenticated user.
--
-- Why SECURITY DEFINER: vault.decrypted_secrets is owned by 'supabase_admin'
-- and is not readable by 'authenticated'. We expose ONLY the secret for the
-- caller's own row, never anyone else's — enforced by the WHERE clause on
-- auth.uid().
--
-- Why a function (not a view): we want a single, narrow grant surface.

create or replace function public.get_uoa_creds()
returns table (
  imap_user text,
  imap_pass text,
  imap_host text,
  imap_port int,
  smtp_host text,
  smtp_port int
)
language sql
security definer
set search_path = public, vault
as $$
  select
    c.imap_user,
    s.decrypted_secret as imap_pass,
    c.imap_host,
    c.imap_port,
    c.smtp_host,
    c.smtp_port
  from public.user_mail_credentials c
  join vault.decrypted_secrets s on s.id = c.secret_id
  where c.user_id = auth.uid()
  limit 1
$$;

revoke all on function public.get_uoa_creds() from public;
grant execute on function public.get_uoa_creds() to authenticated;

comment on function public.get_uoa_creds() is
  'Returns UoA IMAP/SMTP credentials for the current authenticated user. '
  'Password is decrypted from Vault. Edge Functions only.';
