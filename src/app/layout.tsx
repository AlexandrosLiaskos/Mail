import type { Metadata } from "next";
import "@/styles/editorial.css";

export const metadata: Metadata = {
  title: "Liaskos Mail",
  description: "A private reading room for the institutional inbox.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
