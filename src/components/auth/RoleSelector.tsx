
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserRound, Building2, ShieldCheck } from "lucide-react";

type Role = "student" | "recruiter" | "admin";

interface RoleSelectorProps {
  onRoleSelect: (role: Role) => void;
  selectedRole: Role | null;
}

const RoleSelector = ({ onRoleSelect, selectedRole }: RoleSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Button
        variant={selectedRole === "student" ? "default" : "outline"}
        className={`flex flex-col items-center justify-center h-32 p-4 ${
          selectedRole === "student"
            ? "border-primary bg-primary text-primary-foreground"
            : "hover:border-primary/50"
        }`}
        onClick={() => onRoleSelect("student")}
      >
        <UserRound className="h-10 w-10 mb-2" />
        <span className="text-lg font-medium">Student</span>
      </Button>

      <Button
        variant={selectedRole === "recruiter" ? "default" : "outline"}
        className={`flex flex-col items-center justify-center h-32 p-4 ${
          selectedRole === "recruiter"
            ? "border-primary bg-primary text-primary-foreground"
            : "hover:border-primary/50"
        }`}
        onClick={() => onRoleSelect("recruiter")}
      >
        <Building2 className="h-10 w-10 mb-2" />
        <span className="text-lg font-medium">Recruiter</span>
      </Button>

      <Button
        variant={selectedRole === "admin" ? "default" : "outline"}
        className={`flex flex-col items-center justify-center h-32 p-4 ${
          selectedRole === "admin"
            ? "border-primary bg-primary text-primary-foreground"
            : "hover:border-primary/50"
        }`}
        onClick={() => onRoleSelect("admin")}
      >
        <ShieldCheck className="h-10 w-10 mb-2" />
        <span className="text-lg font-medium">Admin</span>
      </Button>
    </div>
  );
};

export default RoleSelector;
