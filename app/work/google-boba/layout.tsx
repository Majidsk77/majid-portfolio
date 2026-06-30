import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google Boba",
  description:
    "Case study: Building and scaling a design system at Google to support product teams across Boba event screens worldwide.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
