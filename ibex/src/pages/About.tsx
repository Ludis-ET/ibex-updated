"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Award,
  Users,
  BookOpen,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

// Team members data
const teamMembers = [
  {
    name: "Dr. Alex Morgan",
    role: "Founder & CEO",
    bio: "With over 15 years of experience in tech education, Dr. Morgan founded Nanolink Tech to bridge the gap between theoretical knowledge and practical skills.",
    image: "/placeholder.svg?height=300&width=300&text=Alex",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Prof. Sarah Williams",
    role: "Chief Learning Officer",
    bio: "Former university professor with a passion for making education accessible to all. Sarah oversees our curriculum development and teaching methodologies.",
    image: "/placeholder.svg?height=300&width=300&text=Sarah",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Tech innovator with experience at leading Silicon Valley companies. Michael ensures our platform leverages cutting-edge technology to deliver the best learning experience.",
    image: "/placeholder.svg?height=300&width=300&text=Michael",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Design",
    bio: "Award-winning UX/UI designer who believes in creating intuitive, accessible interfaces. Emily leads our design team to create engaging learning experiences.",
    image: "/placeholder.svg?height=300&width=300&text=Emily",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "James Wilson",
    role: "Head of Cybersecurity",
    bio: "Former security consultant for Fortune 500 companies, James brings real-world expertise to our cybersecurity curriculum and ensures our platform's security.",
    image: "/placeholder.svg?height=300&width=300&text=James",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Jessica Lee",
    role: "Head of Student Success",
    bio: "With a background in educational psychology, Jessica develops support systems to ensure every student achieves their learning goals and career aspirations.",
    image: "/placeholder.svg?height=300&width=300&text=Jessica",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
];

// Company milestones
const milestones = [
  {
    year: "2015",
    title: "Company Founded",
    description:
      "Nanolink Tech was founded with a mission to make quality tech education accessible to everyone.",
  },
  {
    year: "2017",
    title: "First 10,000 Students",
    description:
      "Reached our first major milestone of 10,000 enrolled students across our initial course offerings.",
  },
  {
    year: "2019",
    title: "Global Expansion",
    description:
      "Expanded our operations to Europe and Asia, with new offices in London and Singapore.",
  },
  {
    year: "2020",
    title: "Enterprise Solutions",
    description:
      "Launched Nanolink Enterprise, providing customized training solutions for businesses and organizations.",
  },
  {
    year: "2022",
    title: "25,000+ Graduates",
    description:
      "Celebrated over 25,000 graduates who have successfully completed our programs and advanced their careers.",
  },
  {
    year: "2023",
    title: "Industry Recognition",
    description:
      "Received multiple awards for educational excellence and innovation in tech training.",
  },
];

// Office locations
const offices = [
  {
    city: "San Francisco",
    address: "123 Tech Avenue, San Francisco, CA 94107",
    phone: "+1 (415) 555-1234",
    email: "sf@nanolinktech.com",
    image: "/placeholder.svg?height=400&width=600&text=San+Francisco",
  },
  {
    city: "London",
    address: "45 Innovation Square, London, EC2A 4BX, UK",
    phone: "+44 20 7946 0958",
    email: "london@nanolinktech.com",
    image: "/placeholder.svg?height=400&width=600&text=London",
  },
  {
    city: "Singapore",
    address: "78 Technology Park, Singapore 138632",
    phone: "+65 6123 4567",
    email: "singapore@nanolinktech.com",
    image: "/placeholder.svg?height=400&width=600&text=Singapore",
  },
];

const About = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20 bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative bg-white dark:bg-gray-800 py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src="/placeholder.svg?height=800&width=1600&text=Team+Collaboration"
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                About{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  Nanolink
                </span>
                Tech
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Empowering the future through innovative tech education and
                training solutions.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="/placeholder.svg?height=600&width=800&text=Team+Meeting"
                  alt="Team meeting"
                  className="rounded-xl shadow-xl w-full"
                />
              </motion.div>
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  At Nanolink Tech, our mission is to democratize technology
                  education and empower individuals to thrive in the digital
                  economy. We believe that quality tech education should be
                  accessible to everyone, regardless of their background or
                  prior experience.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  We're committed to bridging the gap between theoretical
                  knowledge and practical skills, preparing our students for
                  real-world challenges and opportunities in the ever-evolving
                  tech landscape.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        Student-Centered
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Our approach puts students first, with personalized
                        learning paths.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                      <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        Global Reach
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Serving students from over 150 countries worldwide.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                      <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        Industry-Relevant
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Curriculum designed with input from industry leaders.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                      <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        Excellence
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Committed to the highest standards in education.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                These principles guide everything we do at Nanolink Tech, from
                curriculum development to student support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  description:
                    "We constantly evolve our teaching methods and curriculum to incorporate the latest technologies and industry trends.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Accessibility",
                  description:
                    "We're committed to making quality tech education accessible to learners of all backgrounds, abilities, and circumstances.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Excellence",
                  description:
                    "We strive for excellence in everything we do, from course content to student support and platform experience.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Practical Learning",
                  description:
                    "We emphasize hands-on, project-based learning that prepares students for real-world challenges and opportunities.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Community",
                  description:
                    "We foster a supportive community where students can connect, collaborate, and grow together.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Integrity",
                  description:
                    "We operate with transparency, honesty, and ethical practices in all aspects of our business.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-600 dark:text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  ),
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Our diverse team of experts is passionate about education and
                technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {member.bio}
                    </p>
                    <div className="flex space-x-4">
                      <a
                        href={member.social.linkedin}
                        className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                      <a
                        href={member.social.twitter}
                        className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a
                        href={member.social.github}
                        className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Milestones */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Key milestones in our mission to transform tech education.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900/50"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex-1"></div>

                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-white dark:border-gray-800 z-10 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {milestone.year.substring(2)}
                      </span>
                    </div>

                    <div
                      className={`flex-1 ${
                        index % 2 === 0 ? "pl-12" : "pr-12"
                      }`}
                    >
                      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md">
                        <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Global Presence */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Global Presence
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                With offices across three continents, we're bringing quality
                tech education to students worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={office.image || "/placeholder.svg"}
                      alt={office.city}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {office.city}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                        <p className="text-gray-600 dark:text-gray-300">
                          {office.address}
                        </p>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                        <p className="text-gray-600 dark:text-gray-300">
                          {office.phone}
                        </p>
                      </div>
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                        <p className="text-gray-600 dark:text-gray-300">
                          {office.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-blue-600 dark:bg-blue-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of students who are transforming their careers
                with Nanolink Tech.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-100 text-blue-600 font-medium rounded-lg transition-colors"
                >
                  Explore Courses
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors border border-blue-500"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
