import type { Metadata } from "next";
import { Great_Vibes, Poppins } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "A Special Question... 💝",
  description: "Will you be my Valentine?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${greatVibes.variable} ${poppins.variable} antialiased min-h-screen selection:bg-rose-200 selection:text-rose-900 overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
