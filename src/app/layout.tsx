import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amy Corona | Data Scientist",
  description:
    "Data scientist specializing in predictive systems to enhance resource allocation and operational efficiency. Expert in Python, R, SQL, machine learning, and data visualization.",
  keywords: [
    "data scientist",
    "machine learning",
    "Python",
    "R",
    "SQL",
    "data analysis",
    "predictive modeling",
  ],
  authors: [{ name: "Amy Corona" }],
  openGraph: {
    title: "Amy Corona | Data Scientist",
    description:
      "Data scientist specializing in predictive systems to enhance resource allocation and operational efficiency.",
    url: "https://amycorona.com",
    siteName: "Amy Corona",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amy Corona | Data Scientist",
    description:
      "Data scientist specializing in predictive systems to enhance resource allocation and operational efficiency.",
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
