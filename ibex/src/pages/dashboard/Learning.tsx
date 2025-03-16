"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  CheckCircle,
  Clock,
  BookOpen,
  MessageSquare,
  Download,
  Share2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Video,
  Code,
  Award,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  BookmarkCheck,
  X,
} from "lucide-react";

// Sample course data
const courseData = {
  id: "1",
  title: "Complete Web Development Bootcamp",
  instructor: "Dr. Alex Morgan",
  progress: 75,
  totalModules: 12,
  completedModules: 9,
  totalLessons: 120,
  completedLessons: 90,
  currentModule: {
    id: "module-9",
    title: "Advanced JavaScript Concepts",
    progress: 60,
    lessons: [
      {
        id: "lesson-1",
        title: "Closures and Scope",
        duration: "15:30",
        type: "video",
        completed: true,
      },
      {
        id: "lesson-2",
        title: "Prototypal Inheritance",
        duration: "18:45",
        type: "video",
        completed: true,
      },
      {
        id: "lesson-3",
        title: "Async/Await and Promises",
        duration: "22:10",
        type: "video",
        completed: false,
        current: true,
      },
      {
        id: "lesson-4",
        title: "JavaScript Modules",
        duration: "14:20",
        type: "video",
        completed: false,
      },
      {
        id: "lesson-5",
        title: "Coding Challenge: Build a Promise-based API",
        duration: "45:00",
        type: "exercise",
        completed: false,
      },
    ],
  },
  modules: [
    {
      id: "module-1",
      title: "Introduction to Web Development",
      progress: 100,
      totalLessons: 8,
      completedLessons: 8,
    },
    {
      id: "module-2",
      title: "HTML Fundamentals",
      progress: 100,
      totalLessons: 10,
      completedLessons: 10,
    },
    {
      id: "module-3",
      title: "CSS Basics and Styling",
      progress: 100,
      totalLessons: 12,
      completedLessons: 12,
    },
    {
      id: "module-4",
      title: "CSS Layout and Responsive Design",
      progress: 100,
      totalLessons: 10,
      completedLessons: 10,
    },
    {
      id: "module-5",
      title: "JavaScript Basics",
      progress: 100,
      totalLessons: 15,
      completedLessons: 15,
    },
    {
      id: "module-6",
      title: "DOM Manipulation",
      progress: 100,
      totalLessons: 12,
      completedLessons: 12,
    },
    {
      id: "module-7",
      title: "Working with APIs",
      progress: 100,
      totalLessons: 8,
      completedLessons: 8,
    },
    {
      id: "module-8",
      title: "Introduction to React",
      progress: 100,
      totalLessons: 15,
      completedLessons: 15,
    },
    {
      id: "module-9",
      title: "Advanced JavaScript Concepts",
      progress: 60,
      totalLessons: 5,
      completedLessons: 3,
      current: true,
    },
    {
      id: "module-10",
      title: "Building Full-Stack Applications",
      progress: 0,
      totalLessons: 10,
      completedLessons: 0,
    },
    {
      id: "module-11",
      title: "Deployment and DevOps",
      progress: 0,
      totalLessons: 8,
      completedLessons: 0,
    },
    {
      id: "module-12",
      title: "Final Project",
      progress: 0,
      totalLessons: 5,
      completedLessons: 0,
    },
  ],
};

// Sample discussion data
const discussionData = [
  {
    id: "comment-1",
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Can someone explain the difference between async/await and regular promises in more detail?",
    timestamp: "2 days ago",
    likes: 12,
    replies: [
      {
        id: "reply-1",
        user: {
          name: "Dr. Alex Morgan",
          avatar: "/placeholder.svg?height=40&width=40",
          isInstructor: true,
        },
        content:
          "Great question! Async/await is syntactic sugar over promises. It makes asynchronous code look and behave more like synchronous code, which is easier to understand and debug. The 'await' keyword can only be used inside an 'async' function, and it pauses the execution of the function until the promise is resolved.",
        timestamp: "1 day ago",
        likes: 8,
      },
    ],
  },
  {
    id: "comment-2",
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "I'm getting an error when trying to chain multiple async functions. Any tips on debugging this?",
    timestamp: "3 days ago",
    likes: 5,
    replies: [],
  },
];

// Sample notes data
const notesData = [
  {
    id: "note-1",
    timestamp: "10:23",
    content:
      "Important: Remember that async functions always return a promise, even if you don't explicitly return one.",
    createdAt: "2 days ago",
  },
  {
    id: "note-2",
    timestamp: "15:47",
    content: "The await keyword can only be used inside async functions.",
    createdAt: "2 days ago",
  },
];

