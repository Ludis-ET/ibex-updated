"use client";

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Clock,
  Users,
  Star,
  BookOpen,
  CheckCircle,
  Play,
  Award,
  Download,
  Share2,
  X,
  Lock,
} from "lucide-react";

import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

// Sample data
import { allCourses } from "../data/courses";

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState(
    allCourses.find((c) => c.id === courseId)
  );
  const [activeTab, setActiveTab] = useState<
    "overview" | "curriculum" | "instructor" | "reviews"
  >("overview");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Get related courses (same category)
  const relatedCourses = allCourses
    .filter((c) => c.id !== courseId && c.category === course?.category)
    .slice(0, 3);

  // Curriculum sections (sample data)
  const curriculumSections = [
    {
      title: "Getting Started",
      lessons: [
        {
          title: "Introduction to the Course",
          duration: "10:15",
          preview: true,
        },
        {
          title: "Setting Up Your Environment",
          duration: "15:30",
          preview: true,
        },
        {
          title: "Understanding the Basics",
          duration: "20:45",
          preview: false,
        },
      ],
    },
    {
      title: "Core Concepts",
      lessons: [
        { title: "Fundamental Principles", duration: "25:10", preview: false },
        { title: "Advanced Techniques", duration: "30:20", preview: false },
        { title: "Practical Applications", duration: "22:15", preview: false },
        {
          title: "Problem Solving Strategies",
          duration: "18:45",
          preview: false,
        },
      ],
    },
    {
      title: "Real-World Projects",
      lessons: [
        {
          title: "Project Planning and Setup",
          duration: "15:30",
          preview: false,
        },
        {
          title: "Building Your First Project",
          duration: "45:20",
          preview: false,
        },
        { title: "Testing and Debugging", duration: "28:15", preview: false },
        {
          title: "Deployment and Maintenance",
          duration: "32:40",
          preview: false,
        },
      ],
    },
  ];

  // If course not found
  if (!course) {
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

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Course Header */}
        <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <Link
                    to="/courses"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Courses
                  </Link>
                  <span className="mx-2">›</span>
                  <Link
                    to={`/courses?category=${course.category}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {course.category}
                  </Link>
                  <span className="mx-2">›</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {course.title}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {course.title}
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {course.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex items-center mr-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(course.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {course.rating.toFixed(1)}
                    </span>
                    <span className="mx-1 text-gray-500 dark:text-gray-400">
                      ({course.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{course.level}</span>
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <img
                    src="/placeholder.svg?height=50&width=50"
                    alt={course.instructor}
                    className="h-10 w-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {course.instructor}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Course Instructor
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Watch Preview
                  </button>
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <Share2 className="h-5 w-5 mr-2" />
                    Share
                  </button>
                </div>
              </div>

              <div className="lg:w-1/3">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 sticky top-24">
                  <div className="relative">
                    <img
                      src={
                        course.image ||
                        `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(
                          course.title
                        )}`
                      }
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => setIsVideoModalOpen(true)}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600/90 hover:bg-blue-700 text-white rounded-full p-4 transition-colors"
                    >
                      <Play className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        {course.discountPrice ? (
                          <>
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                              ${course.discountPrice}
                            </span>
                            <span className="ml-2 text-lg text-gray-500 dark:text-gray-400 line-through">
                              ${course.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-3xl font-bold text-gray-900 dark:text-white">
                            ${course.price}
                          </span>
                        )}
                      </div>
                      {course.discountPrice && (
                        <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium px-2 py-1 rounded">
                          {Math.round(
                            (1 - course.discountPrice / course.price) * 100
                          )}
                          % OFF
                        </div>
                      )}
                    </div>

                    <Link
                      to={`/payment/${course.id}`}
                      className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium rounded-lg transition-colors mb-4"
                    >
                      Enroll Now
                    </Link>

                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
                      30-Day Money-Back Guarantee
                    </p>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        This course includes:
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {course.duration} of on-demand video
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Download className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              25 downloadable resources
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <BookOpen className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              Full lifetime access
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Award className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              Certificate of completion
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Content Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                {/* Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
                  <nav className="flex space-x-8 overflow-x-auto">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`py-4 px-1 text-sm font-medium border-b-2 ${
                        activeTab === "overview"
                          ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                          : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab("curriculum")}
                      className={`py-4 px-1 text-sm font-medium border-b-2 ${
                        activeTab === "curriculum"
                          ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                          : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      }`}
                    >
                      Curriculum
                    </button>
                    <button
                      onClick={() => setActiveTab("instructor")}
                      className={`py-4 px-1 text-sm font-medium border-b-2 ${
                        activeTab === "instructor"
                          ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                          : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      }`}
                    >
                      Instructor
                    </button>
                    <button
                      onClick={() => setActiveTab("reviews")}
                      className={`py-4 px-1 text-sm font-medium border-b-2 ${
                        activeTab === "reviews"
                          ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                          : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      }`}
                    >
                      Reviews
                    </button>
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
                  {/* Overview Tab */}
                  {activeTab === "overview" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        About This Course
                      </h2>
                      <div className="prose dark:prose-invert max-w-none">
                        <p className="mb-4">
                          This comprehensive course is designed to take you from
                          beginner to professional in {course.category}. Whether
                          you're just starting out or looking to enhance your
                          existing skills, this course provides a structured
                          learning path with practical examples and real-world
                          applications.
                        </p>
                        <p className="mb-4">
                          Throughout the course, you'll work on hands-on
                          projects that will help you build a portfolio to
                          showcase your skills to potential employers. Our
                          step-by-step approach ensures that you understand the
                          fundamentals before moving on to more advanced topics.
                        </p>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-4">
                          What You'll Learn
                        </h3>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>
                              Master the core concepts and principles of{" "}
                              {course.category}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>
                              Build real-world projects that solve actual
                              problems
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>
                              Understand best practices and industry standards
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>
                              Develop critical thinking and problem-solving
                              skills
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>
                              Prepare for certification exams and job interviews
                            </span>
                          </li>
                        </ul>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-4">
                          Requirements
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 mb-6">
                          <li>
                            Basic computer skills and familiarity with operating
                            systems
                          </li>
                          <li>
                            No prior experience in {course.category} is required
                            for beginners
                          </li>
                          <li>
                            Intermediate courses may require foundational
                            knowledge
                          </li>
                          <li>
                            A computer with internet access (Windows, Mac, or
                            Linux)
                          </li>
                        </ul>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-4">
                          Who This Course is For
                        </h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            Beginners with no prior experience who want to learn{" "}
                            {course.category}
                          </li>
                          <li>
                            Intermediate learners looking to enhance their
                            existing skills
                          </li>
                          <li>
                            Professionals seeking to stay updated with the
                            latest trends and technologies
                          </li>
                          <li>
                            Career changers looking to enter the field of{" "}
                            {course.category}
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Curriculum Tab */}
                  {activeTab === "curriculum" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Course Curriculum
                      </h2>
                      <div className="space-y-6">
                        {curriculumSections.map((section, sectionIndex) => (
                          <div
                            key={sectionIndex}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                          >
                            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 flex justify-between items-center">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {section.title}
                              </h3>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {section.lessons.length} lessons
                              </span>
                            </div>
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                              {section.lessons.map((lesson, lessonIndex) => (
                                <div
                                  key={lessonIndex}
                                  className="px-4 py-3 flex justify-between items-center"
                                >
                                  <div className="flex items-center">
                                    {lesson.preview ? (
                                      <button
                                        onClick={() =>
                                          setIsVideoModalOpen(true)
                                        }
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center"
                                      >
                                        <Play className="h-4 w-4 mr-2" />
                                        <span className="text-sm font-medium">
                                          {lesson.title}
                                        </span>
                                      </button>
                                    ) : (
                                      <div className="flex items-center">
                                        <Lock className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                          {lesson.title}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {lesson.duration}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Instructor Tab */}
                  {activeTab === "instructor" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Meet Your Instructor
                      </h2>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <img
                            src="/placeholder.svg?height=300&width=300"
                            alt={course.instructor}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {course.instructor}
                          </h3>
                          <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
                            {course.category} Expert & Professional Instructor
                          </p>
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center">
                              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                              <span className="ml-1 text-sm font-medium text-gray-900 dark:text-white">
                                4.9
                              </span>
                              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                                Instructor Rating
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                              <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">
                                45,000+ Students
                              </span>
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                              <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">
                                12 Courses
                              </span>
                            </div>
                          </div>
                          <div className="prose dark:prose-invert max-w-none">
                            <p className="mb-4">
                              With over 15 years of industry experience,{" "}
                              {course.instructor} is a renowned expert in{" "}
                              {course.category}. They have worked with leading
                              companies and organizations, bringing real-world
                              insights and practical knowledge to their
                              teaching.
                            </p>
                            <p className="mb-4">
                              Their teaching philosophy focuses on practical,
                              hands-on learning that prepares students for
                              real-world challenges. They believe in breaking
                              down complex concepts into easy-to-understand
                              modules that build upon each other.
                            </p>
                            <p>
                              When not teaching, they contribute to open-source
                              projects, speak at conferences, and write
                              technical articles for leading publications in the
                              field.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reviews Tab */}
                  {activeTab === "reviews" && (
                    <div>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Student Reviews
                        </h2>
                        <div className="flex items-center mt-2 md:mt-0">
                          <div className="flex items-center mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < Math.floor(course.rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {course.rating.toFixed(1)}
                          </span>
                          <span className="mx-1 text-gray-500 dark:text-gray-400">
                            ({course.reviewCount} reviews)
                          </span>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {/* Sample reviews */}
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
                          >
                            <div className="flex items-start">
                              <img
                                src={`/placeholder.svg?height=50&width=50&text=${
                                  i + 1
                                }`}
                                alt="Reviewer"
                                className="h-10 w-10 rounded-full mr-4"
                              />
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                    {
                                      [
                                        "John D.",
                                        "Sarah M.",
                                        "Robert K.",
                                        "Emily L.",
                                        "Michael P.",
                                      ][i]
                                    }
                                  </h4>
                                  <div className="flex items-center mt-1 sm:mt-0">
                                    <div className="flex">
                                      {[...Array(5)].map((_, j) => (
                                        <Star
                                          key={j}
                                          className={`h-4 w-4 ${
                                            j < 5 - (i % 2)
                                              ? "text-yellow-400 fill-yellow-400"
                                              : "text-gray-300 dark:text-gray-600"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                      {
                                        [
                                          "2 weeks ago",
                                          "1 month ago",
                                          "3 months ago",
                                          "4 months ago",
                                          "6 months ago",
                                        ][i]
                                      }
                                    </span>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                  {
                                    [
                                      "This course exceeded my expectations. The instructor explains complex concepts in a way that's easy to understand, and the practical exercises helped me apply what I learned immediately.",
                                      "I've taken several courses on this topic, but this one stands out for its comprehensive coverage and hands-on approach. Highly recommended for anyone looking to master these skills.",
                                      "The course content is excellent, but I would have appreciated more advanced examples. Still, it provided a solid foundation that I could build upon.",
                                      "Absolutely worth every penny! The instructor's expertise shines through in every lesson, and the course materials are top-notch.",
                                      "A great introduction to the subject. The pace was perfect for beginners, and the instructor was responsive to questions in the discussion forum.",
                                    ][i]
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 text-center">
                        <button className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                          Load More Reviews
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Related Courses */}
              <div className="lg:w-1/3">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Related Courses
                  </h3>
                  <div className="space-y-6">
                    {relatedCourses.map((relatedCourse, index) => (
                      <div key={relatedCourse.id} className="flex gap-4">
                        <img
                          src={
                            relatedCourse.image ||
                            `/placeholder.svg?height=80&width=120&text=${
                              encodeURIComponent(relatedCourse.title) ||
                              "/placeholder.svg"
                            }`
                          }
                          alt={relatedCourse.title}
                          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">
                            <Link
                              to={`/courses/${relatedCourse.id}`}
                              className="hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              {relatedCourse.title}
                            </Link>
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {relatedCourse.instructor}
                          </p>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                              <span className="ml-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                                {relatedCourse.rating.toFixed(1)}
                              </span>
                            </div>
                            <span className="mx-2 text-gray-300 dark:text-gray-600">
                              |
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {relatedCourse.students.toLocaleString()} students
                            </span>
                          </div>
                          <div className="mt-1">
                            {relatedCourse.discountPrice ? (
                              <div className="flex items-center">
                                <span className="text-sm font-bold text-gray-900 dark:text-white">
                                  ${relatedCourse.discountPrice}
                                </span>
                                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400 line-through">
                                  ${relatedCourse.price}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm font-bold text-gray-900 dark:text-white">
                                ${relatedCourse.price}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Start Learning?
              </h2>
              <p className="text-lg mb-8 text-blue-100">
                Join thousands of students who have already enrolled in this
                course.
              </p>
              <Link
                to={`/payment/${course.id}`}
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </section>

        {/* Video Preview Modal */}
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors z-10"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="aspect-video">
                <img
                  src="/placeholder.svg?height=720&width=1280&text=Course Preview Video"
                  alt="Video Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-16 w-16 text-white opacity-70" />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default CourseDetail;
