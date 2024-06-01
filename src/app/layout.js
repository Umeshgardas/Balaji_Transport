import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../layouts/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
