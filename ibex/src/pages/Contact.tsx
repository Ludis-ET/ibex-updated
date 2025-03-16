"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

// Office locations
const offices = [
  {
    city: "San Francisco",
    address: "123 Tech Avenue, San Francisco, CA 94107",
    phone: "+1 (415) 555-1234",
    email: "sf@nanolinktech.com",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.95397618613!2d-122.47261270326453!3d37.75776905974103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1647886100000!5m2!1sen!2sus",
  },
  {
    city: "London",
    address: "45 Innovation Square, London, EC2A 4BX, UK",
    phone: "+44 20 7946 0958",
    email: "london@nanolinktech.com",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.72810608297!2d-0.24168108141057206!3d51.52877184053823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1647886200000!5m2!1sen!2sus",
  },
  {
    city: "Singapore",
    address: "78 Technology Park, Singapore 138632",
    phone: "+65 6123 4567",
    email: "singapore@nanolinktech.com",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19036281522!2d103.70416557452022!3d1.3139961237781593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da11238a8b9375%3A0x887869cf52abf5c4!2sSingapore!5e0!3m2!1sen!2sus!4v1647886300000!5m2!1sen!2sus",
  },
];

// FAQ items
const faqItems = [
  {
    question: "How do I enroll in a course?",
    answer:
      "You can browse our available courses and enroll directly through our website. Simply create an account, select your desired course, and complete the payment process to gain immediate access to the course materials.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for course payments. For enterprise solutions, we also offer invoice-based payments.",
  },
  {
    question: "Are there any prerequisites for your courses?",
    answer:
      "Prerequisites vary by course. Each course page clearly lists any required prior knowledge or skills. We offer courses for all levels, from complete beginners to advanced professionals.",
  },
  {
    question: "Do you offer certificates upon completion?",
    answer:
      "Yes, all our courses include a certificate of completion once you've successfully finished all required modules and assessments. These certificates can be shared directly to your LinkedIn profile or downloaded as PDFs.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a 30-day money-back guarantee for most of our courses. If you're unsatisfied with your purchase, you can request a full refund within 30 days of enrollment, provided you haven't completed more than 30% of the course content.",
  },
  {
    question: "How long do I have access to course materials?",
    answer:
      "Once enrolled, you have lifetime access to the course materials, including any future updates to the curriculum. This allows you to learn at your own pace and revisit content whenever needed.",
  },
];

const Contact = () => {
  const [activeOffice, setActiveOffice] = useState(offices[0]);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(
    null
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      // For demo purposes, we'll just show a success message
      setFormStatus("success");
      // Reset form after successful submission
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      // Clear success message after 5 seconds
      setTimeout(() => setFormStatus(null), 5000);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative bg-white dark:bg-gray-800 py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src="/placeholder.svg?height=800&width=1600&text=Contact+Us"
              alt="Contact background"
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
                Get in Touch
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Have questions or need assistance? We're here to help you on
                your learning journey.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Send Us a Message
                </h2>

                {formStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-green-700 dark:text-green-300">
                      Your message has been sent successfully! We'll get back to
                      you soon.
                    </p>
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-red-700 dark:text-red-300">
                      There was an error sending your message. Please try again
                      later.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="Course Inquiry">Course Inquiry</option>
                      <option value="Technical Support">
                        Technical Support
                      </option>
                      <option value="Billing Question">Billing Question</option>
                      <option value="Partnership Opportunity">
                        Partnership Opportunity
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </button>
                </form>
              </motion.div>

              {/* Office Locations */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Offices
                </h2>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap gap-2">
                    {offices.map((office, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveOffice(office)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeOffice.city === office.city
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {office.city}
                      </button>
                    ))}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {activeOffice.city} Office
                    </h3>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                        <p className="text-gray-600 dark:text-gray-300">
                          {activeOffice.address}
                        </p>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                        <p className="text-gray-600 dark:text-gray-300">
                          {activeOffice.phone}
                        </p>
                      </div>
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                        <a
                          href={`mailto:${activeOffice.email}`}
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {activeOffice.email}
                        </a>
                      </div>
                    </div>

                    <div className="h-64 rounded-lg overflow-hidden">
                      <iframe
                        src={activeOffice.mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${activeOffice.city} Office Location`}
                      ></iframe>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Need Immediate Assistance?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our support team is available Monday through Friday, 9am to
                    6pm in your local time zone.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="tel:+18005551234"
                      className="inline-flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium rounded-lg border border-blue-200 dark:border-blue-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Call Support
                    </a>
                    <a
                      href="mailto:support@nanolinktech.com"
                      className="inline-flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium rounded-lg border border-blue-200 dark:border-blue-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Email Support
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {item.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.answer}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Don't see your question here? Feel free to reach out to us
                  directly.
                </p>
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Explore Our Courses
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

export default Contact;
