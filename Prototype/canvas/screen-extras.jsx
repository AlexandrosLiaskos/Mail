// Compose modal, settings, search, empty state. Minimalist v2.

// ─────────────────────────────────────────────────────────────
// Compose — bottom-right drawer modal. To · Subject · body · Send.
// ─────────────────────────────────────────────────────────────
function ScreenCompose() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
        <ScreenInbox density="medium" />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,18,14,0.30)' }} />

      <div style={{
        position: 'absolute', bottom: 0, right: 40, width: 640, height: 580,
        background: PAPER, borderRadius: '4px 4px 0 0',
        boxShadow: '0 24px 60px rgba(20,18,14,0.30)',
        display: 'flex', flexDirection: 'column', fontFamily: SANS, overflow: 'hidden',
      }}>
        {/* header */}
        <div style={{
          padding: '14px 26px', borderBottom: `1px solid ${HAIR}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 16, color: INK }}>
            Reply
          </span>
          <Label color={GREY}>✕</Label>
        </div>

        {/* field rows */}
        <ComposeRow label="To">
          <Mono size={13} color={INK}>takis@di.uoa.gr</Mono>
        </ComposeRow>
        <ComposeRow label="Subject">
          <span style={{ fontFamily: SERIF, fontSize: 16, color: INK }}>
            Re: Πτυχιακή εργασία — προσχέδιο κεφαλαίου 3
          </span>
        </ComposeRow>

        {/* body */}
        <div style={{ flex: 1, padding: '24px 26px', overflow: 'auto' }}>
          <div style={{ fontFamily: SERIF, fontSize: 16, lineHeight: 1.7, color: INK2 }}>
            <p style={{ margin: 0, marginBottom: 16 }}>Καθηγητά,</p>
            <p style={{ margin: 0, marginBottom: 16 }}>
              Σας ευχαριστώ για τα σχόλια. Θα αναθεωρήσω την επαγωγή στο Λήμμα 3.4.2
              και θα προσθέσω ρητή αναφορά στο πλαίσιο Murphy (2019) στην εισαγωγή
              του κεφαλαίου.
            </p>
            <p style={{ margin: 0, marginBottom: 16 }}>
              Θα είμαι διαθέσιμος την Πέμπτη 15:00 στο γραφείο σας.
            </p>
            <p style={{ margin: 0, marginBottom: 28 }}>Με εκτίμηση,</p>
            <p style={{ margin: 0, color: GREY }}>— Αλέξανδρος</p>
          </div>

          <div style={{
            marginTop: 28, paddingTop: 16, borderTop: `1px dashed ${HAIR}`,
            paddingLeft: 14, borderLeft: `1px solid ${GREY2}`, marginLeft: 0,
            fontFamily: SERIF, fontStyle: 'italic', fontSize: 13, color: GREY2, lineHeight: 1.6,
          }}>
            On 14 May, Καθ. Π. Σταματόπουλος wrote: Αλέξανδρε, διάβασα το προσχέδιο.
            Καλή κατεύθυνση συνολικά, αλλά χρειάζονται διορθώσεις…
          </div>
        </div>

        {/* footer */}
        <div style={{
          padding: '14px 26px', borderTop: `1px solid ${HAIR}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <Label color={GREY}>Attach</Label>
          <CTA small>Send</CTA>
        </div>
      </div>
    </div>
  );
}

function ComposeRow({ label, children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', gap: 18, padding: '12px 26px',
      borderBottom: `1px dashed ${HAIR}`,
    }}>
      <div style={{ width: 56 }}><Label color={GREY}>{label}</Label></div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Search results — single-pane, plain.
