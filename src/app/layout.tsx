import type { Metadata } from 'next';
import './globals.css';
import ReactLenis from 'lenis/react';
import localFont from 'next/font/local';
import { CartProvider } from '@/app/contexts/cart-context';

const ApfelGrotezk = localFont({
  src: [
    {
      path: '../../public/font/apfelgrotezkregular.woff2',
      weight: '400',
    },
    {
      path: '../../public/font/ApfelGrotezk-Mittel.woff2',
      weight: '500',
    },
    {
      path: '../../public/font/ApfelGrotezkFett.woff2',
      weight: '700',
    },
    {
      path: '../../public/font/ApfelGrotezk-Satt.woff2',
      weight: '900',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Bakery Clone',
  description: 'Just a clone of a website for educational purposes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactLenis root>
      <CartProvider>
        <html lang="en">
          <body className={`${ApfelGrotezk.className} antialiased`}>{children}</body>
        </html>
      </CartProvider>
    </ReactLenis>
  );
}
