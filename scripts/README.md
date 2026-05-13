# scripts/

One-off operational scripts. Not part of the deployed app.

## imap-probe.ts — Phase 1 connectivity proof

Verifies that we can authenticate to `mail.uoa.gr:993` over IMAPS with a
UoA username + password and list the INBOX. Same code path that goes into
the `imap-ping` Edge Function later.

### Run

PowerShell:

```powershell
$env:UOA_USER = "alexliaskos"
$env:UOA_PASS = "<your-uoa-password>"
deno run -A --node-modules-dir scripts/imap-probe.ts
Remove-Item Env:UOA_PASS
```

bash:

```bash
UOA_USER=alexliaskos UOA_PASS='…' deno run -A --node-modules-dir scripts/imap-probe.ts
```

Expected output: a non-zero message count, five latest envelopes, the
list of mailboxes (INBOX, Sent/Απεσταλμένα, Drafts/Πρόχειρα, …), and
`ok ✓`. If TLS/auth fails, the error is the failure point we need to
debug before going further.

The script never logs the password.
