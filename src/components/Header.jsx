import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  BuildingOffice2Icon,
  ArrowRightOnRectangleIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function Header() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-gray-900 dark:to-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <BuildingOffice2Icon className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white dark:text-yellow-400 tracking-wide">
              RaKsHa PG
            </span>
          </Link>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-8 text-white dark:text-yellow-400 font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-blue-200 dark:hover:text-yellow-200 transition flex items-center gap-1"
              >
                <HomeIcon className="h-5 w-5" /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/listings"
                className="hover:text-blue-200 dark:hover:text-yellow-200 transition flex items-center gap-1"
              >
                <BuildingOffice2Icon className="h-5 w-5" /> PGs
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-blue-200 dark:hover:text-yellow-200 transition flex items-center gap-1"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" /> Login
              </Link>
            </li>
          </ul>
        </nav>
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className=" ml-14 p-2  rounded-full bg-white/20 dark:bg-gray-700 hover:bg-white/40 dark:hover:bg-gray-600 transition"
          title="Toggle dark mode"
        >
          {dark ? (
            <SunIcon className="h-6 w-6 text-yellow-400" />
          ) : (
            <MoonIcon className="h-6 w-6 text-white" />
          )}
        </button>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden ml-2 p-2 rounded-full bg-white/20 dark:bg-gray-700 hover:bg-white/40 dark:hover:bg-gray-600 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6 text-white dark:text-yellow-400" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white dark:text-yellow-400" />
          )}
        </button>
      </div>
      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden bg-gradient-to-r from-blue-600 to-blue-400 dark:from-gray-900 dark:to-gray-800 px-6 pb-4">
          <ul className="flex flex-col gap-4 text-white dark:text-yellow-400 font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center gap-1 hover:text-blue-200 dark:hover:text-yellow-200 transition"
                onClick={() => setMenuOpen(false)}
              >
                <HomeIcon className="h-5 w-5" /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/listings"
                className="flex items-center gap-1 hover:text-blue-200 dark:hover:text-yellow-200 transition"
                onClick={() => setMenuOpen(false)}
              >
                <BuildingOffice2Icon className="h-5 w-5" /> PGs
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="flex items-center gap-1 hover:text-blue-200 dark:hover:text-yellow-200 transition"
                onClick={() => setMenuOpen(false)}
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" /> Login
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
