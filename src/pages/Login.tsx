
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Left side - illustration with gradient background */}
            <div className="hidden lg:block h-full bg-gradient-to-br from-primary/90 to-secondary/90 p-10 text-white">
              <div className="h-full flex flex-col justify-center">
                <RoleIllustration selectedRole={selectedRole} />
              </div>
            </div>

            {/* Right side - login form */}
            <div className="p-6 md:p-8">
              <LoginForm 
                onLoginSuccess={handleLoginSuccess} 
                onRoleSelect={handleRoleSelect}
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
