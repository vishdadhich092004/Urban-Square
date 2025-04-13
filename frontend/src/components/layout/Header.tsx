import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-primary-600 font-semibold border-b-2 border-primary-600"
      : "text-gray-700 hover:text-primary-600 hover:border-b-2 hover:border-primary-600";
  };

  return (
    <header
      className={`bg-white ${
        scrolled ? "shadow-md" : ""
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <svg
              fill="#000000"
              width="32"
              height="32"
              viewBox="0 0 256 256"
              id="Flat"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M190.2251,128l24.8872-24.88721a43.99978,43.99978,0,1,0-62.2246-62.22558L128,65.7749,103.1123,40.88745a43.9997,43.9997,0,1,0-62.2246,62.22534L65.7749,128,40.8877,152.88721a43.99978,43.99978,0,1,0,62.2246,62.22558L128,190.2251l24.8877,24.88769a43.99978,43.99978,0,1,0,62.2246-62.22558ZM169.8584,57.85791v-.00024a19.99967,19.99967,0,1,1,28.2832,28.28442L173.25439,111.0293,144.9707,82.74561ZM156.28369,128,128,156.28369,99.71631,128,128,99.71631ZM57.8584,86.14209A19.99959,19.99959,0,1,1,86.1416,57.85791l24.8877,24.8877L82.74561,111.0293Zm28.2832,112a19.99959,19.99959,0,1,1-28.2832-28.28418L82.74561,144.9707l28.28369,28.28369Zm112,0a19.9986,19.9986,0,0,1-28.2832,0l-24.8877-24.8877,28.28369-28.28369,24.88721,24.88721a19.9986,19.9986,0,0,1,0,28.28418Z" />
            </svg>
            <span className="text-xl font-bold text-gray-800 tracking-tight">
              Urban Square
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`${isActive(
                "/"
              )} py-2 transition duration-200 text-base`}
            >
              Home
            </Link>
            <Link
              to="/properties"
              className={`${isActive(
                "/properties"
              )} py-2 transition duration-200 text-base`}
            >
              Properties
            </Link>
            <Link
              to="/agents"
              className={`${isActive(
                "/agents"
              )} py-2 transition duration-200 text-base`}
            >
              Agents
            </Link>
            <Link
              to="/contact"
              className={`${isActive(
                "/contact"
              )} py-2 transition duration-200 text-base`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative group">
                <button
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 focus:outline-none bg-gray-50 px-4 py-2 rounded-full transition duration-300"
                  onClick={toggleMenu}
                >
                  <span>{user?.name}</span>
                  <img
                    src={user?.avatar || "https://via.placeholder.com/40"}
                    alt="User avatar"
                    className="h-8 w-8 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 transition-all duration-200 transform origin-top-right ${
                    isMenuOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                  {(user?.role === "agent" || user?.role === "admin") && (
                    <Link
                      to="/my-properties"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      onClick={closeMenu}
                    >
                      My Properties
                    </Link>
                  )}
                  <Link
                    to="/favorites"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    onClick={closeMenu}
                  >
                    Favorites
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    onClick={closeMenu}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 px-4 py-2 rounded-md transition duration-200 border border-transparent hover:border-primary-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-5 py-2 rounded-md hover:bg-primary-700 transition duration-200 shadow-sm hover:shadow"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <nav className="flex flex-col space-y-4 py-6 border-b border-gray-200">
            <Link
              to="/"
              className={`${isActive(
                "/"
              )} block transition duration-200 text-lg`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/properties"
              className={`${isActive(
                "/properties"
              )} block transition duration-200 text-lg`}
              onClick={closeMenu}
            >
              Properties
            </Link>
            <Link
              to="/agents"
              className={`${isActive(
                "/agents"
              )} block transition duration-200 text-lg`}
              onClick={closeMenu}
            >
              Agents
            </Link>
            <Link
              to="/contact"
              className={`${isActive(
                "/contact"
              )} block transition duration-200 text-lg`}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Auth Menu */}
          <div className="py-6 flex flex-col space-y-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-4 mb-2 pb-4 border-b border-gray-100">
                  <img
                    src={user?.avatar || "https://via.placeholder.com/40"}
                    alt="User avatar"
                    className="h-12 w-12 rounded-full object-cover border-2 border-primary-100"
                  />
                  <div>
                    <span className="text-gray-800 font-semibold block">
                      {user?.name}
                    </span>
                    <span className="text-gray-500 text-sm">{user?.email}</span>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary-600 transition duration-200 flex items-center"
                  onClick={closeMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Dashboard
                </Link>
                {(user?.role === "agent" || user?.role === "admin") && (
                  <Link
                    to="/my-properties"
                    className="text-gray-700 hover:text-primary-600 transition duration-200 flex items-center"
                    onClick={closeMenu}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    My Properties
                  </Link>
                )}
                <Link
                  to="/favorites"
                  className="text-gray-700 hover:text-primary-600  transition duration-200 flex items-center"
                  onClick={closeMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Favorites
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-primary-600  transition duration-200 flex items-center"
                  onClick={closeMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 flex items-center mt-2 pt-2 border-t border-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 border border-gray-200 py-3 rounded-md text-center transition duration-200"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white py-3 rounded-md hover:bg-primary-700 transition duration-200 text-center"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
