"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Heart,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
  ChevronRight,
} from "lucide-react";

import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

// Sample blog data (same as in Blogs.tsx)
const blogPosts = [
  {
    id: "1",
    title: "Getting Started with Web Development: A Complete Beginner's Guide",
    excerpt:
      "Learn the fundamentals of web development with this comprehensive guide for absolute beginners. Discover HTML, CSS, and JavaScript basics to start your coding journey.",
    author: "Dr. Alex Morgan",
    authorAvatar: "/placeholder.svg?height=50&width=50",
    authorBio:
      "Dr. Alex Morgan is a web development instructor with over 10 years of experience. He specializes in teaching beginners and has helped thousands of students start their coding careers.",
    date: "Mar 15, 2023",
    readTime: "8 min read",
    category: "Web Development",
    tags: ["HTML", "CSS", "JavaScript", "Beginners"],
    featuredImage: "/placeholder.svg?height=400&width=800",
    content: `
      <h2>Introduction to Web Development</h2>
      <p>Web development is the process of building and maintaining websites. It involves different aspects like web design, web publishing, web programming, and database management. The field has grown exponentially over the past decades, with the internet becoming an integral part of our daily lives.</p>
      
      <p>If you're interested in becoming a web developer, you're embarking on an exciting journey. The web development landscape offers countless opportunities for creativity, problem-solving, and innovation. Plus, it's a field with consistently high demand and competitive salaries.</p>
      
      <h2>The Three Pillars of Web Development</h2>
      
      <h3>HTML: The Structure</h3>
      <p>HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure and content of web pages. Think of HTML as the skeleton of a website.</p>
      
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;My First Web Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
    &lt;p&gt;This is my first web page.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
      
      <h3>CSS: The Presentation</h3>
      <p>CSS (Cascading Style Sheets) is used to control the presentation, formatting, and layout of web pages. It determines how HTML elements are displayed on screen, on paper, or in other media. CSS is like the skin and clothes of a website.</p>
      
      <pre><code>body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
    text-align: center;
}

p {
    line-height: 1.6;
    color: #666;
}</code></pre>
      
      <h3>JavaScript: The Behavior</h3>
      <p>JavaScript is a programming language that enables interactive web pages. It's used to create dynamic and interactive experiences for the user. JavaScript is like the muscles and brain of a website, allowing it to respond to user actions.</p>
      
      <pre><code>document.querySelector('h1').addEventListener('click', function() {
    alert('Hello, World!');
});

function changeColor() {
    document.body.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
}</code></pre>
      
      <h2>Setting Up Your Development Environment</h2>
      <p>To start coding, you need a few essential tools:</p>
      
      <ol>
        <li><strong>Text Editor or IDE:</strong> Programs like Visual Studio Code, Sublime Text, or Atom are great for writing code.</li>
        <li><strong>Web Browser:</strong> Modern browsers like Chrome, Firefox, or Edge have powerful developer tools built-in.</li>
        <li><strong>Version Control:</strong> Git is the industry standard for tracking changes in your code.</li>
      </ol>
      
      <h2>Your First Project</h2>
      <p>Let's create a simple profile page using HTML and CSS:</p>
      
      <ol>
        <li>Create a new folder for your project</li>
        <li>Inside that folder, create two files: index.html and styles.css</li>
        <li>Write your HTML code in index.html</li>
        <li>Write your CSS code in styles.css</li>
        <li>Link the CSS file in your HTML using the &lt;link&gt; tag</li>
        <li>Open index.html in your browser to see your webpage</li>
      </ol>
      
      <p>Congratulations! You've created your first web page. This is just the beginning of your web development journey. As you continue learning, you'll discover how to build more complex websites, implement responsive design, work with databases, and much more.</p>
      
      <h2>Next Steps</h2>
      <p>Here are some resources to continue your learning journey:</p>
      
      <ul>
        <li>MDN Web Docs: Comprehensive documentation for web technologies</li>
        <li>freeCodeCamp: Free interactive coding lessons</li>
        <li>CSS-Tricks: Excellent tips and tutorials for CSS</li>
        <li>JavaScript.info: In-depth JavaScript tutorials</li>
      </ul>
      
      <p>Remember, the key to becoming a good web developer is consistent practice. Build small projects, experiment with different technologies, and don't be afraid to make mistakes. Every error is an opportunity to learn something new.</p>
    `,
    featured: true,
    views: 1250,
    likes: 73,
    comments: 15,
  },
  {
    id: "2",
    title: "The Future of AI in Education: Transforming Learning Experiences",
    excerpt:
      "Explore how artificial intelligence is revolutionizing education systems worldwide, creating personalized learning paths and helping educators be more effective.",
    author: "Prof. Sarah Williams",
    authorAvatar: "/placeholder.svg?height=50&width=50",
    authorBio:
      "Prof. Sarah Williams is an education technology researcher and consultant. She has published numerous papers on the integration of AI in educational settings.",
    date: "Apr 2, 2023",
    readTime: "12 min read",
    category: "Artificial Intelligence",
    tags: ["AI", "Education", "Machine Learning", "EdTech"],
    featuredImage: "/placeholder.svg?height=400&width=800",
    content: `
      <h2>Introduction</h2>
      <p>Artificial Intelligence (AI) is rapidly transforming various sectors, and education is no exception. From personalized learning experiences to automated administrative tasks, AI is reshaping how students learn and how educators teach. This article explores the current and future impacts of AI on education.</p>
      
      <h2>Personalized Learning Experiences</h2>
      <p>One of the most significant advantages of AI in education is its ability to personalize learning experiences based on individual student needs, preferences, and abilities.</p>
      
      <h3>Adaptive Learning Platforms</h3>
      <p>AI-powered adaptive learning platforms analyze student performance and adjust difficulty levels accordingly. These systems can identify knowledge gaps and recommend specific content to address them, ensuring each student receives the support they need.</p>
      
      <h3>Personalized Content Recommendations</h3>
      <p>Similar to how Netflix recommends shows based on viewing history, AI can suggest learning resources that align with a student's interests and learning style. This personalization helps maintain engagement and motivation.</p>
      
      <h2>AI as a Teaching Assistant</h2>
      <p>AI is increasingly serving as a valuable assistant to educators, helping them manage their workload and focus on high-impact teaching activities.</p>
      
      <h3>Automated Grading</h3>
      <p>AI systems can grade objective assessments instantly and are becoming increasingly sophisticated at evaluating subjective responses like essays. This automation frees up significant time for teachers to focus on instruction and student support.</p>
      
      <h3>Content Generation</h3>
      <p>AI tools can help teachers generate quizzes, worksheets, and explanatory materials, reducing preparation time and ensuring a variety of materials for different learning needs.</p>
      
      <h2>Intelligent Tutoring Systems</h2>
      <p>AI-powered tutoring systems provide one-on-one support to students, offering immediate feedback and guidance when human tutors aren't available.</p>
      
      <p>These systems use natural language processing to understand student questions and provide relevant explanations. They can also track progress over time, adjusting their approach based on the student's learning patterns.</p>
      
      <h2>Predictive Analytics for Student Success</h2>
      <p>Educational institutions are using AI to analyze data and predict student outcomes, enabling early intervention for at-risk students.</p>
      
      <p>These systems consider various factors, including attendance, engagement, and performance on assessments, to identify students who might need additional support. This proactive approach helps improve retention and graduation rates.</p>
      
      <h2>Ethical Considerations and Challenges</h2>
      <p>Despite its potential benefits, the integration of AI in education raises important ethical considerations that must be addressed.</p>
      
      <h3>Data Privacy and Security</h3>
      <p>AI systems collect and analyze vast amounts of student data, raising concerns about privacy and security. Educational institutions must implement robust data protection measures and ensure compliance with regulations like FERPA and GDPR.</p>
      
      <h3>Equity and Access</h3>
      <p>There's a risk that AI could exacerbate existing educational inequalities if access is limited to well-funded schools or students with certain resources. Ensuring equitable access to AI-powered educational tools is crucial.</p>
      
      <h3>Human Connection</h3>
      <p>Education is inherently social, and human connections between teachers and students are vital. While AI can enhance education, it should complement rather than replace human interaction.</p>
      
      <h2>The Future Landscape</h2>
      <p>Looking ahead, several emerging trends will likely shape the future of AI in education:</p>
      
      <h3>Immersive Learning Experiences</h3>
      <p>AI combined with virtual and augmented reality will create immersive learning environments that make abstract concepts tangible and engaging.</p>
      
      <h3>Emotion Recognition</h3>
      <p>Future AI systems may incorporate emotion recognition to detect student engagement, frustration, or confusion, allowing for more responsive and empathetic learning experiences.</p>
      
      <h3>Lifelong Learning Support</h3>
      <p>As careers evolve and require continuous upskilling, AI will play a crucial role in supporting lifelong learning, offering personalized pathways for professional development.</p>
      
      <h2>Conclusion</h2>
      <p>AI is poised to transform education in profound ways, offering personalized learning experiences, supporting educators, and providing valuable insights through data analysis. While challenges exist, thoughtful implementation of AI in educational settings has the potential to enhance learning outcomes and make quality education more accessible to all.</p>
      
      <p>The key will be finding the right balance – leveraging AI's capabilities while preserving the human elements that make education meaningful and effective. As we navigate this evolving landscape, ongoing dialogue between educators, technologists, policymakers, and students will be essential in shaping an AI-enhanced educational future that truly serves learners' needs.</p>
    `,
    featured: true,
    views: 980,
    likes: 62,
    comments: 11,
  },
  {
    id: "3",
    title: "Building Responsive UIs with Modern CSS Techniques",
    excerpt:
      "Master the latest CSS features like Grid, Flexbox, and Custom Properties to create beautiful, responsive user interfaces that work across all devices.",
    author: "Emily Rodriguez",
    authorAvatar: "/placeholder.svg?height=50&width=50",
    authorBio:
      "Emily Rodriguez is a frontend developer and UI/UX specialist. She works with leading tech companies to create intuitive user interfaces.",
    date: "Apr 10, 2023",
    readTime: "10 min read",
    category: "Web Development",
    tags: ["CSS", "Responsive Design", "UI", "Frontend"],
    featuredImage: "/placeholder.svg?height=400&width=800",
    content: `
      <h2>Introduction to Modern CSS</h2>
      <p>CSS has evolved significantly in recent years, with powerful new features that make it easier than ever to create responsive, dynamic user interfaces. This article explores modern CSS techniques that every developer should know.</p>
      
      <h2>Flexbox: One-Dimensional Layout</h2>
      <p>Flexbox is a layout mode designed for one-dimensional layouts - either as a row or as a column. This makes it perfect for constructing navigation bars, form elements, and other UI components.</p>
      
      <h3>Key Concepts</h3>
      <p>Flexbox introduces several important concepts:</p>
      <ul>
        <li><strong>Main Axis and Cross Axis:</strong> Understanding these axes is crucial for controlling flex layout</li>
        <li><strong>Flex Container and Flex Items:</strong> The parent container and its direct children</li>
        <li><strong>Flexibility:</strong> How items grow or shrink relative to each other</li>
      </ul>
      
      <h3>Basic Flexbox Example</h3>
      <pre><code>.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item {
  flex: 1;
  margin: 10px;
}</code></pre>
      
      <h2>CSS Grid: Two-Dimensional Layout</h2>
      <p>While Flexbox is great for one-dimensional layouts, CSS Grid excels at two-dimensional layouts, making it ideal for overall page structure and complex UI components.</p>
      
      <h3>Grid Concepts</h3>
      <ul>
        <li><strong>Grid Container and Grid Items:</strong> Similar to Flexbox's container and items</li>
        <li><strong>Grid Lines, Tracks, Cells, and Areas:</strong> These form the foundation of Grid's layout power</li>
        <li><strong>Explicit vs. Implicit Grids:</strong> Understanding how Grid handles defined and undefined content</li>
      </ul>
      
      <h3>Basic Grid Example</h3>
      <pre><code>.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}

.header {
  grid-column: 1 / -1;
}

.sidebar {
  grid-row: 2 / 4;
}</code></pre>
      
      <h2>CSS Custom Properties (Variables)</h2>
      <p>CSS Custom Properties, often called CSS Variables, allow you to define reusable values that can be referenced throughout your stylesheet. This makes your CSS more maintainable and dynamic.</p>
      
      <h3>Basic Usage</h3>
      <pre><code>:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --padding-standard: 1rem;
}

.button {
  background-color: var(--primary-color);
  padding: var(--padding-standard);
}

.button-secondary {
  background-color: var(--secondary-color);
}</code></pre>
      
      <h3>Dynamic Values with JavaScript</h3>
      <p>One of the most powerful aspects of CSS Custom Properties is that they can be modified with JavaScript:</p>
      
      <pre><code>// Change the primary color
document.documentElement.style.setProperty('--primary-color', '#e74c3c');</code></pre>
      
      <h2>Media Queries and Container Queries</h2>
      
      <h3>Media Queries</h3>
      <p>Media queries allow you to apply CSS styles based on device characteristics, such as screen width, height, or orientation.</p>
      
      <pre><code>/* Styles for screens wider than 768px */
@media screen and (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}</code></pre>
      
      <h3>Container Queries</h3>
      <p>Container queries are a newer feature that allow styles to be applied based on the size of a parent container, rather than the viewport. This makes components more reusable across different contexts.</p>
      
      <pre><code>.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
  }
}</code></pre>
      
      <h2>Modern Responsive Techniques</h2>
      
      <h3>Fluid Typography</h3>
      <p>Create typography that scales smoothly between screen sizes using the clamp() function:</p>
      
      <pre><code>h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}</code></pre>
      
      <h3>Aspect Ratio Control</h3>
      <p>Maintain consistent aspect ratios for images and videos:</p>
      
      <pre><code>.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}</code></pre>
      
      <h3>Content-Aware Layouts with min(), max(), and clamp()</h3>
      <p>These functions allow for more dynamic, content-aware layouts:</p>
      
      <pre><code>.container {
  width: min(90%, 1200px);
  padding: clamp(1rem, 5%, 3rem);
}</code></pre>
      
      <h2>Animation and Transitions</h2>
      <p>Modern CSS provides powerful tools for creating smooth animations and transitions:</p>
      
      <h3>Transitions</h3>
      <pre><code>.button {
  background-color: blue;
  transition: background-color 0.3s ease-in-out;
}

.button:hover {
  background-color: darkblue;
}</code></pre>
      
      <h3>Keyframe Animations</h3>
      <pre><code>@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: fadeIn 1s ease-in-out;
}</code></pre>
      
      <h2>Practical Tips for Responsive Design</h2>
      
      <h3>Mobile-First Approach</h3>
      <p>Start designing for mobile devices first, then progressively enhance for larger screens. This ensures your core experience works well on all devices.</p>
      
      <h3>Use Relative Units</h3>
      <p>Prefer em, rem, %, vw, and vh over absolute pixels for better responsiveness.</p>
      
      <h3>Test Across Devices</h3>
      <p>Always test your designs across multiple devices and browsers to ensure consistency.</p>
      
      <h3>Accessibility Considerations</h3>
      <p>Ensure your designs are accessible to all users, including those using screen readers or keyboard navigation.</p>
      
      <h2>Conclusion</h2>
      <p>Modern CSS provides a powerful toolkit for building responsive, flexible user interfaces. By leveraging Flexbox, Grid, Custom Properties, and other modern features, you can create designs that adapt beautifully to any device or screen size.</p>
      
      <p>The best way to master these techniques is through practice. Start by rebuilding some of your existing UIs using these modern approaches, and you'll quickly see how they can simplify your code while creating more robust layouts.</p>
    `,
    featured: false,
    views: 850,
    likes: 47,
    comments: 8,
  },
];

