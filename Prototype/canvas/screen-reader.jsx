// Message reader — minimalist v2. Modal overlay on dimmed inbox.
// One sender line, one date line, the subject, the body. Nothing else.

function ScreenReader() {
  const m = MESSAGES.find((x) => x.id === 'm-9821');
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
        <ScreenInbox density="spacious" />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,18,14,0.30)' }} />

      <div style={{
        position: 'absolute', top: 40, bottom: 40, left: 140, right: 140,
        background: PAPER, borderRadius: 4, boxShadow: '0 24px 60px rgba(20,18,14,0.25)',
        display: 'flex', flexDirection: 'column', fontFamily: SANS, overflow: 'hidden',
      }}>
        {/* toolbar */}
        <div style={{
          padding: '14px 28px', borderBottom: `1px solid ${HAIR}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Label color={GREY}>← Back</Label>
          <div style={{ display: 'flex', gap: 28, alignItems: 'baseline' }}>
            <Label color={INK}>Reply</Label>
            <Label color={INK}>Forward</Label>
            <Label color={GREY}>Delete</Label>
            <Label color={GREY}>✕</Label>
          </div>
        </div>

        {/* header — subject + minimal meta */}
        <div style={{ padding: '56px 80px 28px' }}>
          <h1 style={{
            margin: 0, marginBottom: 28,
            fontFamily: SERIF, fontSize: 38, lineHeight: 1.18, fontWeight: 400,
            color: INK, letterSpacing: '-0.01em', textWrap: 'pretty',
          }}>{m.subject}</h1>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontFamily: SERIF, fontSize: 15, color: INK }}>
                {m.from.name}
              </span>
              <Mono size={12} color={GREY2}>{m.from.handle}</Mono>
            </div>
            <Mono size={12} color={GREY} style={{ paddingTop: 4, whiteSpace: 'nowrap' }}>
              {m.iso} · {m.time}
            </Mono>
          </div>

          {m.hasAttachment && (
            <div style={{
              marginTop: 22, paddingTop: 14, borderTop: `1px dashed ${HAIR}`,
              display: 'flex', alignItems: 'baseline', gap: 14,
            }}>
              <Label color={GREY}>Attached</Label>
              <Mono size={12} color={INK}>{m.attachments[0].name}</Mono>
              <Mono size={11} color={GREY2}>{m.attachments[0].size}</Mono>
            </div>
          )}
        </div>

        {/* body */}
        <div style={{
          flex: 1, overflow: 'auto', padding: '0 80px 56px',
        }}>
          <div style={{
            fontFamily: SERIF, fontSize: 17, lineHeight: 1.7, color: INK2,
            textWrap: 'pretty', maxWidth: 680,
          }}>
            {m.body && m.body.map((p, i) => (
              <p key={i} style={{
                margin: 0, marginBottom: 18,
                color: i >= m.body.length - 2 ? GREY : INK2,
              }}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenReader });
