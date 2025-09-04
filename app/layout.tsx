import type { Metadata } from "next";
import { Poppins } from 'next/font/google'
import "./globals.css"

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})



export const metadata: Metadata = {
  title: "StoreIt",
  description: "StoreIt, the only storage solution you need",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} font-poppins antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
