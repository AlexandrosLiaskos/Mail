// Shared chrome: masthead, hairlines, eyebrows, type tokens.
// Editorial classicism — monochrome surfaces, hairline structure, three voices.

const INK = '#111111';
const INK2 = '#29261b';
const GREY = '#666666';
const GREY2 = '#999999';
const HAIR = '#111111';
const BG = '#fafaf7';
const PAPER = '#ffffff';
const ACCENT_WARM = '#a8412a'; // ox-blood — 1px marks only
const ACCENT_COOL = '#1c3a5e'; // ink-blue — 1px marks only

const SERIF = "'Cormorant Garamond', 'EB Garamond', Georgia, serif";
const SANS  = "'Inter', 'Söhne', -apple-system, BlinkMacSystemFont, sans-serif";
const MONO  = "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace";
const SCRIPT = "'Italianno', cursive";

// ─── Eyebrow / kicker — tracked uppercase sans
const Eyebrow = ({ children, size = 11, color = INK, style }) => (
  <div style={{
    fontFamily: SANS, fontSize: size, fontWeight: 500,
    textTransform: 'uppercase', letterSpacing: '0.18em',
    color, ...style,
  }}>{children}</div>
);

// ─── Section title — serif italic with hairline extending right
const SectionTitle = ({ children, italic = true, size = 22, style }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, ...style }}>
    <div style={{
      fontFamily: SERIF, fontSize: size, fontStyle: italic ? 'italic' : 'normal',
      fontWeight: 400, color: INK, letterSpacing: '-0.005em', whiteSpace: 'nowrap',
    }}>{children}</div>
    <div style={{ flex: 1, height: 1, background: HAIR }} />
  </div>
);

// ─── Masthead: hairline · "Liaskos Mail" · hairline
const Masthead = ({ small = false }) => {
  const big = small ? 22 : 38;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: small ? 14 : 22 }}>
      <div style={{ flex: 1, height: 1, background: HAIR }} />
      <div style={{
        fontFamily: SERIF, fontSize: big, fontWeight: 400, color: INK,
        letterSpacing: '-0.01em', lineHeight: 1,
      }}>
        Liaskos <span style={{ fontStyle: 'italic', color: GREY }}>Mail</span>
      </div>
      <div style={{ flex: 1, height: 1, background: HAIR }} />
    </div>
  );
};

// ─── Hairline rules
const HR = ({ dashed = false, color = HAIR, style }) => (
  <div style={{
    height: 1, borderTop: `1px ${dashed ? 'dashed' : 'solid'} ${color}`,
    ...style,
  }} />
);

// ─── Mono value (right-aligned typical)
const Mono = ({ children, color = INK, size = 12, style }) => (
  <span style={{
    fontFamily: MONO, fontSize: size, fontWeight: 400, color,
    fontFeatureSettings: '"tnum" 1', ...style,
  }}>{children}</span>
);

// ─── Solid black CTA, sharp corners, sans uppercase tracked
const CTA = ({ children, full, dark = true, small = false, style }) => (
  <button style={{
    fontFamily: SANS, fontSize: small ? 11 : 12, fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '0.16em',
    padding: small ? '9px 18px' : '14px 28px',
    background: dark ? INK : 'transparent',
    color: dark ? PAPER : INK,
    border: dark ? `1px solid ${INK}` : `1px solid ${INK}`,
    borderRadius: 0, cursor: 'pointer',
    width: full ? '100%' : 'auto',
    ...style,
  }}>{children}</button>
);

// ─── Tracked label (cell label in a printed table)
const Label = ({ children, size = 10, color = GREY, style }) => (
  <span style={{
    fontFamily: SANS, fontSize: size, fontWeight: 500,
    textTransform: 'uppercase', letterSpacing: '0.14em', color,
    ...style,
  }}>{children}</span>
);

// ─── A printed-page-style row: label left, value right with dashed sep
const SpecRow = ({ label, value, mono = true }) => (
  <div style={{
    display: 'flex', alignItems: 'baseline', gap: 14,
    padding: '10px 0', borderBottom: `1px dashed ${HAIR}`,
  }}>
    <Label>{label}</Label>
    <div style={{ flex: 1, borderBottom: `1px dotted ${GREY2}`, transform: 'translateY(-4px)' }} />
    {mono ? <Mono>{value}</Mono> :
      <span style={{ fontFamily: SERIF, fontSize: 14, color: INK }}>{value}</span>}
  </div>
);

Object.assign(window, {
  INK, INK2, GREY, GREY2, HAIR, BG, PAPER, ACCENT_WARM, ACCENT_COOL,
  SERIF, SANS, MONO, SCRIPT,
  Eyebrow, SectionTitle, Masthead, HR, Mono, CTA, Label, SpecRow,
});
