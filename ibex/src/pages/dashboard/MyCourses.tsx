"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  Star,
  Users,
  ChevronDown,
  X,
} from "lucide-react";

// Sample data
const enrolledCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Alex Morgan",
    progress: 75,
    lastAccessed: "2 days ago",
    image: "/placeholder.svg?height=200&width=400",
    category: "Programming",
    level: "Beginner",
    duration: "12 weeks",
    totalLessons: 120,
    completedLessons: 90,
    rating: 4.9,
    students: 15420,
  },
  {
    id: "2",
    title: "Data Science & Machine Learning Masterclass",
    instructor: "Prof. Sarah Williams",
    progress: 45,
    lastAccessed: "Yesterday",
    image: "/placeholder.svg?height=200&width=400",
    category: "Data Science",
    level: "Intermediate",
    duration: "10 weeks",
    totalLessons: 95,
    completedLessons: 43,
    rating: 4.8,
    students: 12350,
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    instructor: "Emily Rodriguez",
    progress: 90,
    lastAccessed: "Today",
    image: "/placeholder.svg?height=200&width=400",
    category: "Design",
    level: "Beginner",
    duration: "6 weeks",
    totalLessons: 48,
    completedLessons: 43,
    rating: 4.9,
    students: 11250,
  },
  {
    id: "4",
    title: "Python Programming for Beginners",
    instructor: "Lisa Wang",
    progress: 60,
    lastAccessed: "3 days ago",
    image: "/placeholder.svg?height=200&width=400",
    category: "Programming",
    level: "Beginner",
    duration: "8 weeks",
    totalLessons: 64,
    completedLessons: 38,
    rating: 4.7,
    students: 18750,
  },
  {
    id: "5",
    title: "Cybersecurity Professional Certification",
    instructor: "James Wilson",
    progress: 30,
    lastAccessed: "1 week ago",
    image: "/placeholder.svg?height=200&width=400",
    category: "Cybersecurity",
    level: "Advanced",
    duration: "16 weeks",
    totalLessons: 128,
    completedLessons: 38,
    rating: 4.7,
    students: 8760,
  },
];

const MyCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("progress");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter and sort courses
  const filteredCourses = enrolledCourses
    .filter((course) => {
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

      // Level filter
      if (selectedLevel !== "All" && course.level !== selectedLevel) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sort courses
      switch (sortBy) {
        case "progress":
          return b.progress - a.progress;
        case "recent":
          // This would normally use dates, but for demo we'll use the lastAccessed string
          return a.lastAccessed.localeCompare(b.lastAccessed);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  // Get unique categories and levels for filters
  const categories = [
    "All",
    ...new Set(enrolledCourses.map((course) => course.category)),
  ];
  const levels = [
    "All",
    ...new Set(enrolledCourses.map((course) => course.level)),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            My Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your progress and continue learning
          </p>
        </div>
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
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-2 pl-4 pr-10 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Level
                </option>
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-2 pl-4 pr-10 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="progress">Progress</option>
                <option value="recent">Recently Accessed</option>
                <option value="title">Title</option>
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
            <div className="p-4 space-y-6">
              <div>
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

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Level
                </h4>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => {
                        setSelectedLevel(level);
                        setIsFilterOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedLevel === level
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </h4>
                <div className="space-y-2">
                  {[
                    { value: "progress", label: "Progress" },
                    { value: "recent", label: "Recently Accessed" },
                    { value: "title", label: "Title" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsFilterOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        sortBy === option.value
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedLevel("All");
                    setSortBy("progress");
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
            <CourseCard key={course.id} course={course} />
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
                setSelectedLevel("All");
              }}
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Course Card Component
interface CourseCardProps {
  course: {
    id: string;
    title: string;
    instructor: string;
    progress: number;
    lastAccessed: string;
    image: string;
    category: string;
    level: string;
    duration: string;
    totalLessons: number;
    completedLessons: number;
    rating: number;
    students: number;
  };
}

const CourseCard = ({ course }: CourseCardProps) => {
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
                  <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {course.duration}
                  </span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {course.level}
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {course.rating}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {course.students.toLocaleString()} students
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between">
              <div className="text-right mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last accessed
                </p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {course.lastAccessed}
                </p>
              </div>

              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                Continue Learning
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {course.completedLessons} of {course.totalLessons} lessons
                completed
              </span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                {course.progress}%
              </span>
            </div>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
