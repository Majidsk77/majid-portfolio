import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IMC Prosperity",
  description:
    "Case study: Designing the onboarding and platform experience for IMC's Prosperity algorithmic trading competition — 30,703 players across 117 countries.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
