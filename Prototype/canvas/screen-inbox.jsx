// Inbox — minimalist v2. Two-column shell: folders · message list.
// No status bar, no bilingual chrome, no polling readouts.

// ─── App bar — wordmark, folder name, search, compose ─────────
function AppBar({ folderName = 'Εισερχόμενα' }) {
  return (
    <div style={{
      borderBottom: `1px solid ${HAIR}`, padding: '18px 32px',
      display: 'flex', alignItems: 'center', gap: 28, background: PAPER, fontFamily: SANS,
    }}>
      <div style={{
        fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: INK, lineHeight: 1,
        whiteSpace: 'nowrap',
      }}>
        Liaskos <span style={{ fontStyle: 'italic', color: GREY }}>Mail</span>
      </div>

      <div style={{
        fontFamily: SERIF, fontStyle: 'italic', fontSize: 18, color: GREY,
      }}>
        {folderName}
      </div>

      <div style={{ flex: 1 }} />

      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: `1px solid ${HAIR}`, paddingBottom: 4, width: 240,
      }}>
        <svg width="12" height="12" viewBox="0 0 13 13" fill="none" stroke={GREY} strokeWidth="1.2">
          <circle cx="5.5" cy="5.5" r="4" /><path d="M9 9l3 3" strokeLinecap="round" />
        </svg>
        <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 13, color: GREY2 }}>
          Search
        </span>
      </div>

      <CTA small>Compose</CTA>

      <div style={{
        width: 26, height: 26, border: `1px solid ${INK}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: SERIF, fontSize: 13, fontStyle: 'italic', color: INK,
      }}>A</div>
    </div>
  );
}

// ─── Folder pane — folders only ───────────────────────────────
function FolderPane({ activeId = 'inbox' }) {
  return (
    <div style={{
      width: 220, borderRight: `1px solid ${HAIR}`, background: BG,
      padding: '28px 0', fontFamily: SANS, color: INK,
      display: 'flex', flexDirection: 'column',
    }}>
      {FOLDERS.map((f) => (
        <FolderRow key={f.id} folder={f} active={f.id === activeId} />
      ))}

      <div style={{ flex: 1 }} />

      <div style={{ padding: '18px 28px' }}>
        <Mono size={10} color={GREY2}>alexliaskos@uoa.gr</Mono>
      </div>
    </div>
  );
}

function FolderRow({ folder, active }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      padding: '9px 28px', position: 'relative',
    }}>
      {active && <div style={{
        position: 'absolute', left: 0, top: 4, bottom: 4, width: 2, background: INK,
      }} />}
      <span style={{
        fontFamily: SERIF, fontSize: 16,
        color: active ? INK : GREY,
        fontWeight: active ? 500 : 400,
      }}>{folder.name}</span>
      {folder.unread > 0 ? (
        <Mono size={11} color={INK}>{folder.unread}</Mono>
      ) : (
        <Mono size={11} color={GREY2}>{folder.count}</Mono>
      )}
    </div>
  );
}

// ─── Message list — three densities, stripped ─────────────────

function MessageListSpacious({ messages, selectedId }) {
  return (
    <div style={{ flex: 1, background: PAPER, overflow: 'hidden', fontFamily: SANS }}>
      {messages.map((m) => (
        <div key={m.id} style={{
          padding: '20px 32px', borderBottom: `1px dashed ${HAIR}`,
          background: m.id === selectedId ? '#f4f1eb' : 'transparent',
          display: 'grid', gridTemplateColumns: '1fr auto', columnGap: 24, alignItems: 'baseline',
        }}>
          <div style={{ minWidth: 0 }}>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 5,
            }}>
              {m.unread && <div style={{ width: 5, height: 5, background: INK, transform: 'translateY(-2px)' }} />}
              <span style={{
                fontFamily: SANS, fontSize: 11, fontWeight: 500,
                textTransform: 'uppercase', letterSpacing: '0.14em',
                color: m.unread ? INK : GREY,
              }}>{m.from.name}</span>
            </div>
            <div style={{
              fontFamily: SERIF, fontSize: 17, lineHeight: 1.3,
              fontWeight: m.unread ? 500 : 400,
              fontStyle: m.unread ? 'normal' : 'italic',
              color: m.unread ? INK : GREY,
              marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>{m.subject}</div>
            <div style={{
              fontFamily: SERIF, fontStyle: 'italic',
              fontSize: 13, color: GREY2, lineHeight: 1.5,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>{m.preview}</div>
          </div>
          <Mono size={11} color={m.unread ? INK : GREY}>{m.date}</Mono>
        </div>
      ))}
    </div>
  );
}

function MessageListMedium({ messages, selectedId }) {
  return (
    <div style={{ flex: 1, background: PAPER, overflow: 'hidden', fontFamily: SANS }}>
      {messages.map((m) => (
        <div key={m.id} style={{
          padding: '14px 32px', borderBottom: `1px dashed ${HAIR}`,
          background: m.id === selectedId ? '#f4f1eb' : 'transparent',
          display: 'grid', gridTemplateColumns: '1fr auto', columnGap: 20, alignItems: 'baseline',
        }}>
          <div style={{ minWidth: 0 }}>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 3,
            }}>
              {m.unread && <div style={{ width: 4, height: 4, background: INK, transform: 'translateY(-2px)' }} />}
              <span style={{
                fontFamily: SANS, fontSize: 11, fontWeight: 500,
                textTransform: 'uppercase', letterSpacing: '0.14em',
                color: m.unread ? INK : GREY,
              }}>{m.from.name}</span>
            </div>
            <div style={{
              fontFamily: SERIF, fontSize: 15, lineHeight: 1.3,
              fontWeight: m.unread ? 500 : 400,
              fontStyle: m.unread ? 'normal' : 'italic',
              color: m.unread ? INK : GREY,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>{m.subject}</div>
          </div>
          <Mono size={11} color={m.unread ? INK : GREY}>{m.date}</Mono>
        </div>
      ))}
    </div>
  );
}

function MessageListDense({ messages, selectedId }) {
  return (
    <div style={{ flex: 1, background: PAPER, overflow: 'hidden', fontFamily: SANS }}>
      {messages.map((m) => (
        <div key={m.id} style={{
          padding: '9px 32px', borderBottom: `1px dashed ${HAIR}`,
          background: m.id === selectedId ? '#f4f1eb' : 'transparent',
          display: 'grid', gridTemplateColumns: '170px 1fr 60px', columnGap: 18, alignItems: 'baseline',
        }}>
          <span style={{
            fontFamily: SANS, fontSize: 10.5, fontWeight: 500,
            textTransform: 'uppercase', letterSpacing: '0.12em',
            color: m.unread ? INK : GREY,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{m.from.name}</span>
          <span style={{
            fontFamily: SERIF, fontSize: 14,
            fontWeight: m.unread ? 500 : 400,
            fontStyle: m.unread ? 'normal' : 'italic',
            color: m.unread ? INK : GREY,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{m.subject}</span>
          <Mono size={10.5} color={m.unread ? INK : GREY} style={{ textAlign: 'right' }}>{m.date}</Mono>
        </div>
      ))}
    </div>
  );
}

// ─── Inbox screen ─────────────────────────────────────────────
function ScreenInbox({ density = 'spacious' }) {
  const selectedId = 'm-9820';
  const List = density === 'dense' ? MessageListDense :
               density === 'medium' ? MessageListMedium :
               MessageListSpacious;
  return (
    <div style={{ width: '100%', height: '100%', background: PAPER, display: 'flex', flexDirection: 'column' }}>
      <AppBar />
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <FolderPane activeId="inbox" />
        <List messages={MESSAGES} selectedId={selectedId} />
      </div>
    </div>
  );
}

Object.assign(window, {
  ScreenInbox, AppBar, FolderPane,
  MessageListSpacious, MessageListMedium, MessageListDense,
});
