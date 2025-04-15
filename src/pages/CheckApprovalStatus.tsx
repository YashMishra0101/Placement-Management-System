import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Mail,
  User,
  Briefcase,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/landing/Footer";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    const particleCount = 80;
    const colors = [
      "#E5DEFF",
      "#D3E4FD",
      "#FFDEE2",
      "#FDE1D3",
      "#E0F7FA",
      "#E8F5E9",
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const distance = Math.sqrt(
            Math.pow(particles[a].x - particles[b].x, 2) +
              Math.pow(particles[a].y - particles[b].y, 2)
          );

          if (distance < 100) {
            ctx.strokeStyle = `${particles[a].color}${Math.floor(
              30 - distance / 3.3
            ).toString(16)}`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.8;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }

      connectParticles();
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    initParticles();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-30"
    />
  );
};

interface StatusCardProps {
  status: "approved" | "pending" | "rejected";
  role?: "student" | "recruiter";
  userData?: any;
  studentData?: any;
  recruiterData?: any;
  message?: string;
}

const StatusCard = ({
  status,
  role,
  userData,
  studentData,
  recruiterData,
  message,
}: StatusCardProps) => {
  const renderIcon = () => {
    switch (status) {
      case "approved":
        return (
          <motion.div
            className="mb-6 bg-green-100 rounded-full p-4 inline-block"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </motion.div>
        );
      case "pending":
        return (
          <motion.div
            className="mb-6 bg-yellow-100 rounded-full p-4 inline-block"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Loader2 className="h-12 w-12 text-yellow-600 animate-spin" />
          </motion.div>
        );
      case "rejected":
        return (
          <motion.div
            className="mb-6 bg-red-100 rounded-full p-4 inline-block"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <XCircle className="h-12 w-12 text-red-600" />
          </motion.div>
        );
    }
  };

  const renderTitle = () => {
    switch (status) {
      case "approved":
        return "Congratulations! You're Approved";
      case "pending":
        return "Your Application is Pending";
      case "rejected":
        return "Application Not Approved";
    }
  };

  const renderContent = () => {
    if (status === "pending" || status === "rejected") {
      return (
        <motion.p
          className="text-gray-600 max-w-md mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {message ||
            (status === "pending"
              ? "Your application is under review. Please check back later."
              : "Your application was not approved. Please contact support for more information.")}
        </motion.p>
      );
    }

    if (status === "approved" && role === "student" && studentData) {
      return (
        <motion.div
          className="space-y-4 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="font-medium text-gray-800 text-center">
            Your Profile Details:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                label: "Name",
                value: `${studentData.first_name} ${
                  studentData.middle_name || ""
                } ${studentData.last_name}`,
              },
              { label: "Email", value: userData?.email },
              { label: "Branch", value: studentData.branch },
              { label: "CGPA", value: studentData.cgpa },
              { label: "10th Percentage", value: studentData.tenth_percentage },
              {
                label: "12th Percentage",
                value: studentData.twelfth_percentage,
              },
              { label: "Semester", value: studentData.semester },
              { label: "Backlogs", value: studentData.backlogs || "None" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-blue-50 p-4 rounded-lg border border-blue-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    }

    if (status === "approved" && role === "recruiter" && recruiterData) {
      return (
        <motion.div
          className="space-y-4 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="font-medium text-gray-800 text-center">
            Company Details:
          </p>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: "Company", value: recruiterData.company_name },
              { label: "Email", value: userData?.email },
              { label: "About", value: recruiterData.company_info },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-blue-50 p-4 rounded-lg border border-blue-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </motion.div>
            ))}
            {recruiterData.logo_url && (
              <motion.div
                className="flex justify-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <img
                  src={recruiterData.logo_url}
                  alt="Company Logo"
                  className="h-24 object-contain rounded-lg"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      );
    }

    return null;
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-2xl w-full mx-auto border border-gray-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {renderIcon()}
      <motion.h2
        className="text-2xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {renderTitle()}
      </motion.h2>
      {renderContent()}
    </motion.div>
  );
};

