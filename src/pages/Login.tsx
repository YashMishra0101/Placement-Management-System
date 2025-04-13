import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import LoginForm from "@/components/auth/LoginForm";
import RoleIllustration from "@/components/auth/RoleIllustration";
import { motion, AnimatePresence } from "framer-motion";
import { Popover } from "@/components/ui/popover";
import { TypeAnimation } from 'react-type-animation';
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
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-gray-50 to-indigo-50">
      <AnimatedBackground />
      
      {/* Sparkles effect for the header */}
      <div className="w-full absolute top-0 h-[40rem]">
        <Popover
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#6366f1"
        />
      </div>

      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 mt-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-100/80">
            {/* Left side - illustration with gradient background */}
            <div className="hidden lg:flex flex-col h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-600 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <motion.div 
                  className="absolute top-10 left-10 w-24 h-24 rounded-full bg-white"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-white transform -translate-x-1/2 -translate-y-1/2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              
              <div className="h-full flex flex-col justify-center relative z-10">
                <h2 className="text-4xl font-bold mb-6 text-center">
                  <TypeAnimation
                    sequence={[
                      'Welcome Back',
                      2000,
                      'Ready to Continue?',
                      2000,
                      'Your Journey Awaits',
                      2000
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ display: 'inline-block' }}
                    repeat={Infinity}
                  />
                </h2>
                
                <motion.div 
                  className="transform transition-all duration-300 hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                >
                  <RoleIllustration selectedRole={selectedRole} />
                </motion.div>
                
                <div className="mt-8 text-indigo-100">
                  <p className="text-center mb-6 text-xl font-medium">Connecting talent with opportunity</p>
                  <ul className="space-y-3">
                    <motion.li 
                      className="flex items-center"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-500/30 p-2 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      <span className="text-lg">Streamlined placement process</span>
                    </motion.li>
                    <motion.li 
                      className="flex items-center"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-500/30 p-2 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      <span className="text-lg">Direct communication channels</span>
                    </motion.li>
                    <motion.li 
                      className="flex items-center"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-500/30 p-2 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      <span className="text-lg">Real-time application tracking</span>
                    </motion.li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Right side - login form */}
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="mb-8 text-center lg:text-left">
                <motion.h1 
                  className="text-4xl font-bold text-gray-800 mb-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  Sign In
                </motion.h1>
                <motion.p 
                  className="text-gray-600 text-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {selectedRole 
                    ? `Continue as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`
                    : "Select your role to continue"}
                </motion.p>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRole || 'empty'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoginForm 
                    onLoginSuccess={handleLoginSuccess} 
                    onRoleSelect={handleRoleSelect}
                    selectedRole={selectedRole}
                  />
                </motion.div>
              </AnimatePresence>

              <motion.div 
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => navigate("/signup")} 
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200 hover:underline"
                  >
                    Create one
                  </button>
                </p>
                <button 
                  onClick={() => navigate("/forgot-password")} 
                  className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors duration-200 hover:underline"
                >
                  Forgot password?
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;