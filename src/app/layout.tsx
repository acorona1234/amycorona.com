import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amy Corona | Compensation Analyst & Project Manager",
  description:
    "Compensation Analyst and Project Manager turning complex data into actionable insights. Expert in data analysis, Python, R, SQL, and machine learning.",
  keywords: [
    "compensation analyst",
    "project manager",
    "data analyst",
    "Python",
    "R",
    "SQL",
    "machine learning",
    "data visualization",
  ],
  authors: [{ name: "Amy Corona" }],
  openGraph: {
    title: "Amy Corona | Compensation Analyst & Project Manager",
    description:
      "Turning complex data into actionable insights.",
    url: "https://amycorona.com",
    siteName: "Amy Corona",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amy Corona | Compensation Analyst & Project Manager",
    description:
      "Turning complex data into actionable insights.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
