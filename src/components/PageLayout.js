import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useRouter } from "next/router";

function PageLayout({ children }) {
  const router = useRouter();
  return (
    <div className="flex h-screen">
      <Sidebar currentRoute={router.pathname} />
      <div className="flex flex-col w-full pl-60">
        <Navbar />
        <main className="flex-grow bg-gray-100 p-6">{children}</main>
      </div>
    </div>
  );
}

export default PageLayout;
