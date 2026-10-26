import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s — Admin TaxPlus" },
  robots: { index: false, follow: false },
};

/* Admin pages read the session cookie on every request, so they aren't part of a static shell. */
export const instant = false;

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="adm">{children}</div>;
}
