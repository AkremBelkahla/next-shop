import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeScript } from "@/components/theme/theme-script";
import { BackToTop } from "@/components/ui/back-to-top";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartSidebar } from "@/components/cart/cart-sidebar";
import { getCart } from "@/lib/cart";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Next Shop - Modern E-commerce",
  description: "Modern headless e-commerce built with Next.js, React Server Components, and Stripe",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cart = await getCart();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <CartProvider initialCart={cart}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartSidebar />
        </CartProvider>
        <BackToTop />
        <CookieConsent />
      </body>
    </html>
  );
}
