import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Loader2, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Briefcase, Shield } from "lucide-react";

type Role = "student" | "recruiter" | "admin";

interface LoginFormProps {
  onLoginSuccess?: () => void;
  onRoleSelect?: (role: Role | null) => void;
  selectedRole: Role | null;
}

const RoleSelector = ({ 
  onRoleSelect, 
  selectedRole 
}: {
  onRoleSelect: (role: Role | null) => void;
  selectedRole: Role | null;
}) => {
  const roleIcons = {
    student: <GraduationCap className="w-6 h-6 mr-2" />,
    recruiter: <Briefcase className="w-6 h-6 mr-2" />,
    admin: <Shield className="w-6 h-6 mr-2" />
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-center">Select your role</h3>
      <div className="flex justify-center gap-6">
        {(["student", "recruiter", "admin"] as const).map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => onRoleSelect(role)}
            className={`flex items-center px-8 py-4 rounded-xl border transition-all text-lg ${
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

const LoginForm = ({ onLoginSuccess, onRoleSelect, selectedRole }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRoleSelection = (role: Role | null) => {
    if (onRoleSelect) {
      onRoleSelect(role);
    }
  };

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
      // Frontend-only login simulation
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        if (selectedRole === "admin") {
          navigate("/admin/dashboard");
        }
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to access your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <RoleSelector
          onRoleSelect={handleRoleSelection}
          selectedRole={selectedRole}
        />

        {selectedRole && (
          <div className="space-y-5 mt-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 text-base"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 text-base"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        )}
      </form>

      <div className="text-center pt-4">
        <p className="text-gray-600">
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