const Learning = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1322); // 22:02 in seconds
  const [volume, setVolume] = useState(80);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "discussion" | "notes" | "resources"
  >("overview");
  const [expandedModules, setExpandedModules] = useState<string[]>([
    courseData.currentModule.id,
  ]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showModules, setShowModules] = useState(false);

  // Format time from seconds to MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Toggle module expansion
  const toggleModule = (moduleId: string) => {
    if (expandedModules.includes(moduleId)) {
      setExpandedModules(expandedModules.filter((id) => id !== moduleId));
    } else {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  // Mark lesson as complete
  const markAsComplete = () => {
    // In a real app, this would update the backend
    alert("Lesson marked as complete!");
  };

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle seeking in the video
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseInt(e.target.value));
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
    if (parseInt(e.target.value) === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  // Toggle bookmark
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Toggle modules sidebar on mobile
  const toggleModulesSidebar = () => {
    setShowModules(!showModules);
  };

  // Calculate overall progress
  const overallProgress = Math.round(
    (courseData.completedLessons / courseData.totalLessons) * 100
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {courseData.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Instructor: {courseData.instructor}
          </p>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleModulesSidebar}
            className="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            <BookOpen className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content area */}
        <div className="lg:w-3/4 space-y-6">
          {/* Video Player */}
          <div className="bg-black rounded-xl overflow-hidden shadow-lg">
            <div className="relative">
              {/* Video placeholder */}
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=720&width=1280&text=Video+Player"
                  alt="Video Player"
                  className="w-full h-full object-cover"
                />
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={togglePlay}
                      className="h-20 w-20 rounded-full bg-blue-600/80 flex items-center justify-center hover:bg-blue-700/80 transition-colors"
                    >
                      <Play className="h-10 w-10 text-white" />
                    </button>
                  </div>
                )}
              </div>

              {/* Video controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="space-y-2">
                  {/* Progress bar */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white">
                      {formatTime(currentTime)}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={handleSeek}
                      className="flex-1 h-1.5 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                    />
                    <span className="text-xs text-white">
                      {formatTime(duration)}
                    </span>
                  </div>

                  {/* Control buttons */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <button className="text-white hover:text-blue-400 transition-colors">
                        <SkipBack className="h-5 w-5" />
                      </button>
                      <button
                        onClick={togglePlay}
                        className="h-8 w-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4 text-gray-900" />
                        ) : (
                          <Play className="h-4 w-4 text-gray-900" />
                        )}
                      </button>
                      <button className="text-white hover:text-blue-400 transition-colors">
                        <SkipForward className="h-5 w-5" />
                      </button>
                      <div className="flex items-center gap-1 ml-2">
                        <button
                          onClick={toggleMute}
                          className="text-white hover:text-blue-400 transition-colors"
                        >
                          {isMuted ? (
                            <VolumeX className="h-5 w-5" />
                          ) : (
                            <Volume2 className="h-5 w-5" />
                          )}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-16 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={toggleBookmark}
                        className={`text-white hover:text-blue-400 transition-colors ${
                          isBookmarked ? "text-blue-400" : ""
                        }`}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="h-5 w-5" />
                        ) : (
                          <Bookmark className="h-5 w-5" />
                        )}
                      </button>
                      <button
                        onClick={toggleFullscreen}
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        <Maximize className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson info and actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {courseData.currentModule.title}:{" "}
                    {
                      courseData.currentModule.lessons.find((l) => l.current)
                        ?.title
                    }
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {
                        courseData.currentModule.lessons.find((l) => l.current)
                          ?.duration
                      }
                    </span>
                    <span>
                      Lesson {courseData.completedLessons + 1} of{" "}
                      {courseData.totalLessons}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Resources</span>
                  </button>
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                  <button
                    onClick={markAsComplete}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">Mark Complete</span>
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
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
                    onClick={() => setActiveTab("discussion")}
                    className={`py-4 px-1 text-sm font-medium border-b-2 ${
                      activeTab === "discussion"
                        ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    Discussion
                  </button>
                  <button
                    onClick={() => setActiveTab("notes")}
                    className={`py-4 px-1 text-sm font-medium border-b-2 ${
                      activeTab === "notes"
                        ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    Notes
                  </button>
                  <button
                    onClick={() => setActiveTab("resources")}
                    className={`py-4 px-1 text-sm font-medium border-b-2 ${
                      activeTab === "resources"
                        ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    Resources
                  </button>
                </nav>
              </div>

              {/* Tab content */}
              <div>
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="prose dark:prose-invert max-w-none">
                    <h3>About this lesson</h3>
                    <p>
                      In this lesson, we'll dive deep into JavaScript's
                      asynchronous programming model using Async/Await and
                      Promises. You'll learn how to write clean, maintainable
                      asynchronous code that's easier to reason about.
                    </p>
                    <p>We'll cover:</p>
                    <ul>
                      <li>Understanding JavaScript's event loop</li>
                      <li>Creating and consuming Promises</li>
                      <li>Error handling with try/catch</li>
                      <li>Converting callback-based APIs to Promises</li>
                      <li>Using async/await for cleaner asynchronous code</li>
                      <li>Parallel execution with Promise.all</li>
                      <li>Real-world examples and best practices</li>
                    </ul>
                    <p>
                      By the end of this lesson, you'll be able to confidently
                      work with asynchronous JavaScript and handle complex
                      operations like API calls, file operations, and more.
                    </p>
                  </div>
                )}

                {/* Discussion Tab */}
                {activeTab === "discussion" && (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Discussion
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        Ask questions and discuss this lesson with your
                        instructor and peers.
                      </p>

                      {/* Comment form */}
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                        <textarea
                          placeholder="Add to the discussion..."
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows={3}
                        ></textarea>
                        <div className="flex justify-end mt-3">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Post Comment
                          </button>
                        </div>
                      </div>

                      {/* Comments */}
                      <div className="space-y-6">
                        {discussionData.map((comment) => (
                          <div
                            key={comment.id}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                          >
                            <div className="flex items-start gap-3">
                              <img
                                src={comment.user.avatar || "/placeholder.svg"}
                                alt={comment.user.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {comment.user.name}
                                  </h4>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {comment.timestamp}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                  {comment.content}
                                </p>
                                <div className="flex items-center gap-4 mt-2">
                                  <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
                                    <ThumbsUp className="h-3 w-3" />
                                    <span>Like ({comment.likes})</span>
                                  </button>
                                  <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Replies */}
                            {comment.replies.length > 0 && (
                              <div className="ml-12 mt-4 space-y-4">
                                {comment.replies.map((reply) => (
                                  <div
                                    key={reply.id}
                                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3"
                                  >
                                    <div className="flex items-start gap-3">
                                      <img
                                        src={
                                          reply.user.avatar ||
                                          "/placeholder.svg"
                                        }
                                        alt={reply.user.name}
                                        className="h-8 w-8 rounded-full object-cover"
                                      />
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                                            {reply.user.name}
                                            {reply.user.isInstructor && (
                                              <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded">
                                                Instructor
                                              </span>
                                            )}
                                          </h4>
                                          <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {reply.timestamp}
                                          </span>
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                          {reply.content}
                                        </p>
                                        <div className="flex items-center gap-4 mt-2">
                                          <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
                                            <ThumbsUp className="h-3 w-3" />
                                            <span>Like ({reply.likes})</span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes Tab */}
                {activeTab === "notes" && (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Your Notes
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        Take notes while watching the video. They'll be saved
                        automatically.
                      </p>

                      {/* Note form */}
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="text"
                            placeholder="Timestamp (e.g., 12:34)"
                            className="w-24 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                          <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                            Current time
                          </button>
                        </div>
                        <textarea
                          placeholder="Add a note..."
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows={3}
                        ></textarea>
                        <div className="flex justify-end mt-3">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Save Note
                          </button>
                        </div>
                      </div>

                      {/* Notes list */}
                      <div className="space-y-4">
                        {notesData.map((note) => (
                          <div
                            key={note.id}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">
                                  {note.timestamp}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {note.createdAt}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                  <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </button>
                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                  <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {note.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Resources Tab */}
                {activeTab === "resources" && (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Lesson Resources
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        Download supplementary materials for this lesson.
                      </p>

                      <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                Async-Await Cheatsheet.pdf
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PDF • 2.4 MB
                              </p>
                            </div>
                          </div>
                          <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                            <Download className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                              <Code className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                Code Examples.zip
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                ZIP • 1.8 MB
                              </p>
                            </div>
                          </div>
                          <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                            <Download className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                Exercise Instructions.pdf
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PDF • 1.2 MB
                              </p>
                            </div>
                          </div>
                          <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                            <Download className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Course modules sidebar */}
        <div
          className={`lg:w-1/4 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden ${
            showModules
              ? "fixed inset-0 z-50 p-4 md:relative md:inset-auto md:p-0"
              : "hidden lg:block"
          }`}
        >
          {showModules && (
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 lg:hidden">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Course Content
              </h3>
              <button
                onClick={toggleModulesSidebar}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Course Progress
              </h3>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {overallProgress}%
              </span>
            </div>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {courseData.completedLessons} of {courseData.totalLessons} lessons
              completed
            </p>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-20rem)]">
            {courseData.modules.map((module) => (
              <div
                key={module.id}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <button
                  onClick={() => toggleModule(module.id)}
                  className={`flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                    module.current ? "bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {module.title}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        {module.completedLessons}/{module.totalLessons}
                      </span>
                    </div>
                    <div className="mt-1 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-2">
                    {expandedModules.includes(module.id) ? (
                      <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Module lessons */}
                {expandedModules.includes(module.id) && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-2">
                    {module.id === courseData.currentModule.id ? (
                      // Current module lessons
                      courseData.currentModule.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          className={`flex items-center w-full p-2 text-left text-sm rounded-md ${
                            lesson.current
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                              : "hover:bg-gray-100 dark:hover:bg-gray-600"
                          }`}
                        >
                          <div className="mr-3 flex-shrink-0">
                            {lesson.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : lesson.type === "video" ? (
                              <Video className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Code className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 flex items-center justify-between">
                            <span
                              className={`${
                                lesson.completed
                                  ? "text-gray-500 dark:text-gray-400"
                                  : "text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {lesson.title}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                              {lesson.duration}
                            </span>
                          </div>
                        </button>
                      ))
                    ) : (
                      // Other modules (simplified view)
                      <div className="py-2 text-sm text-gray-500 dark:text-gray-400">
                        {module.completedLessons} of {module.totalLessons}{" "}
                        lessons completed
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;
