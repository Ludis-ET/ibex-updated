"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";

import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative mx-auto w-48 h-48 mb-8">
              <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full animate-ping opacity-25"></div>
              <div className="relative flex items-center justify-center w-full h-full bg-white dark:bg-gray-800 rounded-full shadow-lg">
                <span className="text-8xl font-bold text-blue-600 dark:text-blue-400">
                  404
                </span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Page Not Found
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              The page you are looking for doesn't exist or has been moved.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>

              <Link
                to="/courses"
                className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <Search className="mr-2 h-5 w-5" />
                Browse Courses
              </Link>
            </div>
          </motion.div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Here are some helpful links:
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Home
              </Link>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <Link
                to="/courses"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Courses
              </Link>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <Link
                to="/blogs"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Blog
              </Link>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <Link
                to="/contact"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
