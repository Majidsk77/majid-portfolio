import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exact.com",
  description:
    "Case study: UX strategy and design for Exact's full website overhaul — 17 templates across 4 audience types, from discovery through handover.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
