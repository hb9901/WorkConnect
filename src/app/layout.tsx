import '@/styles/globals.css';
import { Noto_Sans_KR } from '@next/font/google';
import type { Metadata } from 'next';

const notoSansKR = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'B3 Project',
  description: 'B3 Project'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSansKR.className}>{children}</body>
    </html>
  );
}
