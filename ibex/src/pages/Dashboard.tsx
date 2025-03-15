"use client";

import type React from "react";

import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  BarChart3,
  BadgeIcon as Certificate,
  Settings,
  Bell,
  Search,
  LogOut,
  Menu,
  Star,
} from "lucide-react";

import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "../components/ui/sidebar";

// Sample user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/placeholder.svg?height=200&width=200",
  role: "Student",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if we're on the main dashboard page or a sub-page
  const isMainDashboard =
    location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  // Navigation items for the sidebar
  const navItems = [
    {
      path: "/dashboard",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      path: "/dashboard/my-courses",
      label: "My Courses",
      icon: BookOpen,
    },
    {
      path: "/dashboard/learning",
      label: "Learning",
      icon: GraduationCap,
    },
    {
      path: "/dashboard/performance",
      label: "Performance",
      icon: BarChart3,
    },
    {
      path: "/dashboard/certificates",
      label: "Certificates",
      icon: Certificate,
    },
    {
      path: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <SidebarProvider>
          <div className="flex">
            {/* Sidebar */}
            <Sidebar className="hidden md:block">
              <SidebarHeader className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <img
                      src={userData.avatar || "/placeholder.svg"}
                      alt={userData.name}
                      className="h-10 w-10 rounded-full object-cover border-2 border-blue-600 dark:border-blue-400"
                    />
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {userData.name}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {userData.role}
                    </p>
                  </div>
                </div>
              </SidebarHeader>

              <SidebarContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.path}
                        tooltip={item.label}
                      >
                        <button
                          onClick={() => navigate(item.path)}
                          className="w-full text-left"
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarContent>

              <SidebarFooter className="p-4">
                <button
                  onClick={() => navigate("/signin")}
                  className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  <LogOut className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span>Sign Out</span>
                </button>
              </SidebarFooter>
            </Sidebar>

            {/* Mobile menu button */}
            <div className="md:hidden fixed bottom-6 right-6 z-20">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
                title="Toggle Mobile Menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed inset-0 z-10 md:hidden bg-gray-900/50 dark:bg-black/50 backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  className="absolute right-0 top-0 h-full w-3/4 max-w-xs bg-white dark:bg-gray-800 shadow-xl p-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <img
                          src={userData.avatar || "/placeholder.svg"}
                          alt={userData.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <h2 className="text-sm font-medium text-gray-900 dark:text-white">
                            {userData.name}
                          </h2>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {userData.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    <nav className="flex-1 space-y-1">
                      {navItems.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => {
                            navigate(item.path);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`flex items-center space-x-3 w-full p-3 rounded-md ${
                            location.pathname === item.path
                              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </nav>

                    <button
                      onClick={() => navigate("/signin")}
                      className="flex items-center space-x-3 w-full p-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 mt-6"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Main content */}
            <div className="flex-1 p-4 md:p-8">
              <SidebarTrigger className="mb-4 md:mb-6" />

              {/* Render the appropriate dashboard content */}
              {isMainDashboard ? <DashboardOverview /> : <Outlet />}
            </div>
          </div>
        </SidebarProvider>
      </main>
      <Footer />
    </>
  );
};

// Dashboard Overview Component
const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back, {userData.name}!
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <button title="Notifications" className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>

          <div className="relative">
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none text-sm text-gray-700 dark:text-gray-300 w-32 md:w-40"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Courses Enrolled"
          value="5"
          change="+1"
          changeType="positive"
          icon={BookOpen}
        />
        <StatCard
          title="Courses Completed"
          value="3"
          change="+1"
          changeType="positive"
          icon={GraduationCap}
        />
        <StatCard
          title="Hours Spent"
          value="42.5"
          change="+3.5"
          changeType="positive"
          icon={BarChart3}
        />
        <StatCard
          title="Certificates"
          value="2"
          change="0"
          changeType="neutral"
          icon={Certificate}
        />
      </div>

      {/* Course Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Course Progress
          </h2>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
            View All
          </button>
        </div>

        <div className="space-y-6">
          <CourseProgressCard
            title="Complete Web Development Bootcamp"
            instructor="Dr. Alex Morgan"
            progress={75}
            lastAccessed="2 days ago"
            image="/placeholder.svg?height=80&width=120"
          />

          <CourseProgressCard
            title="Data Science & Machine Learning Masterclass"
            instructor="Prof. Sarah Williams"
            progress={45}
            lastAccessed="Yesterday"
            image="/placeholder.svg?height=80&width=120"
          />

          <CourseProgressCard
            title="UI/UX Design Fundamentals"
            instructor="Emily Rodriguez"
            progress={90}
            lastAccessed="Today"
            image="/placeholder.svg?height=80&width=120"
          />
        </div>
      </div>

      {/* Recent Activity and Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">
            <ActivityItem
              title="Completed Lesson"
              description="Advanced CSS Techniques"
              time="2 hours ago"
            />
            <ActivityItem
              title="Submitted Assignment"
              description="JavaScript Fundamentals Quiz"
              time="Yesterday"
            />
            <ActivityItem
              title="Started Course"
              description="UI/UX Design Fundamentals"
              time="2 days ago"
            />
            <ActivityItem
              title="Earned Certificate"
              description="HTML & CSS Mastery"
              time="1 week ago"
            />
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Upcoming Deadlines
          </h2>

          <div className="space-y-4">
            <DeadlineItem
              title="Final Project Submission"
              course="Web Development Bootcamp"
              dueDate="Tomorrow"
              status="urgent"
            />
            <DeadlineItem
              title="Weekly Quiz"
              course="Data Science Masterclass"
              dueDate="3 days"
              status="upcoming"
            />
            <DeadlineItem
              title="Peer Review"
              course="UI/UX Design Fundamentals"
              dueDate="5 days"
              status="upcoming"
            />
            <DeadlineItem
              title="Group Discussion"
              course="Web Development Bootcamp"
              dueDate="1 week"
              status="planned"
            />
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Performance Metrics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quiz Scores */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Quiz Scores
            </h3>
            <div className="space-y-4">
              <PerformanceMetric
                label="Web Development"
                value={85}
                maxValue={100}
                color="blue"
              />
              <PerformanceMetric
                label="Data Science"
                value={72}
                maxValue={100}
                color="purple"
              />
              <PerformanceMetric
                label="UI/UX Design"
                value={94}
                maxValue={100}
                color="green"
              />
            </div>
          </div>

          {/* Assignment Completion */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Assignment Completion
            </h3>
            <div className="space-y-4">
              <PerformanceMetric
                label="Web Development"
                value={12}
                maxValue={15}
                color="blue"
              />
              <PerformanceMetric
                label="Data Science"
                value={8}
                maxValue={12}
                color="purple"
              />
              <PerformanceMetric
                label="UI/UX Design"
                value={6}
                maxValue={6}
                color="green"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Courses */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Recommended Courses
          </h2>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RecommendedCourseCard
            title="Advanced JavaScript Patterns"
            instructor="Robert Johnson"
            rating={4.8}
            students={12350}
            price={129.99}
            discountPrice={89.99}
            image="/placeholder.svg?height=120&width=200"
          />

          <RecommendedCourseCard
            title="React & Redux Masterclass"
            instructor="Jessica Lee"
            rating={4.9}
            students={15420}
            price={149.99}
            discountPrice={99.99}
            image="/placeholder.svg?height=120&width=200"
          />

          <RecommendedCourseCard
            title="Python for Data Analysis"
            instructor="Michael Chen"
            rating={4.7}
            students={9840}
            price={119.99}
            discountPrice={79.99}
            image="/placeholder.svg?height=120&width=200"
          />
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ElementType;
}

const StatCard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
}: StatCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </h3>
        </div>
        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
      </div>

      <div className="mt-4">
        <span
          className={`text-xs font-medium ${
            changeType === "positive"
              ? "text-green-600 dark:text-green-400"
              : changeType === "negative"
              ? "text-red-600 dark:text-red-400"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {change} {changeType !== "neutral" && "this week"}
        </span>
      </div>
    </div>
  );
};

// Course Progress Card Component
interface CourseProgressCardProps {
  title: string;
  instructor: string;
  progress: number;
  lastAccessed: string;
  image: string;
}

const CourseProgressCard = ({
  title,
  instructor,
  progress,
  lastAccessed,
  image,
}: CourseProgressCardProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        className="w-full sm:w-24 h-16 sm:h-24 object-cover rounded-md"
      />

      <div className="flex-1">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {instructor}
        </p>

        <div className="mb-2">
          <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {progress}% complete
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Last accessed: {lastAccessed}
          </span>
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:justify-center gap-2">
        <button title="Open Course" className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30">
          <BookOpen className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

// Activity Item Component
interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
}

const ActivityItem = ({ title, description, time }: ActivityItemProps) => {
  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
        <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {time}
      </span>
    </div>
  );
};

// Deadline Item Component
interface DeadlineItemProps {
  title: string;
  course: string;
  dueDate: string;
  status: "urgent" | "upcoming" | "planned";
}

const DeadlineItem = ({
  title,
  course,
  dueDate,
  status,
}: DeadlineItemProps) => {
  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          status === "urgent"
            ? "bg-red-100 dark:bg-red-900/30"
            : status === "upcoming"
            ? "bg-yellow-100 dark:bg-yellow-900/30"
            : "bg-green-100 dark:bg-green-900/30"
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            status === "urgent"
              ? "bg-red-600 dark:bg-red-400"
              : status === "upcoming"
              ? "bg-yellow-600 dark:bg-yellow-400"
              : "bg-green-600 dark:bg-green-400"
          }`}
        ></span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{course}</p>
      </div>

      <span
        className={`text-xs font-medium whitespace-nowrap px-2 py-1 rounded-full ${
          status === "urgent"
            ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
            : status === "upcoming"
            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
            : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
        }`}
      >
        Due in {dueDate}
      </span>
    </div>
  );
};

// Performance Metric Component
interface PerformanceMetricProps {
  label: string;
  value: number;
  maxValue: number;
  color: "blue" | "green" | "purple" | "red" | "yellow";
}

const PerformanceMetric = ({
  label,
  value,
  maxValue,
  color,
}: PerformanceMetricProps) => {
  const percentage = (value / maxValue) * 100;

  const colorClasses = {
    blue: "bg-blue-600 dark:bg-blue-500",
    green: "bg-green-600 dark:bg-green-500",
    purple: "bg-purple-600 dark:bg-purple-500",
    red: "bg-red-600 dark:bg-red-500",
    yellow: "bg-yellow-600 dark:bg-yellow-500",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {value}/{maxValue}
        </span>
      </div>
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// Recommended Course Card Component
interface RecommendedCourseCardProps {
  title: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  discountPrice?: number;
  image: string;
}

const RecommendedCourseCard = ({
  title,
  instructor,
  rating,
  students,
  price,
  discountPrice,
  image,
}: RecommendedCourseCardProps) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-32 object-cover"
        />
        {discountPrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {Math.round((1 - discountPrice / price) * 100)}% OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {instructor}
        </p>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              {rating.toFixed(1)}
            </span>
          </div>
          <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {students.toLocaleString()} students
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {discountPrice ? (
              <>
                <span className="text-base font-bold text-gray-900 dark:text-white">
                  ${discountPrice}
                </span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
                  ${price}
                </span>
              </>
            ) : (
              <span className="text-base font-bold text-gray-900 dark:text-white">
                ${price}
              </span>
            )}
          </div>

          <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
