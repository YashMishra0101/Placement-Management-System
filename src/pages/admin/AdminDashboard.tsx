import { Users, Briefcase, CheckCircle2, XCircle, Clock, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

// Dummy data with pending section
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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<"students" | "recruiters">("students");
  const [studentView, setStudentView] = useState<"approved" | "pending" | "rejected">("approved");
  const [recruiterView, setRecruiterView] = useState<"approved" | "pending" | "rejected">("approved");
  const { toast } = useToast();

  const handleStudentAction = (studentId: number, action: "approve" | "reject") => {
    const student = dummyStudents[studentView === "pending" ? "pending" : studentView === "approved" ? "approved" : "rejected"]
      .find(s => s.id === studentId);
    
    toast({
      title: action === "approve" ? "Student Approved" : "Student Rejected",
      description: `${student?.firstName} ${student?.lastName} has been ${action === "approve" ? "approved" : "rejected"}.`,
    });
  };

  const handleRecruiterAction = (recruiterId: number, action: "approve" | "reject") => {
    const recruiter = dummyRecruiters[recruiterView === "pending" ? "pending" : recruiterView === "approved" ? "approved" : "rejected"]
      .find(r => r.id === recruiterId);
    
    toast({
      title: action === "approve" ? "Recruiter Approved" : "Recruiter Rejected",
      description: `${recruiter?.companyName} has been ${action === "approve" ? "approved" : "rejected"}.`,
    });
  };

  const StatusBadge = ({ status }: { status: "approved" | "pending" | "rejected" }) => {
    const config = {
      approved: { color: "bg-green-100 text-green-800", icon: <CheckCircle2 className="h-4 w-4" /> },
      pending: { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-4 w-4" /> },
      rejected: { color: "bg-red-100 text-red-800", icon: <XCircle className="h-4 w-4" /> },
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
                <Button variant="outline" className="mr-4" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </Link>
            </div>

            <div className="flex-1 flex justify-center">
              <motion.span 
                className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent ml-32"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Admin Dashboard
              </motion.span>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
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
            </div>
            
            <div className="w-24"></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "students" ? (
            <motion.div
              key="students"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <CardHeader className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-t-lg">
                      <CardTitle className="text-xl flex justify-between items-center">
                        <span>Pending</span>
                        <span className="bg-white text-yellow-600 px-3 py-1 rounded-full text-sm">
                          {dummyStudents.pending.length}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center justify-center h-16 gap-2">
                        <Clock className="h-8 w-8 text-yellow-500" />
                        <p className="text-sm text-gray-600">Under review</p>
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
                    <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                      <CardTitle className="text-xl flex justify-between items-center">
                        <span>Approved</span>
                        <span className="bg-white text-green-600 px-3 py-1 rounded-full text-sm">
                          {dummyStudents.approved.length}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center justify-center h-16 gap-2">
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                        <p className="text-sm text-gray-600">Verified students</p>
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
                    <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-t-lg">
                      <CardTitle className="text-xl flex justify-between items-center">
                        <span>Rejected</span>
                        <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm">
                          {dummyStudents.rejected.length}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center justify-center h-16 gap-2">
                        <XCircle className="h-8 w-8 text-red-500" />
                        <p className="text-sm text-gray-600">Not approved</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Student Details */}
              <Card className="border-0 shadow-xl rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Student
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Academic Info
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Applied On
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {student.firstName} {student.middleName} {student.lastName}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {student.email}
                                  </div>
                                  <div className="text-xs text-gray-400 mt-1">
                                    DOB: {student.dob}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {student.branch} (Sem {student.semester})
                              </div>
                              <div className="text-sm text-gray-500">
                                CGPA: {student.cgpa} | Backlogs: {student.backlogs}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <StatusBadge status={studentView} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {student.appliedDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex gap-2">
                                {studentView === "pending" ? (
                                  <>
                                    <Button
                                      variant="success"
                                      size="sm"
                                      onClick={() => handleStudentAction(student.id, "approve")}
                                    >
                                      Approve
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => handleStudentAction(student.id, "reject")}
                                    >
                                      Reject
                                    </Button>
                                  </>
                                ) : studentView === "approved" ? (
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleStudentAction(student.id, "reject")}
                                  >
                                    Revoke
                                  </Button>
                                ) : (
                                  <Button
                                    variant="success"
                                    size="sm"
                                    onClick={() => handleStudentAction(student.id, "approve")}
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
              key="recruiters"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Pending Recruiters Card */}
                                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      recruiterView === "pending" ? "ring-2 ring-yellow-500" : ""
                    }`}
                    onClick={() => setRecruiterView("pending")}
                  >
                    <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-t-lg">
                      <CardTitle className="text-xl flex justify-between items-center">
                        <span>Pending</span>
                        <span className="bg-white text-amber-600 px-3 py-1 rounded-full text-sm">
                          {dummyRecruiters.pending.length}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center justify-center h-16 gap-2">
                        <Clock className="h-8 w-8 text-yellow-500" />
                        <p className="text-sm text-gray-600">Under review</p>
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
                      recruiterView === "approved" ? "ring-2 ring-green-500" : ""
                    }`}
                    onClick={() => setRecruiterView("approved")}
                  >
                    <CardHeader className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-t-lg">
                      <CardTitle className="text-xl flex justify-between items-center">
                        <span>Approved</span>
                        <span className="bg-white text-teal-600 px-3 py-1 rounded-full text-sm">
                          {dummyRecruiters.approved.length}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center justify-center h-16 gap-2">
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                        <p className="text-sm text-gray-600">Verified companies</p>
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
                    <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-t-lg">
                      <CardTitle className="text-xl flex justify-between items-center">
                        <span>Rejected</span>
                        <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm">
                          {dummyRecruiters.rejected.length}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center justify-center h-16 gap-2">
                        <XCircle className="h-8 w-8 text-red-500" />
                        <p className="text-sm text-gray-600">Not approved</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Recruiter Details */}
              <Card className="border-0 shadow-xl rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Company
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Applied On
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    src={recruiter.logo}
                                    alt={`${recruiter.companyName} logo`}
                                    className="h-10 w-10 rounded-full"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {recruiter.companyName}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {recruiter.companyInfo}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {recruiter.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <StatusBadge status={recruiterView} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {recruiter.appliedDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex gap-2">
                                {recruiterView === "pending" ? (
                                  <>
                                    <Button
                                      variant="success"
                                      size="sm"
                                      onClick={() => handleRecruiterAction(recruiter.id, "approve")}
                                    >
                                      Approve
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => handleRecruiterAction(recruiter.id, "reject")}
                                    >
                                      Reject
                                    </Button>
                                  </>
                                ) : recruiterView === "approved" ? (
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleRecruiterAction(recruiter.id, "reject")}
                                  >
                                    Revoke
                                  </Button>
                                ) : (
                                  <Button
                                    variant="success"
                                    size="sm"
                                    onClick={() => handleRecruiterAction(recruiter.id, "approve")}
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
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;