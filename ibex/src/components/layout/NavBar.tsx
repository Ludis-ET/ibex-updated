"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu when location changes
  useEffect(() => {
    closeMenu();
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses", hasDropdown: true },
    { name: "Blog", path: "/blogs" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const courseCategories = [
    { name: "Web Development", path: "/courses?category=web-development" },
    { name: "Data Science", path: "/courses?category=data-science" },
    {
      name: "Mobile Development",
      path: "/courses?category=mobile-development",
    },
    { name: "Cybersecurity", path: "/courses?category=cybersecurity" },
    { name: "UI/UX Design", path: "/courses?category=ui-ux-design" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white dark:bg-gray-800 shadow-md"
          : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Ibex&nbsp;
            </span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              DataScience
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.hasDropdown ? (
                  <button
                    className={`px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center ${
                      location.pathname === link.path
                        ? "font-medium text-blue-600 dark:text-blue-400"
                        : ""
                    }`}
                    onClick={() =>
                      setIsCoursesDropdownOpen(!isCoursesDropdownOpen)
                    }
                  >
                    {link.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      location.pathname === link.path
                        ? "font-medium text-blue-600 dark:text-blue-400"
                        : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                )}

                {/* Dropdown for Courses */}
                {link.hasDropdown && (
                  <div
                    className={`absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                      isCoursesDropdownOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                  >
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      {courseCategories.map((category) => (
                        <Link
                          key={category.name}
                          to={category.path}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                          onClick={() => setIsCoursesDropdownOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                      <div
                        className="border-t border-gray-200 dark:border-gray-700 my-1"
                        role="separator"
                      ></div>
                      <Link
                        to="/courses"
                        className="block px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
                        role="menuitem"
                        onClick={() => setIsCoursesDropdownOpen(false)}
                      >
                        View All Courses
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Sign in / Dashboard */}
            <div className="hidden md:block">
              {location.pathname.includes("/dashboard") ? (
                <Link
                  to="/signin"
                  className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sign Out
                </Link>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 pb-6 space-y-4">
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.hasDropdown ? (
                <div>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between ${
                      location.pathname === link.path
                        ? "font-medium text-blue-600 dark:text-blue-400"
                        : ""
                    }`}
                    onClick={() =>
                      setIsCoursesDropdownOpen(!isCoursesDropdownOpen)
                    }
                  >
                    {link.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isCoursesDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`mt-2 ml-4 space-y-2 ${
                      isCoursesDropdownOpen ? "block" : "hidden"
                    }`}
                  >
                    {courseCategories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      >
                        {category.name}
                      </Link>
                    ))}
                    <Link
                      to="/courses"
                      className="block px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium rounded-md"
                    >
                      View All Courses
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  to={link.path}
                  className={`block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    location.pathname === link.path
                      ? "font-medium text-blue-600 dark:text-blue-400"
                      : ""
                  }`}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            {location.pathname.includes("/dashboard") ? (
              <Link
                to="/signin"
                className="block w-full px-4 py-2 text-center rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign Out
              </Link>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/signin"
                  className="block w-full px-4 py-2 text-center rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/dashboard"
                  className="block w-full px-4 py-2 text-center rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
