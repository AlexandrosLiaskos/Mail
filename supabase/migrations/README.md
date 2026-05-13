# supabase/migrations

Run these in order in the Supabase **SQL Editor** (Dashboard → SQL Editor →
New query). Each file is idempotent enough to run once; re-running will
fail loudly on `create table`. If you need to redo a step, drop the
created object first.

| #    | File                              | Purpose                                                 |
|------|-----------------------------------|---------------------------------------------------------|
| 0001 | `0001_vault.sql`                  | Enable `supabase_vault` extension.                      |
| 0002 | `0002_user_mail_credentials.sql`  | Table + RLS for the UoA-creds pointer row.              |
| 0003 | `0003_user_settings.sql`          | Per-user preferences (sent-folder name, poll interval). |
| 0004 | `0004_messages_cache.sql`         | Optional header cache for fast inbox render.            |
| 0005 | `0005_get_uoa_creds.sql`          | `public.get_uoa_creds()` — read decrypted password.     |
| 0006 | `0006_set_uoa_creds.sql`          | `public.set_uoa_creds(user, pass)` — write to Vault.    |

## Smoke test

After 0006, while logged in as the app user, run in the SQL Editor as
that user (or via the API, since the Editor runs as service_role):

```sql
-- impersonate yourself for the test
select set_config('request.jwt.claim.sub', '<your auth.users.id uuid>', true);

select public.set_uoa_creds('alexliaskos', 'fake-password-only-for-test');

select * from public.get_uoa_creds();
-- Expected: one row with imap_user='alexliaskos', imap_pass='fake-password…'
```

Don't leave a real password in the database from the SQL Editor — use the
app's credentials page once the UI is up. The smoke test is just to prove
the Vault round-trip works.

## Tearing down (dev only)

```sql
drop function if exists public.set_uoa_creds(text, text);
drop function if exists public.get_uoa_creds();
drop table if exists public.messages_cache;
drop table if exists public.user_settings;
drop table if exists public.user_mail_credentials;
drop function if exists public.touch_updated_at();
-- Vault extension is kept; dropping it would wipe encrypted secrets.
```