// ─────────────────────────────────────────────────────────────
function ScreenSearch() {
  const hits = MESSAGES.filter((m) =>
    /εξετ|exam|seminar|verification|distributed|erasmus/i.test(m.subject + m.preview)
  );

  return (
    <div style={{ width: '100%', height: '100%', background: PAPER, display: 'flex', flexDirection: 'column', fontFamily: SANS }}>
      <div style={{
        borderBottom: `1px solid ${HAIR}`, padding: '18px 32px',
        display: 'flex', gap: 24, alignItems: 'center',
      }}>
        <div style={{ fontFamily: SERIF, fontSize: 22, color: INK, whiteSpace: 'nowrap' }}>
          Liaskos <span style={{ fontStyle: 'italic', color: GREY }}>Mail</span>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${INK}`, paddingBottom: 6 }}>
          <svg width="12" height="12" viewBox="0 0 13 13" fill="none" stroke={INK} strokeWidth="1.2">
            <circle cx="5.5" cy="5.5" r="4" /><path d="M9 9l3 3" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 16, color: INK }}>
            verification <span style={{ color: GREY }}>or</span> erasmus
          </span>
        </div>
      </div>

      <div style={{ padding: '56px 32px 32px' }}>
        <div style={{
          fontFamily: SERIF, fontSize: 30, color: INK, letterSpacing: '-0.005em',
        }}>
          <span style={{ fontStyle: 'italic', color: GREY }}>Three</span> results.
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', borderTop: `1px solid ${HAIR}` }}>
        {hits.map((m) => (
          <div key={m.id} style={{
            padding: '20px 32px', borderBottom: `1px dashed ${HAIR}`,
            display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'baseline',
          }}>
            <div style={{ minWidth: 0 }}>
              <Label color={GREY} style={{ marginBottom: 4, display: 'block' }}>{m.from.name}</Label>
              <div style={{ fontFamily: SERIF, fontSize: 17, color: INK, marginBottom: 4, lineHeight: 1.3 }}>
                {highlight(m.subject, /(verification|erasmus|exam|εξετ)/gi)}
              </div>
              <div style={{
                fontFamily: SERIF, fontStyle: 'italic', fontSize: 13, color: GREY,
                lineHeight: 1.55, maxWidth: 760,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {highlight(m.preview, /(verification|erasmus|exam|εξετ)/gi)}
              </div>
            </div>
            <Mono size={11} color={INK}>{m.date}</Mono>
          </div>
        ))}
      </div>
    </div>
  );
}

function highlight(text, re) {
  const parts = String(text).split(re);
  return parts.map((p, i) =>
    re.test(p)
      ? <span key={i} style={{ background: '#fff4d6', padding: '0 1px' }}>{p}</span>
      : <span key={i}>{p}</span>
  );
}

// ─────────────────────────────────────────────────────────────
// Settings — account & protocols, single page.
// ─────────────────────────────────────────────────────────────
function ScreenSettings() {
  return (
    <div style={{ width: '100%', height: '100%', background: PAPER, display: 'flex', flexDirection: 'column', fontFamily: SANS }}>
      <AppBar folderName="Ρυθμίσεις" />

      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <div style={{ width: 220, borderRight: `1px solid ${HAIR}`, padding: '28px 0', background: BG }}>
          {[
            ['Λογαριασμός', true],
            ['Διαπιστευτήρια'],
            ['Φάκελοι'],
            ['Υπογραφή'],
            ['Συντομεύσεις'],
            ['Εμφάνιση'],
          ].map(([gr, active], i) => (
            <div key={i} style={{
              padding: '9px 28px', position: 'relative',
            }}>
              {active && <div style={{ position: 'absolute', left: 0, top: 4, bottom: 4, width: 2, background: INK }} />}
              <div style={{
                fontFamily: SERIF, fontSize: 16,
                color: active ? INK : GREY,
                fontWeight: active ? 500 : 400,
              }}>{gr}</div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '56px 64px' }}>
          <div style={{
            fontFamily: SERIF, fontSize: 32, color: INK, lineHeight: 1.15, marginBottom: 56,
            letterSpacing: '-0.005em',
          }}>
            The <span style={{ fontStyle: 'italic', color: GREY }}>standing connection</span>.
          </div>

          <div style={{ maxWidth: 640, marginBottom: 48 }}>
            <SpecRow label="Account"        value="alexliaskos@uoa.gr" />
            <SpecRow label="UoA username"   value="alexliaskos" />
            <SpecRow label="IMAP host"     value="mail.uoa.gr : 993" />
            <SpecRow label="SMTP host"     value="smtp.uoa.gr : 465" />
            <SpecRow label="Sent folder"   value="Απεσταλμένα" mono={false} />
            <SpecRow label="Poll interval" value="30 s" />
          </div>

          <div style={{ display: 'flex', gap: 14 }}>
            <CTA small>Test connection</CTA>
            <CTA small dark={false}>Rotate password</CTA>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Empty state — the one calligraphic flourish.
// ─────────────────────────────────────────────────────────────
function ScreenEmpty() {
  return (
    <div style={{ width: '100%', height: '100%', background: PAPER, display: 'flex', flexDirection: 'column' }}>
      <AppBar folderName="Πρόχειρα" />
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <FolderPane activeId="drafts" />
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', padding: 80, textAlign: 'center',
        }}>
          <div style={{
            fontFamily: SCRIPT, fontSize: 132, color: INK, lineHeight: 0.9, marginBottom: 24,
          }}>nothing</div>
          <div style={{
            fontFamily: SERIF, fontStyle: 'italic', fontSize: 18, color: GREY, lineHeight: 1.5,
            maxWidth: 380,
          }}>
            No drafts. Unfinished correspondence will appear here.
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenCompose, ScreenSearch, ScreenSettings, ScreenEmpty });
