import { sidebarConfig } from "@/config/sidebar.config";
import useOutsideClick from "@/hooks/useClickOutside";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

function Sidebar({ currentRoute }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const { user, setUser } = useUser();
  console.log(user);

  const filteredSidebarConfig = sidebarConfig.filter((item) =>
    item.roles.includes(user?.data?.role)
  );

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useOutsideClick(dropdownRef, closeDropdown);

  const handleLogout = async () => {
    await fetch(process.env.CONFMAN_API_BASE_URL + "users/logout", {
      method: "DELETE",
      credentials: "include",
    });

    localStorage.clear();

    setUser(null);

    router.push("/login");
  };

  return (
    <div className="bg-white w-60 h-screen border-r border-gray-200 pt-10 fixed top-0">
      <div className="px-8">
        <Link href="/" className="flex justify-center items-center">
          <img
            src="https://confman-public-assets.s3.ap-southeast-1.amazonaws.com/Logo.png"
            alt="Logo"
            className="h-12"
          />
        </Link>
      </div>
      <div className="relative h-5/6">
        <nav className="mt-10 px-8">
          <ul className="space-y-4">
            {filteredSidebarConfig.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 py-2 px-4 rounded-lg ${
                    currentRoute === item.href
                      ? "bg-gray-300 text-gray-900"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div
          className="px-4 py-4 absolute -bottom-8 left-0 border-t rounded-xl border-gray-200 cursor-pointer"
          onClick={toggleDropdown}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-gray-800 font-semibold">{user?.data?.name}</p>
              <p className="text-gray-600 text-xs">{user?.data?.email}</p>
            </div>
            {/* <img
              src={user?.data?.imageUrl}
              alt="User"
              className="h-10 w-10 rounded-full ml-4"
            /> */}
            <div className="bg-blue-500 p-2 px-4 mt-1 text-white font-semibold rounded-full">
              {user?.data?.name.charAt(0)}
            </div>
          </div>
        </div>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute -bottom-6 left-56 mt-2 py-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
          >
            <button className="block w-full text-left py-2 px-8 text-gray-800 hover:bg-gray-100">
              Settings
            </button>
            <button
              className="block w-full text-left py-2 px-8 text-red-500 hover:bg-rose-500 hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
