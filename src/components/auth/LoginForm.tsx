import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react"; // Added Eye and EyeOff icons
import { useToast } from "@/components/ui/use-toast";
import { GraduationCap, Briefcase, Shield } from "lucide-react";

type Role = "students" | "recruiters" | "admins";

interface LoginFormProps {
  onLoginSuccess: (email: string, password: string) => Promise<void>;
  onRoleSelect: (role: Role | null) => void;
  selectedRole: Role | null;
}

const RoleSelector = ({
  onRoleSelect,
  selectedRole,
}: {
  onRoleSelect: (role: Role | null) => void;
  selectedRole: Role | null;
}) => {
  const roleIcons = {
    student: <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />,
    recruiter: <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />,
    admin: <Shield className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />,
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base sm:text-lg font-medium text-center">Select your role</h3>
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
        {(["student", "recruiter", "admin"] as const).map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => onRoleSelect(role)}
            className={`flex items-center justify-center px-4 py-3 sm:px-6 sm:py-4 rounded-xl border transition-all text-base sm:text-lg ${
              selectedRole === role
                ? "border-indigo-600 bg-indigo-100 text-indigo-700 font-semibold shadow-md"
                : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 text-gray-700"
            }`}
          >
            {roleIcons[role]}
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

const LoginForm = ({
  onLoginSuccess,
  onRoleSelect,
  selectedRole,
}: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      toast({
        title: "Error",
        description: "Please select a role to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await onLoginSuccess(email, password);
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-gray-600 text-sm sm:text-base">Sign in to access your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <RoleSelector onRoleSelect={onRoleSelect} selectedRole={selectedRole} />

        {selectedRole && (
          <div className="space-y-4 sm:space-y-5 mt-6 sm:mt-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 text-sm sm:text-base">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-10 sm:h-12 text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-gray-700 text-sm sm:text-base">
                  Password
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-xs sm:text-sm text-indigo-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-10 sm:h-12 text-sm sm:text-base" // Added pr-10 for the toggle button
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-1 sm:pt-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
                className="h-4 w-4 sm:h-5 sm:w-5"
              />
              <label
                htmlFor="remember"
                className="text-xs sm:text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-10 sm:h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm sm:text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        )}
      </form>

      <div className="text-center pt-2 sm:pt-4">
        <p className="text-gray-600 text-xs sm:text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;