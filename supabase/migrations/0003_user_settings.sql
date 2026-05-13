-- 0003_user_settings.sql
-- Per-user preferences: which IMAP folder is "Sent" (UoA may name it
-- "Απεσταλμένα"), poll interval, signature, etc. Single row per user.

create table public.user_settings (
  user_id        uuid primary key references auth.users (id) on delete cascade,
  sent_folder    text,                  -- e.g. 'Sent' or 'Απεσταλμένα'
  drafts_folder  text,
  trash_folder   text,
  junk_folder    text,
  poll_seconds   int  not null default 30,
  signature      text,                  -- HTML or text; appended in compose
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

alter table public.user_settings enable row level security;

create policy "owner rw own settings"
  on public.user_settings for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create trigger user_settings_touch
  before update on public.user_settings
  for each row execute function public.touch_updated_at();
