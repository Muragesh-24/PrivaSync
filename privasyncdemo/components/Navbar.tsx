"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (pathname.startsWith("/auth")) {
    return null;
  }

  const isAdmin = pathname.startsWith("/admin");
  const isUser = pathname.startsWith("/user");

  const adminLinks = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Training", href: "/admin/training/status" },
  ];

  const userLinks = [
    { name: "Dashboard", href: "/user/dashboard" },
    { name: "Training", href: "/user/training" },
    { name: "Notifications", href: "/user/notification" },
  ];

  const links = isAdmin ? adminLinks : isUser ? userLinks : [];

  const logout = () => {
    console.log("User logged out");
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href={isAdmin ? "/admin/dashboard" : "/user/dashboard"}
          className="text-xl font-bold text-cyan-600"
        >
          Privasync
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "font-semibold text-cyan-600"
                  : "text-gray-600 hover:text-cyan-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Logout */}
        <button
          onClick={logout}
          className="hidden md:block rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Logout
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 md:hidden"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t bg-white md:hidden">
          <nav className="flex flex-col p-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-lg px-3 py-3 text-sm transition ${
                  pathname === link.href
                    ? "bg-cyan-50 font-semibold text-cyan-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={logout}
              className="mt-3 rounded-lg border border-gray-200 px-3 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}