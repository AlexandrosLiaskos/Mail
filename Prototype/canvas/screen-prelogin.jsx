// Pre-login screens (minimalist v2): frontispiece, sign-in, credentials.
// Negative space carries the layout — no corner chrome, no spec blocks,
// no inline duplicate Greek/English. One idea per screen.

// ─────────────────────────────────────────────────────────────
// Frontispiece — pre-login landing.
// Just: eyebrow → monumental title → italic lede → CTA → quiet attribution.
// ─────────────────────────────────────────────────────────────
function ScreenFrontispiece() {
  return (
    <div style={{
      width: '100%', height: '100%', background: BG, fontFamily: SANS,
      color: INK, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 80,
      textAlign: 'center',
    }}>
      <Eyebrow size={11} color={GREY} style={{ marginBottom: 56 }}>
        UOA · Mail
      </Eyebrow>

      <div style={{
        fontFamily: SERIF, fontSize: 132, lineHeight: 0.94, fontWeight: 400,
        color: INK, letterSpacing: '-0.02em', marginBottom: 28,
      }}>
        Liaskos <span style={{ fontStyle: 'italic', color: GREY }}>Mail</span>
      </div>

      <div style={{
        fontFamily: SERIF, fontStyle: 'italic', fontSize: 22, lineHeight: 1.5,
        color: GREY, maxWidth: 520, marginBottom: 64, textWrap: 'pretty',
      }}>
        A private reading room for the institutional inbox.
      </div>

      <CTA>Enter</CTA>

      <div style={{
        position: 'absolute', bottom: 36, left: 0, right: 0, textAlign: 'center',
        fontFamily: SERIF, fontStyle: 'italic', fontSize: 13, color: GREY2,
      }}>
        for <span style={{ color: GREY }}>alexliaskos@uoa.gr</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Sign-in — wordmark + two fields + CTA. Nothing else.
// ─────────────────────────────────────────────────────────────
function ScreenLogin() {
  return (
    <div style={{
      width: '100%', height: '100%', background: BG, fontFamily: SANS, color: INK,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 80,
    }}>
      <div style={{
        fontFamily: SERIF, fontSize: 28, fontWeight: 400, color: INK,
        marginBottom: 56, letterSpacing: '-0.01em',
      }}>
        Liaskos <span style={{ fontStyle: 'italic', color: GREY }}>Mail</span>
      </div>

      <div style={{ width: 360 }}>
        <FormField label="Email" value="alexliaskos@uoa.gr" mono />
        <FormField label="Password" value="••••••••••••" mono />
        <div style={{ marginTop: 16 }}>
          <CTA full>Enter</CTA>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, value, mono }) {
  return (
    <div style={{ marginBottom: 26 }}>
      <Label color={GREY} style={{ marginBottom: 8, display: 'block' }}>{label}</Label>
      <div style={{
        borderBottom: `1px solid ${INK}`, paddingBottom: 8,
        fontFamily: mono ? MONO : SANS, fontSize: 15, color: INK,
      }}>{value}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Credentials — first-run vault. One short explanation, four fields, save.
// ─────────────────────────────────────────────────────────────
function ScreenCredentials() {
  return (
    <div style={{
      width: '100%', height: '100%', background: BG, fontFamily: SANS, color: INK,
      display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 110,
    }}>
      <div style={{
        fontFamily: SERIF, fontSize: 24, fontWeight: 400, color: INK, marginBottom: 56,
      }}>
        Liaskos <span style={{ fontStyle: 'italic', color: GREY }}>Mail</span>
      </div>

      <div style={{ width: 440 }}>
        <div style={{
          fontFamily: SERIF, fontSize: 34, lineHeight: 1.15, color: INK,
          marginBottom: 14, letterSpacing: '-0.005em',
        }}>
          Your <span style={{ fontStyle: 'italic', color: GREY }}>university key</span>.
        </div>
        <div style={{
          fontFamily: SERIF, fontStyle: 'italic', fontSize: 14,
          color: GREY, lineHeight: 1.6, marginBottom: 44, textWrap: 'pretty',
        }}>
          Encrypted at rest. Decrypted only for the duration of a single request to&nbsp;
          <span style={{ fontStyle: 'normal' }}>mail.uoa.gr</span>.
        </div>

        <FormField label="Username" value="alexliaskos" mono />
        <FormField label="Password" value="••••••••••••••" mono />

        <div style={{ marginTop: 12 }}>
          <CTA full>Save</CTA>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenFrontispiece, ScreenLogin, ScreenCredentials });
