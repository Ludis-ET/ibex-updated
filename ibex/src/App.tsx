"use client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";

// Pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Payment from "./pages/Payment";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";

import MyCourses from "./pages/dashboard/MyCourses";
import Performance from "./pages/dashboard/Performance";
import Learning from "./pages/dashboard/Learning";
import Profile from "./pages/dashboard/Profile";
import Support from "./pages/dashboard/Support";
import Billing from "./pages/dashboard/Billing";

// Components
import { ThemeProvider } from "./context/ThemeContext";
import ScrollToTop from "./components/utils/ScrollToTop";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="learning" element={<Learning />} />
              <Route path="performance" element={<Performance />} />
              <Route path="profile" element={<Profile />} />
              <Route path="support" element={<Support />} />
              <Route path="billing" element={<Billing />} />
            </Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:blogId" element={<BlogDetail />} />
            <Route path="/payment/:courseId" element={<Payment />} />
            <Route
              path="/payment/confirmation"
              element={<PaymentConfirmation />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
        <Toaster position="top-right" />
      </Router>
    </ThemeProvider>
  );
}

export default App;
