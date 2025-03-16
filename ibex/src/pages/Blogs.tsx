"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, Clock, X } from "lucide-react";

import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

// Sample blog data
const blogPosts = [
  {
    id: "1",
    title: "Getting Started with Web Development: A Complete Beginner's Guide",
    excerpt:
      "Learn the fundamentals of web development with this comprehensive guide for absolute beginners. Discover HTML, CSS, and JavaScript basics to start your coding journey.",
    author: "Dr. Alex Morgan",
    authorAvatar:
      "https://images.pexels.com/photos/19825351/pexels-photo-19825351/free-photo-of-blog-post-with-scrabble-letters-spelling-out-blog-post.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "Mar 15, 2023",
    readTime: "8 min read",
    category: "Web Development",
    tags: ["HTML", "CSS", "JavaScript", "Beginners"],
    featuredImage:
      "https://images.pexels.com/photos/19825351/pexels-photo-19825351/free-photo-of-blog-post-with-scrabble-letters-spelling-out-blog-post.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    featured: true,
  },
  {
    id: "2",
    title: "The Future of AI in Education: Transforming Learning Experiences",
    excerpt:
      "Explore how artificial intelligence is revolutionizing education systems worldwide, creating personalized learning paths and helping educators be more effective.",
    author: "Prof. Sarah Williams",
    authorAvatar:
      "https://images.pexels.com/photos/4057659/pexels-photo-4057659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "Apr 2, 2023",
    readTime: "12 min read",
    category: "Artificial Intelligence",
    tags: ["AI", "Education", "Machine Learning", "EdTech"],
    featuredImage:
      "https://images.pexels.com/photos/4057659/pexels-photo-4057659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    featured: true,
  },
  {
    id: "3",
    title: "Building Responsive UIs with Modern CSS Techniques",
    excerpt:
      "Master the latest CSS features like Grid, Flexbox, and Custom Properties to create beautiful, responsive user interfaces that work across all devices.",
    author: "Emily Rodriguez",
    authorAvatar:
      "https://images.pexels.com/photos/20046363/pexels-photo-20046363/free-photo-of-pictures-of-valentines-day-on-laptop-screen.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "Apr 10, 2023",
    readTime: "10 min read",
    category: "Web Development",
    tags: ["CSS", "Responsive Design", "UI", "Frontend"],
    featuredImage:
      "https://images.pexels.com/photos/20046363/pexels-photo-20046363/free-photo-of-pictures-of-valentines-day-on-laptop-screen.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    featured: false,
  },
  {
    id: "4",
    title: "Data Science Project Workflow: From Data Collection to Deployment",
    excerpt:
      "Learn a step-by-step approach to data science projects, covering data collection, cleaning, analysis, modeling, and deployment of machine learning solutions.",
    author: "Michael Chen",
    authorAvatar:
      "https://images.pexels.com/photos/18465017/pexels-photo-18465017/free-photo-of-a-typewriter-with-a-paper-that-says-deepfake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "Apr 18, 2023",
    readTime: "15 min read",
    category: "Data Science",
    tags: ["Python", "Machine Learning", "Data Analysis", "Project Management"],
    featuredImage:
      "https://images.pexels.com/photos/18465017/pexels-photo-18465017/free-photo-of-a-typewriter-with-a-paper-that-says-deepfake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    featured: false,
  },
  {
    id: "5",
    title: "Cybersecurity Best Practices for Remote Teams",
    excerpt:
      "Protect your organization with these essential cybersecurity measures designed specifically for remote and distributed teams in the post-pandemic workplace.",
    author: "James Wilson",
    authorAvatar:
      "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "Apr 25, 2023",
    readTime: "9 min read",
    category: "Cybersecurity",
    tags: ["Security", "Remote Work", "Data Protection", "Privacy"],
    featuredImage:
      "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    featured: false,
  },
  {
    id: "6",
    title: "React vs. Vue: Choosing the Right Frontend Framework",
    excerpt:
      "Compare React and Vue.js across performance, learning curve, community support, and use cases to determine which framework is best for your next project.",
    author: "Jessica Lee",
    authorAvatar:
      "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "May 3, 2023",
    readTime: "11 min read",
    category: "Web Development",
    tags: ["React", "Vue.js", "JavaScript", "Frontend"],
    featuredImage:
      "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    featured: false,
  },
  {
    id: "7",
    title: "Introduction to Cloud Computing Architecture",
    excerpt:
      "Understand the fundamental concepts of cloud computing architecture, including service models, deployment strategies, and best practices for scalability.",
    author: "Robert Johnson",
    authorAvatar:
      "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "May 12, 2023",
    readTime: "13 min read",
    category: "Cloud Computing",
    tags: ["AWS", "Azure", "Infrastructure", "DevOps"],
    featuredImage:
      "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    featured: false,
  },
  {
    id: "8",
    title: "UI/UX Design Principles Every Developer Should Know",
    excerpt:
      "Bridge the gap between development and design by learning essential UI/UX principles that will help you create more intuitive, user-friendly applications.",
    author: "Emily Rodriguez",
    authorAvatar:
      "https://images.pexels.com/photos/330771/pexels-photo-330771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    date: "May 20, 2023",
    readTime: "7 min read",
    category: "Design",
    tags: ["UI", "UX", "Design Systems", "Accessibility"],
    featuredImage:
      "https://images.pexels.com/photos/330771/pexels-photo-330771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    featured: false,
  },
];

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>("recent");

  // Get unique categories for filter
  const categories = [
    "All",
    ...Array.from(new Set(blogPosts.map((post) => post.category))),
  ];

  // Get all unique tags for filter
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

  // Filter and sort blog posts
  const filteredPosts = blogPosts
    .filter((post) => {
      // Search filter
      if (
        searchTerm &&
        !post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (selectedCategory !== "All" && post.category !== selectedCategory) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sort posts
      switch (sortBy) {
        case "recent":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  // Featured posts
  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <section className="bg-white dark:bg-gray-800 py-12 md:py-16 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Nanolink Tech Blog
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Insights, tutorials, and news from our team of experts
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for articles..."
                  className="w-full py-3 pl-10 pr-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
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
            </div>
          </div>
        </section>

        {/* Featured Posts Carousel */}
        {featuredPosts.length > 0 && (
          <section className="py-12 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Featured Articles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-gray-50 dark:bg-gray-700/50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <Link to={`/blogs/${post.id}`} className="block">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={post.featuredImage || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
                        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
                          Featured
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center">
                            <img
                              src={post.authorAvatar || "/placeholder.svg"}
                              alt={post.author}
                              className="h-8 w-8 rounded-full mr-2"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {post.author}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {post.date}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime}
                          </span>
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                            Read more
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <div className="lg:w-1/4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Categories
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Popular Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.slice(0, 10).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Sort By
                    </h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="oldest">Oldest First</option>
                      <option value="title">Title (A-Z)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Mobile Filter Button */}
              <div className="lg:hidden mb-6">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="flex items-center gap-2 bg-white dark:bg-gray-800 py-2 px-4 rounded-lg shadow-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
              </div>

              {/* Mobile Filter Drawer */}
              {isFilterOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black/50 flex justify-end">
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
                        <h4 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Categories
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
                        <h4 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Sort By
                        </h4>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="recent">Most Recent</option>
                          <option value="oldest">Oldest First</option>
                          <option value="title">Title (A-Z)</option>
                        </select>
                      </div>

                      <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => {
                            setSelectedCategory("All");
                            setSortBy("recent");
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

              {/* Blog Post Grid */}
              <div className="lg:w-3/4">
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {filteredPosts.length}{" "}
                    {filteredPosts.length === 1 ? "Article" : "Articles"} Found
                  </h2>
                </div>

                {filteredPosts.length > 0 ? (
                  <div className="space-y-8">
                    {filteredPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                      >
                        <Link
                          to={`/blogs/${post.id}`}
                          className="md:w-1/3 relative"
                        >
                          <div className="h-48 md:h-full overflow-hidden">
                            <img
                              src={post.featuredImage || "/placeholder.svg"}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        </Link>
                        <div className="p-6 md:w-2/3">
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="flex items-center">
                              <img
                                src={post.authorAvatar || "/placeholder.svg"}
                                alt={post.author}
                                className="h-6 w-6 rounded-full mr-2"
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {post.author}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {post.date}
                            </span>
                          </div>
                          <Link
                            to={`/blogs/${post.id}`}
                            className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                          >
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                              {post.title}
                            </h3>
                          </Link>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Clock className="h-4 w-4 mr-1" />
                              {post.readTime}
                            </span>
                            <Link
                              to={`/blogs/${post.id}`}
                              className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300"
                            >
                              Read more
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
                    <div className="mb-4 text-gray-400 dark:text-gray-500">
                      <Search className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      No articles found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      We couldn't find any articles matching your search
                      criteria.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("All");
                      }}
                      className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-blue-600 dark:bg-blue-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Stay Updated
              </h2>
              <p className="text-blue-100 mb-8">
                Subscribe to our newsletter to receive the latest articles,
                tutorials, and updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-l-lg sm:rounded-none focus:outline-none"
                />
                <button className="bg-gray-900 text-white px-6 py-3 rounded-r-lg sm:rounded-none font-medium hover:bg-gray-800 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-blue-100 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blogs;