const CheckApprovalStatus = () => {
  const [email, setEmail] = useState("");
  const [statusData, setStatusData] = useState<{
    status: "approved" | "pending" | "rejected";
    role?: "student" | "recruiter";
    userData?: any;
    studentData?: any;
    recruiterData?: any;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<"student" | "recruiter">("student");
  const { toast } = useToast();

  const checkStatus = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to check your status",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setStatusData(null);

    try {
      // Mock response - replace this with your actual API call
      const mockResponse = {
        status: "pending",
        role: userType,
        userData: { email },
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStatusData(mockResponse);
      
      toast({
        title: "Status Checked",
        description: "This is a demo response. In a real application, this would check your actual status.",
      });
    } catch (error) {
      console.error("Error checking status:", error);
      toast({
        title: "Error",
        description: "Failed to check approval status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white relative overflow-hidden">
      <Navbar />
      <ParticleBackground />

      <div className="max-w-5xl mx-auto relative z-10 mt-20">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-500 mb-4 pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Check Your Approval Status
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Enter your registered email address to verify your application
            status
          </motion.p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden -mt-5">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6">
              <CardTitle className="text-xl md:text-2xl font-semibold">
                Application Status Checker
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              {/* User Type Selection */}
              <motion.div
                className="flex justify-center mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-gray-100 p-1 rounded-full flex">
                  <Button
                    variant={userType === "student" ? "default" : "ghost"}
                    onClick={() => {
                      setUserType("student");
                      setStatusData(null);
                    }}
                    className={`gap-2 rounded-full transition-all ${
                      userType === "student" ? "shadow-md" : ""
                    }`}
                  >
                    <User size={18} />
                    Student
                  </Button>
                  <Button
                    variant={userType === "recruiter" ? "default" : "ghost"}
                    onClick={() => {
                      setUserType("recruiter");
                      setStatusData(null);
                    }}
                    className={`gap-2 rounded-full transition-all ${
                      userType === "recruiter" ? "shadow-md" : ""
                    }`}
                  >
                    <Briefcase size={18} />
                    Recruiter
                  </Button>
                </div>
              </motion.div>

              {/* Email Input */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your registered email address
                </label>
                <div className="flex gap-3 flex-col sm:flex-row">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="email"
                      placeholder={
                        userType === "student"
                          ? "student.name@example.com"
                          : "company@example.com"
                      }
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 text-base"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") checkStatus();
                      }}
                    />
                  </div>
                  <Button
                    onClick={checkStatus}
                    disabled={isLoading}
                    className="h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all min-w-[140px] text-base"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      "Check Status"
                    )}
                  </Button>
                </div>
              </motion.div>

              {/* Result Display */}
              {statusData && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.5 }}
                  className="mt-8"
                >
                  <StatusCard
                    status={statusData.status}
                    role={statusData.role}
                    userData={statusData.userData}
                    studentData={statusData.studentData}
                    recruiterData={statusData.recruiterData}
                  />
                </motion.div>
              )}

              {/* Status Indicators */}
              <motion.div
                className="flex flex-wrap justify-center gap-4 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[
                  {
                    status: "approved",
                    icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
                    label: "Approved",
                  },
                  {
                    status: "pending",
                    icon: <Loader2 className="h-4 w-4 text-yellow-600" />,
                    label: "Pending",
                  },
                  {
                    status: "rejected",
                    icon: <XCircle className="h-4 w-4 text-red-600" />,
                    label: "Rejected",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div
                      className={`bg-${
                        item.status === "approved"
                          ? "green"
                          : item.status === "pending"
                          ? "yellow"
                          : "red"
                      }-100 p-1 rounded-full`}
                    >
                      {item.icon}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <div className="-mb-10 -mr-14 -ml-4 mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default CheckApprovalStatus;