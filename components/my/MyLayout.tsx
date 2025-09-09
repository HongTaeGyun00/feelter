"use client";

import { useState } from "react";
import MySidebar from "./MySidebar";

interface MyLayoutProps {
  children: React.ReactNode;
}

export default function MyLayout({ children }: MyLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Global handler를 window object에 등록
  if (typeof window !== "undefined") {
    (window as unknown as { toggleMySidebar: () => void }).toggleMySidebar =
      toggleSidebar;
  }

  return (
    <div className="flex flex-row pt-5">
      <MySidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <main className="w-full min-h-screen">{children}</main>
    </div>
  );
}
