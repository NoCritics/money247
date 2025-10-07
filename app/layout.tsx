import type { Metadata } from 'next';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'Money 24/7 - In Money We Trust',
  description: 'Your Gateway to Financial Freedom. Real-time cryptocurrency and fiat exchange rates.',
  keywords: ['crypto', 'exchange', 'money', 'finance', 'trading'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
