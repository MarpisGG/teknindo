// AppNavbar.tsx
import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Menu } from "lucide-react";

interface PageProps {
  auth: {
    user: {
      name: string;
      email: string;
    };
  };
    [key: string]: any; // Allow additional properties for Inertia.js PageProps
}

export const AppNavbar: React.FC = () => {
  const { auth } = usePage<PageProps>().props;

  return (
    <header className="bg-white shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Menu className="text-gray-700" />
          <Link href="/dashboard" className="text-lg font-bold text-gray-800">
            Admin Panel
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 hidden sm:block">
            {auth?.user?.name}
          </span>
          <Link
            href="/logout"
            method="post"
            as="button"
            className="text-sm text-red-600 hover:text-red-800"
          >
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
};
export default AppNavbar;