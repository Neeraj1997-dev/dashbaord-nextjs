import Link from "next/link";
import { FaBars, FaHome, FaUser, FaTasks, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-gray-800 p-4"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <FaBars className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-20 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64`}
      >
        <div className="p-4 md:p-6 lg:p-8 text-xl md:text-2xl font-bold text-center border-b border-gray-700">
          <span className="block md:inline">Tender.AI</span>
        </div>

        <div className="mt-8">
          <ul className="space-y-6">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 p-4 hover:bg-gray-700 rounded-md transition"
              >
                <FaHome className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="flex items-center space-x-3 p-4 hover:bg-gray-700 rounded-md transition"
              >
                <FaUser className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link
                href="/tasks"
                className="flex items-center space-x-3 p-4 hover:bg-gray-700 rounded-md transition"
              >
                <FaTasks className="h-5 w-5" />
                <span>Tasks</span>
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="flex items-center space-x-3 p-4 hover:bg-gray-700 rounded-md transition"
              >
                <FaSignOutAlt className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
