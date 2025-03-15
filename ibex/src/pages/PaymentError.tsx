"use client";

import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

const PaymentError = () => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    // Go back to the previous page (payment page)
    navigate(-1);
  };

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
            <div className="mx-auto w-20 h-20 flex items-center justify-center bg-red-100 dark:bg-red-900/30 rounded-full mb-6">
              <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Payment Failed
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              We couldn't process your payment. Please check your payment
              details and try again.
            </p>

            <div className="space-y-4 mb-8">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Common reasons for payment failure:
              </p>

              <ul className="text-left text-sm text-gray-600 dark:text-gray-300 space-y-2 max-w-xs mx-auto">
                <li className="flex items-start">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 mr-2"></span>
                  Insufficient funds in your account
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 mr-2"></span>
                  Incorrect card information
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 mr-2"></span>
                  Card expired or blocked for online transactions
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 mr-2"></span>
                  Transaction declined by your bank
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleTryAgain}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Try Again
              </button>

              <Link
                to="/courses"
                className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Courses
              </Link>
            </div>
          </motion.div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Need help? Contact our support team:
            </p>

            <div className="flex justify-center">
              <Link
                to="/contact"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PaymentError;
