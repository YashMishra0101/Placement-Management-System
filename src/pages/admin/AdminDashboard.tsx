import {
  Users,
  Briefcase,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronLeft,
  UserPlus,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<
    "students" | "recruiters" | "createAdmin"
  >("students");
  const [studentView, setStudentView] = useState<
    "approved" | "pending" | "rejected"
  >("approved");
  const [recruiterView, setRecruiterView] = useState<
    "approved" | "pending" | "rejected"
  >("approved");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dummyStudents = {
    approved: [
      {
        id: 1,
        firstName: "Rahul",
        middleName: "Kumar",
        lastName: "Sharma",
        email: "rahul.sharma@example.com",
        dob: "1999-05-15",
        tenthPercentage: 92,
        twelfthPercentage: 88,
        cgpa: 8.7,
        branch: "Computer Science",
        semester: "6",
        backlogs: 0,
        appliedDate: "2023-05-10",
      },
    ],
    pending: [
      {
        id: 2,
        firstName: "Priya",
        middleName: "",
        lastName: "Patel",
        email: "priya.patel@example.com",
        dob: "2000-08-22",
        tenthPercentage: 89,
        twelfthPercentage: 85,
        cgpa: 8.2,
        branch: "Information Technology",
        semester: "5",
        backlogs: 1,
        appliedDate: "2023-06-15",
      },
      {
        id: 3,
        firstName: "Amit",
        middleName: "Singh",
        lastName: "Verma",
        email: "amit.verma@example.com",
        dob: "1999-11-30",
        tenthPercentage: 85,
        twelfthPercentage: 80,
        cgpa: 7.8,
        branch: "Electronics",
        semester: "7",
        backlogs: 0,
        appliedDate: "2023-06-18",
      },
    ],
    rejected: [
      {
        id: 4,
        firstName: "Neha",
        middleName: "",
        lastName: "Gupta",
        email: "neha.gupta@example.com",
        dob: "2000-02-20",
        tenthPercentage: 78,
        twelfthPercentage: 72,
        cgpa: 7.2,
        branch: "Mechanical",
        semester: "4",
        backlogs: 2,
        appliedDate: "2023-05-28",
      },
    ],
  };

  const dummyRecruiters = {
    approved: [
      {
        id: 1,
        companyName: "Tech Solutions Inc.",
        email: "hr@techsolutions.com",
        companyInfo: "Leading tech company specializing in software development",
        logo: "https://via.placeholder.com/150",
        appliedDate: "2023-04-12",
      },
    ],
    pending: [
      {
        id: 2,
        companyName: "Data Analytics Co.",
        email: "contact@dataanalytics.com",
        companyInfo: "Big data and business intelligence solutions",
        logo: "https://via.placeholder.com/150",
        appliedDate: "2023-06-10",
      },
      {
        id: 4,
        companyName: "Cloud Services Ltd.",
        email: "info@cloudservices.com",
        companyInfo: "Cloud infrastructure and managed services",
        logo: "https://via.placeholder.com/150",
        appliedDate: "2023-06-20",
      },
    ],
    rejected: [
      {
        id: 3,
        companyName: "Quick Services",
        email: "contact@quickservices.com",
        companyInfo: "Temporary staffing solutions",
        logo: "https://via.placeholder.com/150",
        appliedDate: "2023-05-15",
      },
    ],
  };

  const { toast } = useToast();

  const handleStudentAction = (
    studentId: number,
    action: "approve" | "reject"
  ) => {
    const student = dummyStudents[
      studentView === "pending"
        ? "pending"
        : studentView === "approved"
        ? "approved"
        : "rejected"
    ].find((s) => s.id === studentId);

    toast({
      title: action === "approve" ? "Student Approved" : "Student Rejected",
      description: `${student?.firstName} ${student?.lastName} has been ${
        action === "approve" ? "approved" : "rejected"
      }.`,
    });
  };

  const handleRecruiterAction = (
    recruiterId: number,
    action: "approve" | "reject"
  ) => {
    const recruiter = dummyRecruiters[
      recruiterView === "pending"
        ? "pending"
        : recruiterView === "approved"
        ? "approved"
        : "rejected"
    ].find((r) => r.id === recruiterId);

    toast({
      title: action === "approve" ? "Recruiter Approved" : "Recruiter Rejected",
      description: `${recruiter?.companyName} has been ${
        action === "approve" ? "approved" : "rejected"
      }.`,
    });
  };

  const handleCreateAdmin = () => {
    if (adminPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Admin Created",
      description: `New admin with email ${adminEmail} has been created successfully.`,
    });

    setAdminEmail("");
    setAdminPassword("");
    setConfirmPassword("");
  };

  const StatusBadge = ({
    status,
  }: {
    status: "approved" | "pending" | "rejected";
  }) => {
    const config = {
      approved: {
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle2 className="h-4 w-4" />,
      },
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <Clock className="h-4 w-4" />,
      },
      rejected: {
        color: "bg-red-100 text-red-800",
        icon: <XCircle className="h-4 w-4" />,
      },
    };

    return (
      <Badge className={`${config[status].color} gap-1`}>
        {config[status].icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/login">
                <Button variant="outline" className="mr-2 sm:mr-4" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
            </div>

            <div className="flex-1 flex justify-center sm:justify-start">
              <motion.span
                className="text-lg sm:text-xl mx-auto relative md:left-10 font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Admin Dashboard
              </motion.span>
            </div>

            <div className="hidden sm:flex sm:space-x-4 lg:space-x-8">
              <motion.button
                onClick={() => setActiveTab("students")}
                className={`${
                  activeTab === "students"
                    ? "border-indigo-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="mr-2 h-5 w-5" />
                Students
              </motion.button>
              <motion.button
                onClick={() => setActiveTab("recruiters")}
                className={`${
                  activeTab === "recruiters"
                    ? "border-indigo-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Briefcase className="mr-2 h-5 w-5" />
                Recruiters
              </motion.button>
              <motion.button
                onClick={() => setActiveTab("createAdmin")}
                className={`${
                  activeTab === "createAdmin"
                    ? "border-indigo-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Create Admin
              </motion.button>
            </div>

            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setActiveTab("students")}>
                    <Users className="mr-2 h-4 w-4" />
                    Students
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("recruiters")}>
                    <Briefcase className="mr-2 h-4 w-4" />
                    Recruiters
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("createAdmin")}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Admin
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <AnimatePresence mode="wait">
          {activeTab === "students" ? (
            <motion.div
              key="students"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {/* Pending Students Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      studentView === "pending" ? "ring-2 ring-yellow-500" : ""
                    }`}
                    onClick={() => setStudentView("pending")}
                  >
                    <CardHeader className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-t-lg p-3 sm:p-4">
                      <CardTitle className="text-lg sm:text-xl flex justify-between items-center">
                        <span>Pending</span>
                        <span className="bg-white text-yellow-600 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                          {dummyStudents.pending.length}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex flex-col items-center justify-center h-12 sm:h-16 gap-1 sm:gap-2">
                        <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
                        <p className="text-xs sm:text-sm text-gray-600">Under review</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                {/* Approved Students Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      studentView === "approved" ? "ring-2 ring-green-500" : ""
                    }`}
                    onClick={() => setStudentView("approved")}
                  >
                    <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg p-3 sm:p-4">
                      <CardTitle className="text-lg sm:text-xl flex justify-between items-center">
                        <span>Approved</span>
                        <span className="bg-white text-green-600 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                          {dummyStudents.approved.length}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex flex-col items-center justify-center h-12 sm:h-16 gap-1 sm:gap-2">
                        <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                        <p className="text-xs sm:text-sm text-gray-600">
                          Verified students
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Rejected Students Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      studentView === "rejected" ? "ring-2 ring-red-500" : ""
                    }`}
                    onClick={() => setStudentView("rejected")}
                  >
                    <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-t-lg p-3 sm:p-4">
                      <CardTitle className="text-lg sm:text-xl flex justify-between items-center">
                        <span>Rejected</span>
                        <span className="bg-white text-red-600 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                          {dummyStudents.rejected.length}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex flex-col items-center justify-center h-12 sm:h-16 gap-1 sm:gap-2">
                        <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
                        <p className="text-xs sm:text-sm text-gray-600">Not approved</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Student Details */}
              <Card className="border-0 shadow-lg sm:shadow-xl rounded-lg sm:rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Student
                          </th>
                          <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Academic Info
                          </th>
                          <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Applied On
                          </th>
                          <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dummyStudents[studentView].map((student) => (
                          <motion.tr
                            key={student.id}
                            className="hover:bg-gray-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-1 sm:ml-4">
                                  <div className="text-xs sm:text-sm font-medium text-gray-900">
                                    {student.firstName} {student.middleName}{" "}
                                    {student.lastName}
                                  </div>
                                  <div className="text-xs sm:text-sm text-gray-500">
                                    {student.email}
                                  </div>
                                  <div className="text-xxs sm:text-xs text-gray-400 mt-0.5 sm:mt-1">
                                    DOB: {student.dob}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                              <div className="text-xs sm:text-sm text-gray-900">
                                {student.branch} (Sem {student.semester})
                              </div>
                              <div className="text-xs sm:text-sm text-gray-500">
                                CGPA: {student.cgpa} | Backlogs:{" "}
                                {student.backlogs}
                              </div>
                            </td>
                            <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                              <StatusBadge status={studentView} />
                            </td>
                            <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                              {student.appliedDate}
                            </td>
                            <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-medium">
                              <div className="flex gap-1 sm:gap-2">
                                {studentView === "pending" ? (
                                  <>
                                    <Button
                                      variant="success"
                                      size="xs"
                                      className="text-xs"
                                      onClick={() =>
                                        handleStudentAction(
                                          student.id,
                                          "approve"
                                        )
                                      }
                                    >
                                      Approve
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="xs"
                                      className="text-xs"
                                      onClick={() =>
                                        handleStudentAction(
                                          student.id,
                                          "reject"
                                        )
                                      }
                                    >
                                      Reject
                                    </Button>
                                  </>
                                ) : studentView === "approved" ? (
                                  <Button
                                    variant="destructive"
                                    size="xs"
                                    className="text-xs"
                                    onClick={() =>
                                      handleStudentAction(student.id, "reject")
                                    }
                                  >
                                    Revoke
                                  </Button>
                                ) : (
                                  <Button
                                    variant="success"
                                    size="xs"
                                    className="text-xs"
                                    onClick={() =>
                                      handleStudentAction(student.id, "approve")
                                    }
                                  >
                                    Re-approve
                                  </Button>
                                )}
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : activeTab === "recruiters" ? (
            <motion.div
              key="recruiters"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {/* Pending Recruiters Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      recruiterView === "pending"
                        ? "ring-2 ring-yellow-500"
                        : ""
                    }`}
                    onClick={() => setRecruiterView("pending")}
                  >
                    <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-t-lg p-3 sm:p-4">
                      <CardTitle className="text-lg sm:text-xl flex justify-between items-center">
                        <span>Pending</span>
                        <span className="bg-white text-amber-600 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                          {dummyRecruiters.pending.length}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex flex-col items-center justify-center h-12 sm:h-16 gap-1 sm:gap-2">
                        <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
                        <p className="text-xs sm:text-sm text-gray-600">Under review</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                {/* Approved Recruiters Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      recruiterView === "approved"
                        ? "ring-2 ring-green-500"
                        : ""
                    }`}
                    onClick={() => setRecruiterView("approved")}
                  >
                    <CardHeader className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-t-lg p-3 sm:p-4">
                      <CardTitle className="text-lg sm:text-xl flex justify-between items-center">
                        <span>Approved</span>
                        <span className="bg-white text-teal-600 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                          {dummyRecruiters.approved.length}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex flex-col items-center justify-center h-12 sm:h-16 gap-1 sm:gap-2">
                        <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                        <p className="text-xs sm:text-sm text-gray-600">
                          Verified companies
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Rejected Recruiters Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      recruiterView === "rejected" ? "ring-2 ring-red-500" : ""
                    }`}
                    onClick={() => setRecruiterView("rejected")}
                  >
                    <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-t-lg p-3 sm:p-4">
                      <CardTitle className="text-lg sm:text-xl flex justify-between items-center">
                        <span>Rejected</span>
                        <span className="bg-white text-red-600 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                          {dummyRecruiters.rejected.length}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex flex-col items-center justify-center h-12 sm:h-16 gap-1 sm:gap-2">
                        <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
                        <p className="text-xs sm:text-sm text-gray-600">Not approved</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Recruiter Details */}
              <Card className="border-0 shadow-lg sm:shadow-xl rounded-lg sm:rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Company
                          </th>
                          <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Applied On
                          </th>
                          <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dummyRecruiters[recruiterView].map((recruiter) => (
                          <motion.tr
                            key={recruiter.id}
                            className="hover:bg-gray-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                                  <img
                                    src={recruiter.logo}
                                    alt={`${recruiter.companyName} logo`}
                                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                                  />
                                </div>
                                <div className="ml-2 sm:ml-4">
                                  <div className="text-xs sm:text-sm font-medium text-gray-900">
                                    {recruiter.companyName}
                                  </div>
                                  <div className="text-xs sm:text-sm text-gray-500 line-clamp-1">
                                    {recruiter.companyInfo}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                              {recruiter.email}
                            </td>
                            <td className="px-3 sm:px-6 py-3 whitespace-nowrap">
                              <StatusBadge status={recruiterView} />
                            </td>
                            <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                              {recruiter.appliedDate}
                            </td>
                            <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-medium">
                              <div className="flex gap-1 sm:gap-2">
                                {recruiterView === "pending" ? (
                                  <>
                                    <Button
                                      variant="success"
                                      size="xs"
                                      className="text-xs"
                                      onClick={() =>
                                        handleRecruiterAction(
                                          recruiter.id,
                                          "approve"
                                        )
                                      }
                                    >
                                      Approve
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="xs"
                                      className="text-xs"
                                      onClick={() =>
                                        handleRecruiterAction(
                                          recruiter.id,
                                          "reject"
                                        )
                                      }
                                    >
                                      Reject
                                    </Button>
                                  </>
                                ) : recruiterView === "approved" ? (
                                  <Button
                                    variant="destructive"
                                    size="xs"
                                    className="text-xs"
                                    onClick={() =>
                                      handleRecruiterAction(
                                        recruiter.id,
                                        "reject"
                                      )
                                    }
                                  >
                                    Revoke
                                  </Button>
                                ) : (
                                  <Button
                                    variant="success"
                                    size="xs"
                                    className="text-xs"
                                    onClick={() =>
                                      handleRecruiterAction(
                                        recruiter.id,
                                        "approve"
                                      )
                                    }
                                  >
                                    Re-approve
                                  </Button>
                                )}
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="createAdmin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 sm:space-y-6"
            >
              <Card className="border-0 shadow-lg sm:shadow-xl rounded-lg sm:rounded-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg p-3 sm:p-4">
                  <CardTitle className="text-lg sm:text-xl">Create New Admin</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4 max-w-md mx-auto">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="email" className="text-xs sm:text-sm">Admin Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter admin email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        className="text-xs sm:text-sm h-8 sm:h-9"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="password" className="text-xs sm:text-sm">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="text-xs sm:text-sm h-8 sm:h-9"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="confirmPassword" className="text-xs sm:text-sm">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="text-xs sm:text-sm h-8 sm:h-9"
                      />
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Button
                        className="w-full mt-2 sm:mt-4 h-8 sm:h-9"
                        onClick={handleCreateAdmin}
                        disabled={
                          !adminEmail || !adminPassword || !confirmPassword
                        }
                      >
                        <UserPlus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">Create Admin Account</span>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;