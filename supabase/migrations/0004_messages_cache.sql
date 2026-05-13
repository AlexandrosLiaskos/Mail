-- 0004_messages_cache.sql
-- Optimistic header cache so the inbox renders instantly while IMAP
-- catches up. Truth is always IMAP — this cache is a courtesy, freely
-- discardable. Bodies are NOT cached (size + privacy).

create table public.messages_cache (
  user_id       uuid not null references auth.users (id) on delete cascade,
  folder        text not null,
  uid           bigint not null,           -- IMAP UID, stable within folder + uidvalidity
  uidvalidity   bigint not null,           -- if this changes server-side, drop cache for folder
  msg_id        text,                      -- RFC 822 Message-ID header
  from_name     text,
  from_addr     text,
  to_addrs      text[],
  subject       text,
  snippet       text,                      -- first ~200 chars of plaintext body
  internal_date timestamptz,               -- IMAP INTERNALDATE
  size_bytes    int,
  flags         text[] not null default '{}',
  has_attach    boolean not null default false,
  cached_at     timestamptz not null default now(),
  primary key (user_id, folder, uidvalidity, uid)
);

create index messages_cache_user_folder_date_idx
  on public.messages_cache (user_id, folder, internal_date desc);

create index messages_cache_user_unseen_idx
  on public.messages_cache (user_id, folder)
  where not (flags @> array['\Seen']);

alter table public.messages_cache enable row level security;

create policy "owner rw own cache"
  on public.messages_cache for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
