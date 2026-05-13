// Frontispiece — pre-login landing.
// Lifted line for line from Prototype/canvas/screen-prelogin.jsx so the
// real app inherits the design canvas verbatim.

export default function Frontispiece() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        textAlign: "center",
        position: "relative",
      }}
    >
      <div className="eyebrow" style={{ marginBottom: 56 }}>UOA · Mail</div>

      <h1
        className="serif"
        style={{
          fontSize: 132,
          lineHeight: 0.94,
          fontWeight: 400,
          letterSpacing: "-0.02em",
          margin: "0 0 28px",
        }}
      >
        Liaskos <span style={{ fontStyle: "italic", color: "var(--grey)" }}>Mail</span>
      </h1>

      <p
        className="serif-italic"
        style={{
          fontSize: 22,
          lineHeight: 1.5,
          color: "var(--grey)",
          maxWidth: 520,
          margin: "0 0 64px",
          textWrap: "pretty",
        }}
      >
        A private reading room for the institutional inbox.
      </p>

      <a href="/login" className="cta" style={{ textDecoration: "none" }}>
        Enter
      </a>

      <div
        className="serif-italic"
        style={{
          position: "absolute",
          bottom: 36,
          left: 0,
          right: 0,
          fontSize: 13,
          color: "var(--grey-2)",
        }}
      >
        for <span style={{ color: "var(--grey)" }}>alexliaskos@uoa.gr</span>
      </div>
    </main>
  );
}
