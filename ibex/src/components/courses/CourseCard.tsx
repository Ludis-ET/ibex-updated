"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Users, Star } from "lucide-react";

interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  reviewCount: number;
  price: number;
  discountPrice?: number;
  image: string;
  category: string;
  level: string;
  duration: string;
  students: number;
  description: string;
}

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard = ({ course, index }: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            course.image ||
            `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(
              course.title
            )}`
          }
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
          {course.category}
        </div>

        {/* Level Badge */}
        <div className="absolute top-4 right-4 bg-gray-900/80 dark:bg-gray-700/80 text-white text-xs font-medium px-2 py-1 rounded">
          {course.level}
        </div>
      </div>

      {/* Course Content */}
      <div className="p-5">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>{course.duration}</span>
          <span className="mx-2">•</span>
          <Users className="h-4 w-4 mr-1" />
          <span>{course.students.toLocaleString()} students</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium text-gray-900 dark:text-white">
              {course.rating.toFixed(1)}
            </span>
          </div>
          <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {course.instructor}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {course.discountPrice ? (
              <>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${course.discountPrice}
                </span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
                  ${course.price}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ${course.price}
              </span>
            )}
          </div>

          <Link
            to={`/courses/${course.id}`}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-blue-600/90 dark:bg-blue-800/90 flex flex-col items-center justify-center p-6 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isHovered ? "auto" : "none" }}
      >
        <h3 className="text-xl font-bold mb-3 text-center">{course.title}</h3>
        <p className="text-sm mb-6 text-center">{course.description}</p>
        <Link
          to={`/courses/${course.id}`}
          className="inline-flex items-center justify-center px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
        >
          View Course
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default CourseCard;
