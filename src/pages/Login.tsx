
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Building2, ShieldCheck, Lock, Mail } from "lucide-react";
import RoleSelector from "@/components/auth/RoleSelector";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";

type Role = "student" | "recruiter" | "admin";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast({
        title: "Error",
        description: "Please select a role to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Hard-coded admin credentials check
    if (selectedRole === "admin") {
      if (email === "yashrkm@gmail.com" && password === "825TGBvdf@#&") {
        // Successful admin login
        toast({
          title: "Success",
          description: "Admin login successful. Redirecting to dashboard...",
        });
        setTimeout(() => {
          // Redirect logic would go here
          setIsLoading(false);
        }, 1500);
      } else {
        // Failed admin login
        toast({
          title: "Error",
          description: "Invalid admin credentials.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    } else {
      // Student or recruiter login logic would integrate with Supabase here
      toast({
        title: "Info",
        description: `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} login would connect to Supabase in the full implementation.`,
      });
      setIsLoading(false);
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
                
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome Back!</h2>
                  <div className="relative mx-auto w-64 h-64 mb-6">
                    {selectedRole === "student" && (
                      <div className="animate-fade-in">
                        <User className="w-full h-full p-12 rounded-full bg-blue-100 text-blue-600" />
                        <div className="absolute top-2 right-2 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 animate-bounce">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    {selectedRole === "recruiter" && (
                      <div className="animate-fade-in">
                        <Building2 className="w-full h-full p-12 rounded-full bg-purple-100 text-purple-600" />
                        <div className="absolute top-2 right-2 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 animate-bounce">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    {selectedRole === "admin" && (
                      <div className="animate-fade-in">
                        <ShieldCheck className="w-full h-full p-12 rounded-full bg-orange-100 text-orange-600" />
                        <div className="absolute top-2 right-2 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 animate-bounce">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    {!selectedRole && (
                      <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-32 h-32 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 max-w-xs mx-auto">
                    {selectedRole 
                      ? `Log in as a ${selectedRole} to access your personalized dashboard and features.` 
                      : "Please select your role to continue with the login process."}
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - login form */}
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-xl">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-center">Login to Your Account</CardTitle>
                  <CardDescription className="text-center">
                    Select your role and enter your credentials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <RoleSelector
                      onRoleSelect={setSelectedRole}
                      selectedRole={selectedRole}
                    />

                    {selectedRole && (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                              <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="password">Password</Label>
                              <Link
                                to="/forgot-password"
                                className="text-sm text-primary hover:underline"
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
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox id="remember" />
                            <label
                              htmlFor="remember"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full relative overflow-hidden group"
                          disabled={isLoading}
                        >
                          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-primary to-secondary"></span>
                          <span className="relative">{isLoading ? "Logging in..." : "Login"}</span>
                        </Button>
                      </>
                    )}
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="text-center text-sm">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="font-medium text-primary hover:underline"
                    >
                      Sign up
                    </Link>
                  </div>
                  <Link
                    to="/"
                    className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back to home
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
