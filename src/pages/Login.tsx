import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import LoginForm from "@/components/auth/LoginForm";
import RoleIllustration from "@/components/auth/RoleIllustration";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/animations/AnimatedBackground";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<"student" | "recruiter" | "admin" | null>(null);
  const navigate = useNavigate();

  const handleRoleSelect = (role: "student" | "recruiter" | "admin" | null) => {
    setSelectedRole(role);
  };

  const handleLoginSuccess = () => {
    navigate("/");
  };

  

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Animated background */}
      <AnimatedBackground />
      
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 mt-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl"
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-100/80">
            {/* Left side - illustration with gradient background */}
            <div className="hidden lg:flex flex-col h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-600 p-8 text-white relative overflow-hidden">
              {/* Background decorative elements with subtle animation */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <motion.div 
                  className="absolute top-10 left-10 w-24 h-24 rounded-full bg-white"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
                <motion.div 
                  className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
                <motion.div 
                  className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-white transform -translate-x-1/2 -translate-y-1/2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
              </div>
              <AnimatedBackground />
              <div className="h-full flex flex-col justify-center relative z-10">
                <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>
                <div className="transform transition-all duration-300 hover:scale-105">
                  <RoleIllustration selectedRole={selectedRole} />
                </div>
                <div className="mt-8 text-indigo-200">
                  <p className="text-center mb-4">Connecting students and recruiters for a brighter future</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-500/20 p-1 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      Streamlined placement process
                    </li>
                    <li className="flex items-center">
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-500/20 p-1 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      Direct communication with recruiters
                    </li>
                    <li className="flex items-center">
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-500/20 p-1 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      Track application status in real-time
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <AnimatedBackground />
            {/* Right side - login form */}
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="mb-8 text-center lg:text-left">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h1>
                <p className="text-gray-600">
                  {selectedRole 
                    ? `Continue as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`
                    : "Select your role to continue"}
                </p>
              </div>
              
              <LoginForm 
                onLoginSuccess={handleLoginSuccess} 
                onRoleSelect={handleRoleSelect}
              />

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => navigate("/signup")} 
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
                  >
                    Create one
                  </button>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
