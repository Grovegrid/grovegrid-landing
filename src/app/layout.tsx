import type { Metadata } from "next";
import { Inter, Space_Mono, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Grovegrid | Next-Gen Web Development & Automation",
    template: "%s | Grovegrid",
  },
  description: "Grovegrid architects premium brutalist web experiences and zero-friction automated workflows for modern industries. Specialists in Next.js, automation, and scalable systems.",
  keywords: ["Web Development", "Automation", "Software Engineering", "Bangladesh", "Next.js", "React", "School Management System", "E-commerce Solutions", "Custom Software", "Brutalist Design", "System Architecture"],
  authors: [{ name: "Grovegrid Team" }],
  creator: "Grovegrid Digital Systems",
  publisher: "Grovegrid",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.grovegrid.site"),
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "Grovegrid | Where growth meets structure",
    description: "Architecting premium brutalist web experiences and zero-friction automated workflows.",
    url: "https://www.grovegrid.site",
    siteName: "Grovegrid",
    images: [
      {
        url: "/new_cover.png",
        width: 1200,
        height: 630,
        alt: "Grovegrid Digital Systems Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grovegrid | Next-Gen Web Development",
    description: "Architecting premium digital experiences and automated systems.",
    images: ["/new_cover.png"],
    creator: "@grovegrid",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceMono.variable} ${syne.variable} h-full antialiased scroll-smooth overflow-x-hidden`}
    >
      <body className="min-h-full w-full flex flex-col bg-bg text-textMain font-inter overflow-x-hidden">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Grovegrid Digital Systems",
              "description": "Architecting premium digital experiences and automated workflows in Bangladesh.",
              "url": "https://www.grovegrid.site",
              "logo": "https://www.grovegrid.site/favicon/favicon.png",
              "sameAs": [
                "https://facebook.com/grovegrid",
                "https://twitter.com/grovegrid",
                "https://linkedin.com/company/grovegrid"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Sylhet",
                "addressCountry": "BD"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
