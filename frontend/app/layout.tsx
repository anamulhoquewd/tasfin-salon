import type { Metadata } from 'next';
// import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// const playfair = Playfair_Display({
//   subsets: ["latin"],
//   variable: "--font-sans",
//   weight: ["400", "500", "600", "700", "800", "900"],
// });

export const metadata: Metadata = {
  title: 'TASFIN — Premium Beauty Salon in Dhaka',
  description: 'Bridal artistry, considered skincare, and the kind of haircut you actually wanted. Book at TASFIN Salon, Gulshan, Dhaka.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body style={{ fontFamily: 'var(--font-sans)', background: 'var(--cream)', color: 'var(--espresso)', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
