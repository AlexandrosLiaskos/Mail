-- 0002_user_mail_credentials.sql
-- One row per app user, linking their auth.users record to:
--   * the UoA IMAP username (plain text — not a secret)
--   * a vault.secrets row holding the password (encrypted)
--
-- RLS: the row is readable / writable only by its owner. The secret itself
-- is never exposed to the client — only the secret_id pointer is. Edge
-- Functions retrieve the decrypted password via the SECURITY DEFINER
-- function defined in 0005_get_uoa_creds.sql.

create table public.user_mail_credentials (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  imap_user  text not null,
  secret_id  uuid not null references vault.secrets (id) on delete restrict,
  imap_host  text not null default 'mail.uoa.gr',
  imap_port  int  not null default 993,
  smtp_host  text not null default 'smtp.uoa.gr',
  smtp_port  int  not null default 465,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.user_mail_credentials is
  'UoA IMAP/SMTP credentials. Password is in vault.secrets, referenced by secret_id.';

alter table public.user_mail_credentials enable row level security;

create policy "owner can read own credentials"
  on public.user_mail_credentials for select
  using (auth.uid() = user_id);

create policy "owner can insert own credentials"
  on public.user_mail_credentials for insert
  with check (auth.uid() = user_id);

create policy "owner can update own credentials"
  on public.user_mail_credentials for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "owner can delete own credentials"
  on public.user_mail_credentials for delete
  using (auth.uid() = user_id);

-- updated_at trigger
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger user_mail_credentials_touch
  before update on public.user_mail_credentials
  for each row execute function public.touch_updated_at();