const BlogDetail = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  // Comment form state
  const [commentText, setCommentText] = useState("");

  // For demo purposes, let's simulate an API call to get the blog post
  useEffect(() => {
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const foundPost = blogPosts.find((p) => p.id === blogId);

      if (foundPost) {
        setPost(foundPost);
        setLikeCount(foundPost.likes || 0);

        // Find related posts (same category or common tags)
        const related = blogPosts
          .filter((p) => p.id !== blogId)
          .filter(
            (p) =>
              p.category === foundPost.category ||
              p.tags.some((tag) => foundPost.tags.includes(tag))
          )
          .slice(0, 3);

        setRelatedPosts(related);
      } else {
        setError("Blog post not found");
      }

      setLoading(false);
    }, 500);
  }, [blogId]);

  // Handle share functionality
  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = post?.title || "Check out this article";

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "copy":
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error("Failed to copy URL:", err);
        }
        break;
      default:
        break;
    }
  };

  // Handle like functionality
  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      // In a real app, you would send this to your API
      alert(`Comment submitted: ${commentText}`);
      setCommentText("");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-96 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Article Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/blogs"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse All Articles
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
      <main className="pt-20 bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative bg-white dark:bg-gray-800 py-12 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col max-w-3xl mx-auto">
              <Link
                to="/blogs"
                className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-4"
              >
                <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
                Back to all articles
              </Link>

              <div className="mb-4">
                <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium px-2.5 py-0.5 rounded">
                  {post.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {post.title}
              </h1>

              <div className="flex items-center mb-8">
                <img
                  src={post.authorAvatar || "/placeholder.svg"}
                  alt={post.author}
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div className="mr-6">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {post.author}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center ml-auto space-x-2">
                  <button
                    onClick={handleLike}
                    className={`flex items-center text-sm ${
                      liked
                        ? "text-red-500"
                        : "text-gray-500 dark:text-gray-400"
                    } hover:text-red-500 transition-colors`}
                  >
                    <Heart
                      className={`h-4 w-4 mr-1 ${liked ? "fill-red-500" : ""}`}
                    />
                    <span>{likeCount}</span>
                  </button>
                  <span className="text-gray-300 dark:text-gray-700">|</span>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span>{post.comments || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <div className="container mx-auto px-4 md:px-6 -mt-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src={post.featuredImage || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
              {/* Main Content */}
              <div className="lg:w-2/3">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
                  {/* Article Content */}
                  <article className="prose prose-lg dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </article>

                  {/* Tags */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-flex items-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2.5 py-0.5 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Share */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Share this article
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleShare("facebook")}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        aria-label="Share on Facebook"
                      >
                        <Facebook className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleShare("twitter")}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                        aria-label="Share on Twitter"
                      >
                        <Twitter className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleShare("linkedin")}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                        aria-label="Share on LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleShare("copy")}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Copy link"
                      >
                        {copied ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Author Bio */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <img
                        src={post.authorAvatar || "/placeholder.svg"}
                        alt={post.author}
                        className="h-20 w-20 rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          About {post.author}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {post.authorBio}
                        </p>
                        <div className="flex gap-2">
                          <a
                            href="#"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                          >
                            View profile
                          </a>
                          <span className="text-gray-300 dark:text-gray-700">
                            |
                          </span>
                          <a
                            href="#"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                          >
                            More articles
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                      Comments ({post.comments || 0})
                    </h3>

                    {/* Comment Form */}
                    <form onSubmit={handleCommentSubmit} className="mb-8">
                      <div className="mb-4">
                        <label
                          htmlFor="comment"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Leave a comment
                        </label>
                        <textarea
                          id="comment"
                          rows={4}
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Share your thoughts..."
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Post Comment
                      </button>
                    </form>

                    {/* Sample Comments */}
                    <div className="space-y-6">
                      {/* Comment 1 */}
                      <div className="flex gap-4">
                        <img
                          src="/placeholder.svg?height=40&width=40"
                          alt="User Avatar"
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <div className="flex items-center mb-1">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mr-2">
                              John Smith
                            </h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              2 days ago
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                            Great article! I found the information about{" "}
                            {post.tags[0]} particularly helpful. Looking forward
                            to implementing these techniques in my next project.
                          </p>
                          <button className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                            Reply
                          </button>
                        </div>
                      </div>

                      {/* Comment 2 */}
                      <div className="flex gap-4">
                        <img
                          src="/placeholder.svg?height=40&width=40"
                          alt="User Avatar"
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <div className="flex items-center mb-1">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mr-2">
                              Sarah Johnson
                            </h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              1 week ago
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                            Thanks for sharing your insights. I've been
                            struggling with understanding {post.category}{" "}
                            concepts, but your explanation made it much clearer.
                          </p>
                          <button className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3">
                {/* Related Articles */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <div key={relatedPost.id} className="flex gap-3">
                        <img
                          src={relatedPost.featuredImage || "/placeholder.svg"}
                          alt={relatedPost.title}
                          className="w-20 h-16 object-cover rounded flex-shrink-0"
                        />
                        <div>
                          <Link
                            to={`/blogs/${relatedPost.id}`}
                            className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2"
                          >
                            {relatedPost.title}
                          </Link>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{relatedPost.readTime}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Tags */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(blogPosts.flatMap((p) => p.tags)))
                      .slice(0, 12)
                      .map((tag) => (
                        <Link
                          key={tag}
                          to={`/blogs?tag=${tag}`}
                          className="inline-flex items-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2.5 py-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-blue-600 dark:bg-blue-800 rounded-xl shadow-md p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">
                    Subscribe to Our Newsletter
                  </h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Get notified about new articles and updates.
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-3 py-2 bg-white/10 border border-blue-400 rounded-lg placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                  <p className="text-xs text-blue-100 mt-3">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogDetail;
