import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google Boba — Design System",
  description:
    "Case study: Building and scaling a design system at Google to support product teams across Boba.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
