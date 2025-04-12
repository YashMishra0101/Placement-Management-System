import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import RoleSelector from "@/components/auth/RoleSelector";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import { SignupStudent } from "../components/auth/SignupStudent";
import { SignupRecruiter } from "../components/auth/SignupRecruiter";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/animations/AnimatedBackground";
import { TypeAnimation } from "react-type-animation";

type Role = "student" | "recruiter" | "admin";

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleStudentSubmit = (data: any) => {
    console.log("Student signup data:", data);
    // Handle student signup logic here
  };

  const handleRecruiterSubmit = (data: any) => {
    console.log("Recruiter signup data:", data);
    // Handle recruiter signup logic here
  };

  const renderForm = () => {
    switch (selectedRole) {
      case "student":
        return <SignupStudent onSubmit={handleStudentSubmit} />;
      case "recruiter":
        return <SignupRecruiter onSubmit={handleRecruiterSubmit} />;
      case "admin":
        return (
          <div className="text-center py-8">
            <AnimatedBackground />
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-amber-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-lg font-medium text-amber-800 mb-2">
                Admin Access Restricted
              </p>
              <p className="text-amber-700">
                Admin accounts can only be created by existing administrators.
                Please contact the IT department for access.
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center">
            <AnimatedBackground />
            <div className="text-center space-y-4">
              <div className="inline-block p-4 bg-indigo-50 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-700">
                Select your role to continue
              </p>
              <p className="text-gray-500 max-w-xs mx-auto">
                Choose the appropriate role to view the registration form
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-violet-50">
      <AnimatedBackground />
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl w-full"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              <TypeAnimation
                sequence={[
                  "Create Your Account",
                  2000,
                  "Start Your Journey With Us",
                  1000,
                  "Get Hired by Top Recruiters",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                style={{ display: "inline-block" }}
                repeat={Infinity}
              />
            </h2>

            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Join GCA Placements to connect with top recruiters and
              opportunities
            </p>
          </div>

          <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-sm bg-white/90 -mt-4 w-[60rem] -ml-24 min-h-[35rem]">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-6">
              <CardTitle className="text-xl font-semibold">
                Choose your role
              </CardTitle>
              <CardDescription className="text-indigo-100">
                Select the appropriate role to access the registration form
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-8">
              <div className="space-y-8">
                <RoleSelector
                  onRoleSelect={setSelectedRole}
                  selectedRole={selectedRole}
                />

                <motion.div
                  key={selectedRole || "empty"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderForm()}
                </motion.div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 p-6 -mt-3 bg-gray-50 border-t border-gray-100">
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                >
                  Sign in instead
                </Link>
              </div>
              <Link
                to="/"
                className="flex items-center justify-center text-sm text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                Back to home
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
