// imap-ping — connectivity proof, wrapped as a Supabase Edge Function.
//
// Mirror of scripts/imap-probe.ts. POST { user, pass } and get back
// INBOX status + folder list. Used once to confirm Supabase Edge Functions
// can reach mail.uoa.gr from their network; superseded once the real
// IMAP endpoints exist.

import { ImapFlow } from "npm:imapflow@1.0.182";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("POST only", { status: 405 });
  }

  let body: { user?: string; pass?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }
  const { user, pass } = body;
  if (!user || !pass) {
    return Response.json({ ok: false, error: "user and pass required" }, { status: 400 });
  }

  const client = new ImapFlow({
    host: "mail.uoa.gr",
    port: 993,
    secure: true,
    auth: { user, pass },
    logger: false,
  });

  try {
    await client.connect();
    const lock = await client.getMailboxLock("INBOX");
    let status;
    try {
      status = await client.status("INBOX", {
        messages: true,
        unseen: true,
        uidNext: true,
      });
    } finally {
      lock.release();
    }

    const folders: Array<{ path: string; flags: string[] }> = [];
    for await (const f of client.list()) {
      folders.push({ path: f.path, flags: [...f.flags] });
    }

    await client.logout();
    return Response.json({ ok: true, status, folders });
  } catch (err) {
    try { await client.logout(); } catch { /* ignore */ }
    return Response.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 502 },
    );
  }
});
