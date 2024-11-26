"use client"; // Mark this file as a client component because we're using useRouter

import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

export default function RootLayout({ children }) {
  const { pathname } = useRouter() || {};  // Safeguard: handle if pathname is undefined

  // Define routes where the sidebar should not appear
  const noSidebarRoutes = ["/auth", "/register"];

  // Check if pathname is available and ensure that it's not in noSidebarRoutes
  const shouldShowSidebar = pathname && !noSidebarRoutes.some(route => pathname.startsWith(route));

  return (
    <html lang="en">
      <body className="antialiased bg-gray-100">
        <div className="flex">
          {shouldShowSidebar && <Sidebar />}  {/* Show sidebar based on route */}
          <main className={`flex-grow p-6 ${shouldShowSidebar ? "ml-64" : ""}`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
