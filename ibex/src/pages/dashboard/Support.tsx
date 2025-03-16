"use client";

import type React from "react";

import { useState } from "react";
import {
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  ExternalLink,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Sample FAQ data
const faqItems = [
  {
    question: "How do I access my purchased courses?",
    answer:
      "You can access your purchased courses by logging into our learning platform at learn.nanolinktech.com. Once logged in, navigate to 'My Courses' to see all your available courses.",
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
  {
    question: "Can I download course videos for offline viewing?",
    answer:
      "Yes, most of our courses allow you to download videos for offline viewing through our learning platform. This feature is available on both desktop and mobile devices, allowing you to learn even without an internet connection.",
  },
  {
    question: "How do I get a certificate after completing a course?",
    answer:
      "Certificates are automatically generated when you complete all required modules and assessments in a course. You can access your certificates from the 'Achievements' section of your learning platform dashboard and share them directly to LinkedIn or download as PDFs.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for course payments. For enterprise solutions, we also offer invoice-based payments.",
  },
];

const Support = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filter FAQs based on search term
  const filteredFaqs = faqItems.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    setFormSubmitted(true);

    // Reset form after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setContactFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 5000);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
          Help & Support
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Find answers to common questions or contact our support team
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
              <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Help Center
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Browse our comprehensive knowledge base for detailed guides and
            tutorials.
          </p>
          <a
            href="https://help.nanolinktech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            Visit Help Center
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4">
              <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Live Chat
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Chat with our support team in real-time for immediate assistance.
          </p>
          <a
            href="https://chat.nanolinktech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline"
          >
            Start Chat
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4">
              <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Documentation
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Access detailed documentation for our platform and courses.
          </p>
          <a
            href="https://docs.nanolinktech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline"
          >
            View Documentation
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search FAQs..."
                className="w-full py-2 pl-10 pr-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center w-full px-6 py-4 text-left bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 py-4 bg-white dark:bg-gray-800">
                      <p className="text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Search className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  No results found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  We couldn't find any FAQs matching your search.
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Form and Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Contact Support
              </h2>
            </div>

            <div className="p-6">
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Thank you for contacting us. We'll get back to you as soon
                    as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        value={contactFormData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                        value={contactFormData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
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
                      value={contactFormData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="Account Issue">Account Issue</option>
                      <option value="Course Access">Course Access</option>
                      <option value="Billing Question">Billing Question</option>
                      <option value="Technical Problem">
                        Technical Problem
                      </option>
                      <option value="Refund Request">Refund Request</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={contactFormData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Please describe your issue in detail..."
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Send Message
                      <MessageCircle className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Contact Information
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">
                      Email Support
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      General Inquiries:
                    </p>
                    <a
                      href="mailto:support@nanolinktech.com"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      support@nanolinktech.com
                    </a>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 mb-1">
                      Billing Questions:
                    </p>
                    <a
                      href="mailto:billing@nanolinktech.com"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      billing@nanolinktech.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">
                      Phone Support
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      Customer Service:
                    </p>
                    <a
                      href="tel:+18005551234"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      +1 (800) 555-1234
                    </a>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 mb-1">
                      Technical Support:
                    </p>
                    <a
                      href="tel:+18005555678"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      +1 (800) 555-5678
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">
                      Support Hours
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Monday - Friday:
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                      9:00 AM - 6:00 PM EST
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Saturday:
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                      10:00 AM - 2:00 PM EST
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">Sunday:</p>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
