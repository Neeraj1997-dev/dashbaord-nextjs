'use client'; 

import { usePathname } from 'next/navigation'; // To get current path
import Sidebar from '../components/Sidebar';  // Import your Sidebar component
import localFont from "next/font/local"; // Import metadata
import "./globals.css";

// Fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();  // Get the current route
  console.log("Current Path:", pathname);  // Debugging the pathname

  // Exclude '/' (root), '/auth', and '/register' paths from showing the sidebar
  const showSidebar = !(
    pathname === "/" || pathname.startsWith("/auth") || pathname.startsWith("/register")
  );

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {showSidebar && <Sidebar />}
        <main className={`${showSidebar ? 'ml-64' : ''} transition-all`}>
          {children}
        </main>
      </body>
    </html>
  );
}
