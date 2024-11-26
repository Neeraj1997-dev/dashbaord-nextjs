"use client";

import Link from "next/link";
import { FaHome, FaTasks, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-gray-800 p-4"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-20 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64`}
      >
        <div className="p-4 font-bold text-center border-b border-gray-700">
        YouData.AI
        </div>
        <ul className="mt-8 space-y-6">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 p-4 hover:bg-gray-700 rounded-md transition"
            >
              <FaHome />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/tasks"
              className="flex items-center space-x-3 p-4 hover:bg-gray-700 rounded-md transition"
            >
              <FaTasks />
              <span>Tasks</span>
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="flex items-center space-x-3 p-4 hover:bg-gray-700 rounded-md transition"
            >
              <FaUser />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link
              href="/auth"
              className="flex items-center space-x-3 p-4 hover:bg-gray-700 rounded-md transition"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
