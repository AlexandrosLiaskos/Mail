// Phase 1 connectivity proof — UoA IMAPS.
//
// Run:
//   deno run -A --node-modules-dir scripts/imap-probe.ts
//
// Credentials are read from env (never hard-code, never log).
//   UOA_USER  — e.g. "alexliaskos"
//   UOA_PASS  — UoA password
//
// On success, prints INBOX message + unseen counts plus the latest 5 envelopes.
// This is the exact same code that will live in
// supabase/functions/imap-ping/index.ts — only the transport wrapper differs.

import { ImapFlow } from "npm:imapflow@1.0.182";

const user = Deno.env.get("UOA_USER");
const pass = Deno.env.get("UOA_PASS");

if (!user || !pass) {
  console.error("error: set UOA_USER and UOA_PASS in the environment.");
  Deno.exit(2);
}

const client = new ImapFlow({
  host: "mail.uoa.gr",
  port: 993,
  secure: true,
  auth: { user, pass },
  logger: false,
});

try {
  console.log("connect → mail.uoa.gr:993 (TLS)…");
  await client.connect();
  console.log("authenticated as %s", user);

  const lock = await client.getMailboxLock("INBOX");
  try {
    const status = await client.status("INBOX", {
      messages: true,
      unseen: true,
      uidNext: true,
    });
    console.log("INBOX status:", status);

    console.log("\nlatest 5 envelopes:");
    const total = status.messages ?? 0;
    const from = Math.max(1, total - 4);
    for await (const msg of client.fetch(`${from}:*`, { envelope: true, uid: true })) {
      const env = msg.envelope;
      const subj = (env?.subject ?? "").slice(0, 70);
      const fromAddr = env?.from?.[0];
      const fromStr = fromAddr ? `${fromAddr.name || ""} <${fromAddr.address}>`.trim() : "—";
      console.log(`  uid=${msg.uid}  ${env?.date?.toISOString().slice(0, 16) ?? ""}  ${fromStr.padEnd(50).slice(0, 50)}  ${subj}`);
    }
  } finally {
    lock.release();
  }

  console.log("\nfolder list:");
  for await (const f of client.list()) {
    console.log(`  ${f.flags.size ? "[" + [...f.flags].join(",") + "]" : ""}  ${f.path}`);
  }

  await client.logout();
  console.log("\nok ✓");
} catch (err) {
  console.error("FAILED:", err instanceof Error ? err.message : err);
  try { await client.logout(); } catch (_) { /* ignore */ }
  Deno.exit(1);
}
