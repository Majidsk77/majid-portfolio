import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IMC Prosperity — Trading Simulation",
  description:
    "Case study: Designing the onboarding and platform experience for IMC's Prosperity algorithmic trading competition.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
