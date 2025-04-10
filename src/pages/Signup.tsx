
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import RoleSelector from "@/components/auth/RoleSelector";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import { SignupStudent } from "@/components/auth/SignupStudent";
import { SignupRecruiter } from "@/components/auth/SignupRecruiter";

type Role = "student" | "recruiter" | "admin";

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const { toast } = useToast();

  const handleSubmitStudentForm = (data: any) => {
    toast({
      title: "Account pending approval",
      description: "Your student account has been submitted for admin approval.",
    });
    console.log("Student signup data:", data);
  };

  const handleSubmitRecruiterForm = (data: any) => {
    toast({
      title: "Account pending approval",
      description: "Your recruiter account has been submitted for admin approval.",
    });
    console.log("Recruiter signup data:", data);
  };

  const renderForm = () => {
    switch (selectedRole) {
      case "student":
        return <SignupStudent onSubmit={handleSubmitStudentForm} />;
      case "recruiter":
        return <SignupRecruiter onSubmit={handleSubmitRecruiterForm} />;
      case "admin":
        return (
          <div className="text-center py-8">
            <p className="text-lg text-gray-700 mb-4">
              Admin accounts can only be created by existing administrators.
            </p>
            <p className="text-gray-600">
              Please contact an administrator to get access.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full space-y-8 animate-fade-in">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Create Your Account
            </h2>
            <p className="mt-2 text-gray-600">
              Please select your role and fill the required information
            </p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Choose your role</CardTitle>
              <CardDescription>
                Select the appropriate role to sign up
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <RoleSelector
                  onRoleSelect={setSelectedRole}
                  selectedRole={selectedRole}
                />

                {renderForm()}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Login
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
      <Footer />
    </div>
  );
};

export default Signup;
