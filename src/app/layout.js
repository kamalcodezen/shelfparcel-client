import { Urbanist, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/theme-provider";

// বডি টেক্সটের জন্য আরবানিস্ট ফন্ট লোড
const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// হেডিং ও টাইটেলের জন্য পপিন্স ফন্ট লোড
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "BiblioDrop - Knowledge Delivered to Your Door",
  description: "Premium and secure web architecture for modern libraries.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body className={`${urbanist.variable} ${poppins.variable} antialiased min-h-full`}>
        <Providers>
          <main className="bg-background text-foreground min-h-screen transition-colors duration-300">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}