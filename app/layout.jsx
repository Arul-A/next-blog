import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '../components/Header'
import Footer from '../components/Footer'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "NextBlog - Thoughts, Stories & Ideas",
    template: "%s | NextBlog",
  },
  description: "Explore carefully crafted articles on technology, design, development, and modern thinking.",
  keywords: ["Next.js", "Blog", "Technology", "Web Development", "Insights"],
  authors: [{ name: "NextBlog Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NextBlog",
    title: "NextBlog - Thoughts, Stories & Ideas",
    description: "Explore carefully crafted articles on technology, design, development, and modern thinking.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}