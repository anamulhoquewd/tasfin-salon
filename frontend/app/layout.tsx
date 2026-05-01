import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TASFIN — Premium Beauty Salon in Dhaka',
  description: 'Bridal artistry, considered skincare, and the kind of haircut you actually wanted. Book at TASFIN Salon, Gulshan, Dhaka.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'var(--font-sans)', background: 'var(--cream)', color: 'var(--espresso)', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
