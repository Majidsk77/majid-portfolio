import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Boundaries',
  description: 'An AI-assisted mobile app for building healthier boundaries around habits — designed and built by Majid Kareem.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
