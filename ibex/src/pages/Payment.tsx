"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  CreditCard,
  Lock,
  CheckCircle,
  Info,
  ChevronRight,
  Calendar,
  User,
  Mail,
  MapPin,
  Phone,
  Shield,
} from "lucide-react";

import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

// Sample data
import { allCourses } from "../data/courses";

const Payment = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  interface Course {
    id: string;
    title: string;
    instructor: string;
    duration: string;
    price: number;
    discountPrice?: number;
    image?: string;
  }

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Payment information
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    // Billing information
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
  });

  // Form errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Coupon code
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  // Get course data
  useEffect(() => {
    setLoading(true);

    // Find the course by ID
    const foundCourse = allCourses.find((c) => c.id === courseId);

    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      setError("Course not found");
    }

    setLoading(false);
  }, [courseId]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    }
    // Format expiry date with slash
    else if (name === "expiryDate") {
      const cleaned = value.replace(/\D/g, "");
      let formatted = cleaned;

      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      }

      setFormData((prev) => ({ ...prev, [name]: formatted }));
    }
    // Handle other inputs normally
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Apply coupon code
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;

    // Simulate coupon validation
    if (couponCode.toUpperCase() === "WELCOME20") {
      setAppliedCoupon({ code: couponCode, discount: 20 });
    } else if (couponCode.toUpperCase() === "STUDENT10") {
      setAppliedCoupon({ code: couponCode, discount: 10 });
    } else {
      setFormErrors((prev) => ({ ...prev, coupon: "Invalid coupon code" }));
    }
  };

  // Remove applied coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  // Calculate order summary
  const calculateOrderSummary = () => {
    if (!course) return { subtotal: 0, discount: 0, total: 0 };

    const subtotal = course.discountPrice || course.price;
    const discount = appliedCoupon
      ? (subtotal * appliedCoupon.discount) / 100
      : 0;
    const total = subtotal - discount;

    return {
      subtotal,
      discount,
      total,
    };
  };

  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Payment information validation
    if (!formData.cardNumber.trim()) {
      errors.cardNumber = "Card number is required";
    } else if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
      errors.cardNumber = "Card number must be 16 digits";
    }

    if (!formData.cardName.trim()) {
      errors.cardName = "Name on card is required";
    }

    if (!formData.expiryDate.trim()) {
      errors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      errors.expiryDate = "Invalid format (MM/YY)";
    }

    if (!formData.cvv.trim()) {
      errors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      errors.cvv = "CVV must be 3 or 4 digits";
    }

    // Billing information validation
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      errors.city = "City is required";
    }

    if (!formData.state.trim()) {
      errors.state = "State is required";
    }

    if (!formData.zipCode.trim()) {
      errors.zipCode = "ZIP code is required";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to the first error
      const firstError = Object.keys(formErrors)[0];
      const element = document.querySelector(`[name="${firstError}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    try {
      setProcessingPayment(true);

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to confirmation page
      navigate("/payment/confirmation", {
        state: {
          course,
          orderSummary: calculateOrderSummary(),
          email: formData.email,
        },
      });
    } catch  {
      setProcessingPayment(false);
      navigate("/payment/error");
    }
  };

  if (loading) {
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

  if (error || !course) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Course Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse All Courses
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { subtotal, discount, total } = calculateOrderSummary();

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li className="inline-flex items-center">
                    <Link
                      to="/"
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <Link
                        to="/courses"
                        className="ml-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        Courses
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <Link
                        to={`/courses/${course.id}`}
                        className="ml-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {course.title}
                      </Link>
                    </div>
                  </li>
                  <li aria-current="page">
                    <div className="flex items-center">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Checkout
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Complete Your Purchase
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Payment Form */}
              <div className="lg:w-2/3">
                <form onSubmit={handleSubmit}>
                  {/* Course Summary */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Course Summary
                    </h2>
                    <div className="flex items-start gap-4">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          Instructor: {course.instructor}
                        </p>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <span className="flex items-center mr-3">
                            <Calendar className="w-4 h-4 mr-1" />
                            {course.duration}
                          </span>
                          <span className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                            Lifetime Access
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label
                          htmlFor="cardNumber"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className={`w-full px-4 py-2 border ${
                              formErrors.cardNumber
                                ? "border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                            <img
                              src="/placeholder.svg?height=24&width=36&text=VISA"
                              alt="Visa"
                              className="h-6"
                            />
                            <img
                              src="/placeholder.svg?height=24&width=36&text=MC"
                              alt="Mastercard"
                              className="h-6"
                            />
                            <img
                              src="/placeholder.svg?height=24&width=36&text=AMEX"
                              alt="American Express"
                              className="h-6"
                            />
                          </div>
                        </div>
                        {formErrors.cardNumber && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.cardNumber}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label
                          htmlFor="cardName"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className={`w-full px-4 py-2 border ${
                            formErrors.cardName
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {formErrors.cardName && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.cardName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="expiryDate"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className={`w-full px-4 py-2 border ${
                            formErrors.expiryDate
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {formErrors.expiryDate && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.expiryDate}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="cvv"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength={4}
                          className={`w-full px-4 py-2 border ${
                            formErrors.cvv
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {formErrors.cvv && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.cvv}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Lock className="w-4 h-4 mr-1" />
                      Your payment information is secure and encrypted
                    </div>
                  </div>

                  {/* Billing Information */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Billing Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            formErrors.firstName
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {formErrors.firstName && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.firstName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            formErrors.lastName
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {formErrors.lastName && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.lastName}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-3 py-2 border ${
                              formErrors.email
                                ? "border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-3 py-2 border ${
                              formErrors.address
                                ? "border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                        {formErrors.address && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.address}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            formErrors.city
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {formErrors.city && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.city}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          State / Province
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            formErrors.state
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {formErrors.state && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.state}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="zipCode"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          ZIP / Postal Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            formErrors.zipCode
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {formErrors.zipCode && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.zipCode}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                          <option value="Japan">Japan</option>
                          <option value="India">India</option>
                          <option value="Brazil">Brazil</option>
                          <option value="Mexico">Mexico</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-3 py-2 border ${
                              formErrors.phone
                                ? "border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Order Summary (visible on small screens) */}
                  <div className="lg:hidden bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Order Summary
                    </h2>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">
                          Subtotal
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>

                      {appliedCoupon && (
                        <div className="flex justify-between text-green-600 dark:text-green-400">
                          <span>Discount ({appliedCoupon.code})</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between font-semibold">
                        <span className="text-gray-900 dark:text-white">
                          Total
                        </span>
                        <span className="text-blue-600 dark:text-blue-400">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={processingPayment}
                      className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center ${
                        processingPayment ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {processingPayment ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Complete Purchase
                          <Lock className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Order Summary (desktop) */}
              <div className="lg:w-1/3">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Order Summary
                  </h2>

                  <div className="mb-6">
                    <div className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {course.instructor}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Coupon Code */}
                  <div className="mb-6">
                    <label
                      htmlFor="couponCode"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Coupon Code
                    </label>

                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {appliedCoupon.code}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {appliedCoupon.discount}% discount applied
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex">
                        <input
                          type="text"
                          id="couponCode"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter coupon code"
                          className={`flex-grow px-4 py-2 border ${
                            formErrors.coupon
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          } rounded-l-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-r-lg transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    )}

                    {formErrors.coupon && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.coupon}
                      </p>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Subtotal
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-green-600 dark:text-green-400">
                        <span>Discount ({appliedCoupon.code})</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between font-semibold">
                      <span className="text-gray-900 dark:text-white">
                        Total
                      </span>
                      <span className="text-blue-600 dark:text-blue-400">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Secure Payment Notice */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-start">
                      <Shield className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          Secure Payment
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Your payment information is encrypted and secure. We
                          never store your full credit card details.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Money-back Guarantee */}
                  <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Info className="h-4 w-4 text-blue-500 mr-2" />
                    30-day money-back guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Payment;
