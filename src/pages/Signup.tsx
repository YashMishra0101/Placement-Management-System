import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useToast } from "@/components/ui/use-toast";

type Role = "student" | "recruiter" | "admin";

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleStudentSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await AuthService.signUpStudent({
        email: data.email,
        password: data.password,
        role: "student",
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        dob: data.dob,
        tenthPercentage: parseFloat(data.tenthPercentage),
        twelfthPercentage: parseFloat(data.twelfthPercentage),
        cgpa: parseFloat(data.cgpa),
        branch: data.branch,
        semester: parseInt(data.semester),
        backlogs: data.backlogs === "No Backlog" ? 0 : parseInt(data.backlogs),
      });

      toast({
        title: "Registration Successful",
        description: "Your account is pending approval by the admin.",
      });
      navigate("/checkapprovalstatus");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecruiterSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const result = await AuthService.signUpRecruiter({
        email: data.email,
        password: data.password,
        role: "recruiter",
        companyName: data.companyName,
        companyInfo: data.companyInfo,
        logoFile: data.logo,
      });

      if (!result) {
        throw new Error("No response from server");
      }

      toast({
        title: "Registration Successful",
        description: "Your account is pending approval by the admin.",
      });
      navigate("/checkapprovalstatus");
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = error.message;

      // Handle specific Supabase errors
      if (error.message.includes("User already registered")) {
        errorMessage = "This email is already registered";
      } else if (error.message.includes("Password should be at least")) {
        errorMessage = "Password must be at least 6 characters";
      }

      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    switch (selectedRole) {
      case "student":
        return (
          <SignupStudent
            onSubmit={handleStudentSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case "recruiter":
        return (
          <SignupRecruiter
            onSubmit={handleRecruiterSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case "admin":
        return (
          <div className="text-center py-4 sm:py-8">
            <AnimatedBackground />
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-6">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="rounded-full bg-amber-100 p-2 sm:p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500"
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
              <p className="text-base sm:text-lg font-medium text-amber-800 mb-1 sm:mb-2">
                Admin Access Restricted
              </p>
              <p className="text-sm sm:text-base text-amber-700">
                Admin accounts can only be created by existing administrators.
                Please contact the IT department for access.
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center py-4 sm:py-8">
            <AnimatedBackground />
            <div className="text-center space-y-2 sm:space-y-4">
              <div className="inline-block p-3 sm:p-4 bg-indigo-50 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-500"
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
              <p className="text-base sm:text-lg font-medium text-gray-700">
                Select your role to continue
              </p>
              <p className="text-xs sm:text-sm text-gray-500 max-w-xs mx-auto">
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
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl mx-4 sm:mx-0"
        >
          <div className="text-center mb-6 sm:mb-8 mt-9">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
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

            <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
              Join GCA Placements to connect with top recruiters and
              opportunities
            </p>
          </div>

          <Card className="border-0 shadow-lg sm:shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-sm bg-white/90 w-full min-h-[30rem] sm:min-h-[35rem]">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl font-semibold">
                Choose your role
              </CardTitle>
              <CardDescription className="text-indigo-100 text-xs sm:text-sm">
                Select the appropriate role to access the registration form
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-6 sm:pt-8">
              <div className="space-y-6 sm:space-y-8">
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
            <CardFooter className="flex flex-col space-y-3 sm:space-y-4 p-4 sm:p-6 -mt-3 bg-gray-50 border-t border-gray-100">
              <div className="text-center text-xs sm:text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                >
                  Login instead
                </Link>
              </div>
              <Link
                to="/"
                className="flex items-center justify-center text-xs sm:text-sm text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <ArrowLeft className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
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