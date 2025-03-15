"use client";

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Calendar,
  BookOpen,
  Download,
  Award,
  ChevronRight,
} from "lucide-react";

import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  interface OrderDetails {
    course: {
      image: string;
      title: string;
      instructor: string;
      duration: string;
      level: string;
    };
    orderSummary: {
      subtotal: number;
      discount: number;
      total: number;
    };
    email: string;
  }

  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Check if we have order details from the payment page
    if (location.state?.course && location.state?.orderSummary) {
      setOrderDetails({
        course: location.state.course,
        orderSummary: location.state.orderSummary,
        email: location.state.email,
      });

      // Generate a random order number
      setOrderNumber(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
    } else {
      // If no order details, redirect to courses page
      navigate("/courses");
    }
  }, [location, navigate]);

  if (!orderDetails) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-96 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { course, orderSummary, email } = orderDetails;

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8 text-center"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Payment Successful!
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Thank you for your purchase. Your order has been confirmed.
              </p>

              <div className="inline-block bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Order Number:{" "}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {orderNumber}
                  </span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/dashboard/my-courses"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Go to My Courses
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Browse More Courses
                </Link>
              </div>
            </motion.div>

            {/* Order Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8"
            >
              <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order Details
                </h2>
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full md:w-32 h-24 md:h-32 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Instructor: {course.instructor}
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Calendar className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {course.level}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Subtotal
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${orderSummary.subtotal.toFixed(2)}
                      </span>
                    </div>

                    {orderSummary.discount > 0 && (
                      <div className="flex justify-between text-green-600 dark:text-green-400">
                        <span>Discount</span>
                        <span>-${orderSummary.discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between font-semibold">
                      <span className="text-gray-900 dark:text-white">
                        Total
                      </span>
                      <span className="text-blue-600 dark:text-blue-400">
                        ${orderSummary.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Receipt & Access Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Receipt & Access Information
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    A receipt has been sent to:
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {email}
                  </p>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    What's Next?
                  </h3>

                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                          1
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium">
                          Access Your Course
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Your course is now available in your dashboard under
                          "My Courses"
                        </p>
                      </div>
                    </li>

                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                          2
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium">
                          Download Resources
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Access all course materials and supplementary
                          resources
                        </p>
                      </div>
                    </li>

                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                          3
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium">
                          Start Learning
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Begin your learning journey and track your progress
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-start">
                      <Download className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          Lifetime Access
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          You have unlimited access to this course and all
                          future updates
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-start">
                      <Award className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          Certificate of Completion
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Earn a certificate when you complete the course
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PaymentConfirmation;
