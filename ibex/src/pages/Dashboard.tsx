"use client";

import type React from "react";

import { useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  ShoppingCart,
  CreditCard,
  HelpCircle,
  Info,
  LogOut,
  Menu,
  Bell,
  Search,
  ExternalLink,
  Home,
  FileText,
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
  memberSince: "January 2023",
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
      label: "Dashboard",
      icon: Home,
    },
    {
      path: "/dashboard/my-courses",
      label: "My Courses",
      icon: ShoppingCart,
    },
    {
      path: "/dashboard/profile",
      label: "Profile Settings",
      icon: User,
    },
    {
      path: "/dashboard/billing",
      label: "Billing & Payments",
      icon: CreditCard,
    },
    {
      path: "/dashboard/support",
      label: "Help & Support",
      icon: HelpCircle,
    },
    {
      path: "/about",
      label: "About Us",
      icon: Info,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <SidebarProvider>
          <div className="flex">
            {/* Sidebar */}
            <Sidebar className="hidden md:block border-r border-gray-200 dark:border-gray-700">
              <SidebarHeader className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={userData.avatar || "/placeholder.svg"}
                      alt={userData.name}
                      className="h-12 w-12 rounded-full object-cover border-2 border-blue-600 dark:border-blue-400 shadow-md"
                    />
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                      {userData.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {userData.role}
                    </p>
                  </div>
                </div>
              </SidebarHeader>

              <SidebarContent className="px-3">
                <div className="mb-6">
                  <p className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Main
                  </p>
                  <SidebarMenu>
                    {navItems.slice(0, 1).map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === item.path}
                          tooltip={item.label}
                          className={`mb-1 ${
                            location.pathname === item.path
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                        >
                          <Link to={item.path} className="w-full text-left">
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </div>

                <div className="mb-6">
                  <p className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Account
                  </p>
                  <SidebarMenu>
                    {navItems.slice(1, 4).map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === item.path}
                          tooltip={item.label}
                          className={`mb-1 ${
                            location.pathname === item.path
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                        >
                          <Link to={item.path} className="w-full text-left">
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </div>

                <div className="mb-6">
                  <p className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Support
                  </p>
                  <SidebarMenu>
                    {navItems.slice(4).map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === item.path}
                          tooltip={item.label}
                          className={`mb-1 ${
                            location.pathname === item.path
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                        >
                          <Link to={item.path} className="w-full text-left">
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </div>

                {/* Learning Platform Link */}
                <div className="px-3 py-4 mt-2">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-4 shadow-md">
                    <h3 className="text-white font-medium mb-2">
                      Ready to learn?
                    </h3>
                    <p className="text-blue-100 text-sm mb-3">
                      Access your courses on our learning platform
                    </p>
                    <a
                      href="https://learn.nanolinktech.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full bg-white text-blue-600 font-medium rounded-md py-2 px-3 text-sm hover:bg-blue-50 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Learning Platform
                    </a>
                  </div>
                </div>
              </SidebarContent>

              <SidebarFooter className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
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
                  className="absolute right-0 top-0 h-full w-3/4 max-w-xs bg-white dark:bg-gray-800 shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <img
                          src={userData.avatar || "/placeholder.svg"}
                          alt={userData.name}
                          className="h-12 w-12 rounded-full object-cover border-2 border-blue-600 dark:border-blue-400"
                        />
                        <div>
                          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                            {userData.name}
                          </h2>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {userData.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                      <div className="mb-6">
                        <p className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Main
                        </p>
                        <nav className="space-y-1">
                          {navItems.slice(0, 1).map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`flex items-center space-x-3 w-full p-3 rounded-md ${
                                location.pathname === item.path
                                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                              }`}
                            >
                              <item.icon className="h-5 w-5" />
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </nav>
                      </div>

                      <div className="mb-6">
                        <p className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Account
                        </p>
                        <nav className="space-y-1">
                          {navItems.slice(1, 4).map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`flex items-center space-x-3 w-full p-3 rounded-md ${
                                location.pathname === item.path
                                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                              }`}
                            >
                              <item.icon className="h-5 w-5" />
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </nav>
                      </div>

                      <div className="mb-6">
                        <p className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Support
                        </p>
                        <nav className="space-y-1">
                          {navItems.slice(4).map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`flex items-center space-x-3 w-full p-3 rounded-md ${
                                location.pathname === item.path
                                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                              }`}
                            >
                              <item.icon className="h-5 w-5" />
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </nav>
                      </div>

                      {/* Learning Platform Link */}
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-4 shadow-md mb-6">
                        <h3 className="text-white font-medium mb-2">
                          Ready to learn?
                        </h3>
                        <p className="text-blue-100 text-sm mb-3">
                          Access your courses on our learning platform
                        </p>
                        <a
                          href="https://learn.nanolinktech.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-full bg-white text-blue-600 font-medium rounded-md py-2 px-3 text-sm hover:bg-blue-50 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Learning Platform
                        </a>
                      </div>
                    </div>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => navigate("/signin")}
                        className="flex items-center space-x-3 w-full p-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
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
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Welcome back, {userData.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your account and courses
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <button className="relative p-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700">
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

      {/* Learning Platform Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Ready to start learning?
              </h2>
              <p className="text-blue-100 mb-4 max-w-lg">
                Access your courses, track your progress, and connect with
                instructors on our dedicated learning platform.
              </p>
              <a
                href="https://learn.nanolinktech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                Go to Learning Platform
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
            <div className="hidden md:block">
              <img
                src="/placeholder.svg?height=120&width=200&text=Learning+Platform"
                alt="Learning Platform"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickActionCard
          title="Profile Settings"
          description="Update your personal information and preferences"
          icon={User}
          linkTo="/dashboard/profile"
          color="blue"
        />
        <QuickActionCard
          title="My Courses"
          description="View your purchased courses and manage enrollments"
          icon={ShoppingCart}
          linkTo="/dashboard/my-courses"
          color="purple"
        />
        <QuickActionCard
          title="Billing & Payments"
          description="Manage payment methods and view transaction history"
          icon={CreditCard}
          linkTo="/dashboard/billing"
          color="green"
        />
      </div>

      {/* Recent Purchases */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Purchases
            </h2>
            <Link
              to="/dashboard/my-courses"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-5">
            <PurchaseItem
              title="Complete Web Development Bootcamp"
              date="May 15, 2023"
              price={89.99}
              status="active"
              image="/placeholder.svg?height=80&width=120"
            />
            <PurchaseItem
              title="Data Science & Machine Learning Masterclass"
              date="April 22, 2023"
              price={99.99}
              status="active"
              image="/placeholder.svg?height=80&width=120"
            />
            <PurchaseItem
              title="UI/UX Design Fundamentals"
              date="March 10, 2023"
              price={79.99}
              status="active"
              image="/placeholder.svg?height=80&width=120"
            />
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Account Information
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Name:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {userData.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Email:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {userData.email}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Member Since:
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                {userData.memberSince}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Subscription:
              </span>
              <span className="text-green-600 dark:text-green-400 font-medium">
                Active
              </span>
            </div>
            <div className="pt-4">
              <Link
                to="/dashboard/profile"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Help & Resources
          </h2>
          <div className="space-y-4">
            <Link
              to="/dashboard/support"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Support Center
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Get help with your account or courses
                </p>
              </div>
            </Link>
            <Link
              to="/about"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  About Us
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Learn more about Nanolink Tech
                </p>
              </div>
            </Link>
            <a
              href="/docs/terms-of-service.pdf"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Terms of Service
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Review our terms and conditions
                </p>
              </div>
            </a>
            <a
              href="/docs/privacy-policy.pdf"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Privacy Policy
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Learn how we protect your data
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quick Action Card Component
interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  linkTo: string;
  color: "blue" | "green" | "purple" | "red" | "amber";
}

const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  linkTo,
  color,
}: QuickActionCardProps) => {
  const colorClasses = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    green:
      "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    purple:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    amber:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  };

  return (
    <Link
      to={linkTo}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start">
        <div
          className={`h-12 w-12 rounded-full flex items-center justify-center ${colorClasses[color]} mr-4`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

// Purchase Item Component
interface PurchaseItemProps {
  title: string;
  date: string;
  price: number;
  status: "active" | "expired" | "refunded";
  image: string;
}

const PurchaseItem = ({
  title,
  date,
  price,
  status,
  image,
}: PurchaseItemProps) => {
  const statusClasses = {
    active:
      "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    expired: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
    refunded: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        className="w-16 h-12 object-cover rounded-md flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium text-gray-900 dark:text-white truncate">
          {title}
        </h3>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span>Purchased: {date}</span>
          <span className="mx-2">•</span>
          <span>${price.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex-shrink-0">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
