import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exact: Platform Redesign",
  description:
    "Case study: Redesigning the core platform experience for Exact, defining 17 page templates across a new design system.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
