import Link from "next/link";
import React from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useUser } from "@/hooks/useUser";

const Navbar = () => {
  const { user } = useUser();

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const roleHeading = capitalizeFirstLetter(user?.data?.role);

  return (
    <header className="bg-white shadow-md fixed top-0 w-full">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center">
          <h3 className="text-gray-800">{roleHeading} Dashboard</h3>
          <Link href="/notifications relative w-full">
            <BellIcon className="h-6 w-6 text-gray-800 hover:text-gray-700 cursor-pointer z-20 absolute left-[1250px] top-3" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
