# Liaskos Mail

A private webmail client for `alexliaskos@uoa.gr`, talking directly to the
University of Athens mail servers:

- IMAP `mail.uoa.gr:993` (implicit TLS)
- SMTP `smtp.uoa.gr:465` (implicit TLS)

Frontend: Next.js (App Router) on Vercel. Backend: Supabase project (in
the Liaskos org) — Edge Functions act as the IMAP/SMTP proxy, Postgres
caches headers, Vault holds the UoA password.

Design language: editorial classicism — hairline rules, serif italic
voice copy, monochrome surfaces, three voices + one calligraphic
flourish. See `Prototype/` for the original design canvas.

---

## Status

Phase 1 — connectivity proof. `scripts/imap-probe.ts` verifies that
Deno can authenticate to `mail.uoa.gr` over IMAPS.

## Layout

```
Mail/
├── Prototype/                  # original design canvas (read-only)
├── scripts/
│   └── imap-probe.ts           # Phase 1 connectivity proof (Deno)
├── supabase/
│   ├── config.toml
│   └── functions/
│       └── imap-ping/index.ts  # same probe, wrapped as Edge Function
├── src/
│   ├── app/                    # Next.js App Router
│   └── styles/editorial.css    # editorial classicism tokens
└── package.json
```

## Running

### Phase 1 — connectivity probe (no Supabase needed)

```powershell
$env:UOA_USER = "alexliaskos"
$env:UOA_PASS = "<your-uoa-password>"
deno run -A --node-modules-dir scripts/imap-probe.ts
Remove-Item Env:UOA_PASS
```

### Next.js dev server

```powershell
npm install
npm run dev
```

### Supabase locally (once installed)

```powershell
supabase start
supabase functions serve imap-ping --no-verify-jwt
```
