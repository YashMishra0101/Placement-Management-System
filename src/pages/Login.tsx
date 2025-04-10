
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import LoginForm from "@/components/auth/LoginForm";
import RoleIllustration from "@/components/auth/RoleIllustration";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<"student" | "recruiter" | "admin" | null>(null);
  const navigate = useNavigate();
  const { userRole } = useAuth();

  useEffect(() => {
    // If user is already logged in and has admin role, redirect to admin dashboard
    if (userRole === "admin") {
      navigate("/admin/dashboard");
    } else if (userRole) {
      // If user is already logged in with any other role, redirect to home
      navigate("/");
    }
  }, [userRole, navigate]);

  const handleRoleSelect = (role: "student" | "recruiter" | "admin" | null) => {
    setSelectedRole(role);
  };

  const handleLoginSuccess = () => {
    // Navigate based on role if needed
    if (userRole === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Left side - illustration */}
            <div className="lg:col-span-2 hidden lg:block">
              <div className="relative">
                <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -z-10 bottom-10 right-10 w-60 h-60 bg-secondary/10 rounded-full blur-xl animate-pulse"></div>
                
                <RoleIllustration selectedRole={selectedRole} />
              </div>
            </div>

            {/* Right side - login form */}
            <div className="lg:col-span-3">
              <LoginForm 
                onLoginSuccess={handleLoginSuccess} 
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
