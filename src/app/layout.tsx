import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AccountOS — AI-Powered Accounting Firm OS',
  description: 'The complete operating system for modern accounting firms. CRM, billing, bookkeeping, and team management in one unified platform.',
  keywords: 'accounting, CRM, bookkeeping, billing, automation, financial software',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
