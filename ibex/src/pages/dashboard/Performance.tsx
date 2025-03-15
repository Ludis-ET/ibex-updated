"use client";

import type React from "react";

import { useState } from "react";
import {
  BarChart3,
  PieChart,
  Calendar,
  Award,
  Clock,
  BookOpen,
  CheckCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

// Sample performance data
const performanceData = {
  quizScores: [
    { course: "Web Development", score: 85, total: 100, date: "2023-03-15" },
    { course: "Data Science", score: 72, total: 100, date: "2023-03-20" },
    { course: "UI/UX Design", score: 94, total: 100, date: "2023-03-25" },
    { course: "Python Programming", score: 88, total: 100, date: "2023-04-02" },
    { course: "Cybersecurity", score: 76, total: 100, date: "2023-04-10" },
  ],
  assignmentCompletions: [
    { course: "Web Development", completed: 12, total: 15, grade: "A-" },
    { course: "Data Science", completed: 8, total: 12, grade: "B+" },
    { course: "UI/UX Design", completed: 6, total: 6, grade: "A" },
    { course: "Python Programming", completed: 10, total: 12, grade: "A-" },
    { course: "Cybersecurity", completed: 7, total: 10, grade: "B" },
  ],
  timeSpent: [
    { course: "Web Development", hours: 24.5 },
    { course: "Data Science", hours: 18.2 },
    { course: "UI/UX Design", hours: 12.8 },
    { course: "Python Programming", hours: 15.5 },
    { course: "Cybersecurity", hours: 9.5 },
  ],
  weeklyActivity: [
    { day: "Monday", hours: 2.5 },
    { day: "Tuesday", hours: 1.8 },
    { day: "Wednesday", hours: 3.2 },
    { day: "Thursday", hours: 2.0 },
    { day: "Friday", hours: 1.5 },
    { day: "Saturday", hours: 4.5 },
    { day: "Sunday", hours: 3.0 },
  ],
  achievements: [
    {
      title: "Fast Learner",
      description: "Completed 5 lessons in one day",
      date: "2023-03-18",
      icon: "rocket",
    },
    {
      title: "Perfect Score",
      description: "Scored 100% on a quiz",
      date: "2023-03-22",
      icon: "award",
    },
    {
      title: "Consistent Learner",
      description: "Studied for 7 days in a row",
      date: "2023-04-01",
      icon: "calendar",
    },
    {
      title: "Helping Hand",
      description: "Answered 10 questions in the forum",
      date: "2023-04-08",
      icon: "users",
    },
  ],
};

const Performance = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "quizzes" | "assignments" | "time" | "achievements"
  >("overview");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Performance Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track your learning progress and achievements
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
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
            onClick={() => setActiveTab("quizzes")}
            className={`py-4 px-1 text-sm font-medium border-b-2 ${
              activeTab === "quizzes"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Quiz Scores
          </button>
          <button
            onClick={() => setActiveTab("assignments")}
            className={`py-4 px-1 text-sm font-medium border-b-2 ${
              activeTab === "assignments"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Assignments
          </button>
          <button
            onClick={() => setActiveTab("time")}
            className={`py-4 px-1 text-sm font-medium border-b-2 ${
              activeTab === "time"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Time Spent
          </button>
          <button
            onClick={() => setActiveTab("achievements")}
            className={`py-4 px-1 text-sm font-medium border-b-2 ${
              activeTab === "achievements"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Achievements
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <PerformanceCard
                title="Average Quiz Score"
                value={`${Math.round(
                  performanceData.quizScores.reduce(
                    (acc, curr) => acc + curr.score,
                    0
                  ) / performanceData.quizScores.length
                )}%`}
                icon={BarChart3}
                trend="up"
                trendValue="+5%"
              />
              <PerformanceCard
                title="Assignment Completion"
                value={`${Math.round(
                  (performanceData.assignmentCompletions.reduce(
                    (acc, curr) => acc + curr.completed,
                    0
                  ) /
                    performanceData.assignmentCompletions.reduce(
                      (acc, curr) => acc + curr.total,
                      0
                    )) *
                    100
                )}%`}
                icon={CheckCircle}
                trend="up"
                trendValue="+8%"
              />
              <PerformanceCard
                title="Total Learning Hours"
                value={`${performanceData.timeSpent
                  .reduce((acc, curr) => acc + curr.hours, 0)
                  .toFixed(1)}`}
                icon={Clock}
                trend="up"
                trendValue="+2.5h"
              />
              <PerformanceCard
                title="Achievements Earned"
                value={performanceData.achievements.length.toString()}
                icon={Award}
                trend="up"
                trendValue="+1"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Activity Chart */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Weekly Learning Activity
                </h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {performanceData.weeklyActivity.map((day) => (
                    <div
                      key={day.day}
                      className="flex flex-col items-center flex-1"
                    >
                      <div
                        className="w-full bg-blue-600 dark:bg-blue-500 rounded-t-md transition-all duration-500"
                        style={{ height: `${(day.hours / 5) * 100}%` }}
                      ></div>
                      <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                        {day.day.substring(0, 3)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Distribution Chart */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Course Time Distribution
                </h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="relative h-48 w-48">
                    {/* This would be a pie chart in a real implementation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PieChart className="h-full w-full text-gray-300 dark:text-gray-600" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {performanceData.timeSpent
                            .reduce((acc, curr) => acc + curr.hours, 0)
                            .toFixed(1)}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Total Hours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {performanceData.timeSpent.map((course, index) => (
                    <div
                      key={course.course}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div
                          className={`h-3 w-3 rounded-full mr-2 ${
                            index === 0
                              ? "bg-blue-500"
                              : index === 1
                              ? "bg-purple-500"
                              : index === 2
                              ? "bg-green-500"
                              : index === 3
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {course.course}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {course.hours}h
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {performanceData.achievements.slice(0, 4).map((achievement) => (
                  <div
                    key={achievement.title}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex flex-col items-center text-center"
                  >
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                      <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {achievement.description}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {achievement.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quiz Scores Tab */}
        {activeTab === "quizzes" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Quiz Performance
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Average Score:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {Math.round(
                    performanceData.quizScores.reduce(
                      (acc, curr) => acc + curr.score,
                      0
                    ) / performanceData.quizScores.length
                  )}
                  %
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {performanceData.quizScores.map((quiz, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-3">
                    <div>
                      <h4 className="text-base font-medium text-gray-900 dark:text-white">
                        {quiz.course} Quiz
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Taken on {quiz.date}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`text-sm font-medium ${
                          quiz.score >= 90
                            ? "text-green-600 dark:text-green-400"
                            : quiz.score >= 70
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-yellow-600 dark:text-yellow-400"
                        }`}
                      >
                        {quiz.score}%
                      </span>
                      <span className="mx-2 text-gray-400 dark:text-gray-500">
                        |
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {quiz.score} / {quiz.total} points
                      </span>
                    </div>
                  </div>

                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        quiz.score >= 90
                          ? "bg-green-600 dark:bg-green-500"
                          : quiz.score >= 70
                          ? "bg-blue-600 dark:bg-blue-500"
                          : "bg-yellow-600 dark:bg-yellow-500"
                      }`}
                      style={{ width: `${quiz.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === "assignments" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Assignment Completion
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Overall Completion:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {Math.round(
                    (performanceData.assignmentCompletions.reduce(
                      (acc, curr) => acc + curr.completed,
                      0
                    ) /
                      performanceData.assignmentCompletions.reduce(
                        (acc, curr) => acc + curr.total,
                        0
                      )) *
                      100
                  )}
                  %
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Course
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Completed
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Completion
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {performanceData.assignmentCompletions.map((assignment) => (
                    <tr key={assignment.course}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {assignment.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {assignment.completed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {assignment.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                            <div
                              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                              style={{
                                width: `${
                                  (assignment.completed / assignment.total) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {Math.round(
                              (assignment.completed / assignment.total) * 100
                            )}
                            %
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            assignment.grade.startsWith("A")
                              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                              : assignment.grade.startsWith("B")
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400"
                              : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
                          }`}
                        >
                          {assignment.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Time Spent Tab */}
        {activeTab === "time" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Learning Time Analysis
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Total Hours:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {performanceData.timeSpent
                    .reduce((acc, curr) => acc + curr.hours, 0)
                    .toFixed(1)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Time by Course */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
                  Time by Course
                </h4>
                <div className="space-y-4">
                  {performanceData.timeSpent.map((course, index) => (
                    <div key={course.course}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {course.course}
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {course.hours}h
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            index === 0
                              ? "bg-blue-600 dark:bg-blue-500"
                              : index === 1
                              ? "bg-purple-600 dark:bg-purple-500"
                              : index === 2
                              ? "bg-green-600 dark:bg-green-500"
                              : index === 3
                              ? "bg-yellow-600 dark:bg-yellow-500"
                              : "bg-red-600 dark:bg-red-500"
                          }`}
                          style={{
                            width: `${
                              (course.hours /
                                performanceData.timeSpent.reduce(
                                  (acc, curr) => Math.max(acc, curr.hours),
                                  0
                                )) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Activity */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
                  Weekly Activity
                </h4>
                <div className="h-64 flex items-end justify-between gap-2">
                  {performanceData.weeklyActivity.map((day) => (
                    <div
                      key={day.day}
                      className="flex flex-col items-center flex-1"
                    >
                      <div
                        className="w-full bg-blue-600 dark:bg-blue-500 rounded-t-md transition-all duration-500"
                        style={{ height: `${(day.hours / 5) * 100}%` }}
                      ></div>
                      <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                        {day.day.substring(0, 3)}
                      </div>
                      <div className="mt-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                        {day.hours}h
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
                Learning Habits
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Average Daily Time
                  </h5>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {(
                      performanceData.weeklyActivity.reduce(
                        (acc, curr) => acc + curr.hours,
                        0
                      ) / 7
                    ).toFixed(1)}
                    h
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
                    <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Most Active Day
                  </h5>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {
                      performanceData.weeklyActivity.reduce((max, day) =>
                        day.hours > max.hours ? day : max
                      ).day
                    }
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                  <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Most Studied Course
                  </h5>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {
                      performanceData.timeSpent
                        .reduce((max, course) =>
                          course.hours > max.hours ? course : max
                        )
                        .course.split(" ")[0]
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Your Achievements
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Total Earned:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {performanceData.achievements.length}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {performanceData.achievements.map((achievement) => (
                <div
                  key={achievement.title}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 flex flex-col items-center text-center"
                >
                  <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {achievement.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 w-full">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Earned on {achievement.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mt-8">
              <h4 className="text-base font-medium text-blue-800 dark:text-blue-300 mb-4">
                Upcoming Achievements
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Course Completer
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Complete your first course
                    </p>
                    <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                      90% complete
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Knowledge Seeker
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Spend 50 hours learning
                    </p>
                    <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                      85% complete
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      Quiz Master
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Score 90% or higher on 5 quizzes
                    </p>
                    <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                      60% complete
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Performance Card Component
interface PerformanceCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend: "up" | "down" | "neutral";
  trendValue: string;
}

const PerformanceCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
}: PerformanceCardProps) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
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

      <div className="mt-4 flex items-center">
        {trend === "up" ? (
          <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
        ) : trend === "down" ? (
          <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400 mr-1" />
        ) : null}
        <span
          className={`text-xs font-medium ${
            trend === "up"
              ? "text-green-600 dark:text-green-400"
              : trend === "down"
              ? "text-red-600 dark:text-red-400"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {trendValue} from last month
        </span>
      </div>
    </div>
  );
};

export default Performance;
