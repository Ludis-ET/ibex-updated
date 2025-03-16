"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  FileText,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

// Sample data
const purchasedCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Alex Morgan",
    purchaseDate: "May 15, 2023",
    expiryDate: "Lifetime Access",
    price: 89.99,
    image: "/placeholder.svg?height=200&width=400",
    category: "Programming",
    status: "active",
    receipt: "INV-2023-001",
    canRefund: true,
  },
  {
    id: "2",
    title: "Data Science & Machine Learning Masterclass",
    instructor: "Prof. Sarah Williams",
    purchaseDate: "April 22, 2023",
    expiryDate: "Lifetime Access",
    price: 99.99,
    image: "/placeholder.svg?height=200&width=400",
    category: "Data Science",
    status: "active",
    receipt: "INV-2023-002",
    canRefund: true,
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    instructor: "Emily Rodriguez",
    purchaseDate: "March 10, 2023",
    expiryDate: "Lifetime Access",
    price: 79.99,
    image: "/placeholder.svg?height=200&width=400",
    category: "Design",
    status: "active",
    receipt: "INV-2023-003",
    canRefund: false,
  },
  {
    id: "4",
    title: "Python Programming for Beginners",
    instructor: "Lisa Wang",
    purchaseDate: "February 5, 2023",
    expiryDate: "Lifetime Access",
    price: 69.99,
    image: "/placeholder.svg?height=200&width=400",
    category: "Programming",
    status: "active",
    receipt: "INV-2023-004",
    canRefund: false,
  },
  {
    id: "5",
    title: "Introduction to Digital Marketing",
    instructor: "Robert Johnson",
    purchaseDate: "January 20, 2023",
    expiryDate: "January 20, 2024",
    price: 59.99,
    image: "/placeholder.svg?height=200&width=400",
    category: "Marketing",
    status: "active",
    receipt: "INV-2023-005",
    canRefund: false,
  },
];

const MyCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  // Get unique categories for filter
  const categories = [
    "All",
    ...Array.from(new Set(purchasedCourses.map((course) => course.category))),
  ];

  // Filter courses
  const filteredCourses = purchasedCourses.filter((course) => {
    // Search filter
    if (
      searchTerm &&
      !course.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Category filter
    if (selectedCategory !== "All" && course.category !== selectedCategory) {
      return false;
    }

    // Status filter
    if (selectedStatus !== "All" && course.status !== selectedStatus) {
      return false;
    }

    return true;
  });

  const handleRefundRequest = (course: any) => {
    setSelectedCourse(course);
    setIsRefundModalOpen(true);
  };

  const confirmRefund = () => {
    // In a real app, you would send a request to your backend
    alert(`Refund requested for: ${selectedCourse.title}`);
    setIsRefundModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            My Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your purchased courses
          </p>
        </div>

        <a
          href="https://learn.nanolinktech.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Go to Learning Platform
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your courses..."
            className="w-full py-2 pl-10 pr-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Mobile filter button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="md:hidden flex items-center gap-2 bg-white dark:bg-gray-800 py-2 px-4 rounded-lg shadow-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>

          {/* Desktop filters */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-2 pl-4 pr-10 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>

            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-2 pl-4 pr-10 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="refunded">Refunded</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 flex justify-end">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="w-4/5 max-w-sm bg-white dark:bg-gray-800 h-full overflow-y-auto"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Filters
              </h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsFilterOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </h4>
                <div className="space-y-2">
                  {["All", "active", "expired", "refunded"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setSelectedStatus(status);
                        setIsFilterOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedStatus === status
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {status === "All"
                        ? "All Statuses"
                        : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedStatus("All");
                    setIsFilterOpen(false);
                  }}
                  className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Course List */}
      <div className="space-y-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onRefundRequest={handleRefundRequest}
            />
          ))
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
            <div className="mb-4 text-gray-400 dark:text-gray-500">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We couldn't find any courses matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedStatus("All");
              }}
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Refund Confirmation Modal */}
      {isRefundModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Confirm Refund Request
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to request a refund for{" "}
              <span className="font-medium">{selectedCourse.title}</span>? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsRefundModalOpen(false)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmRefund}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Request Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Course Card Component
interface CourseCardProps {
  course: {
    id: string;
    title: string;
    instructor: string;
    purchaseDate: string;
    expiryDate: string;
    price: number;
    image: string;
    category: string;
    status: string;
    receipt: string;
    canRefund: boolean;
  };
  onRefundRequest: (course: any) => void;
}

const CourseCard = ({ course, onRefundRequest }: CourseCardProps) => {
  const statusClasses = {
    active:
      "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    expired: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
    refunded: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 relative">
          <img
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            className="w-full h-48 md:h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
            {course.category}
          </div>
        </div>

        <div className="p-6 md:w-3/4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Instructor: {course.instructor}
              </p>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Purchased:</span>{" "}
                    {course.purchaseDate}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Expires:</span>{" "}
                    {course.expiryDate}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Price:</span> $
                    {course.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  statusClasses[course.status as keyof typeof statusClasses]
                }`}
              >
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </span>

              <div className="flex flex-col gap-2 mt-4">
                <a
                  href="https://learn.nanolinktech.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Access Course
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>

                <div className="flex gap-2">
                  <a
                    href={`/receipts/${course.receipt}.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Receipt
                  </a>

                  {course.canRefund && (
                    <button
                      onClick={() => onRefundRequest(course)}
                      className="inline-flex items-center justify-center px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Refund
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
