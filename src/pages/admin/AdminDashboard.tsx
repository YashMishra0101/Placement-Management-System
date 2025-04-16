// import {
//   Users,
//   Briefcase,
//   ChevronLeft,
//   UserPlus,
//   Menu,
//   Eye,
//   EyeOff,
//   Layers,
//   GraduationCap,
//   Building,
// } from "lucide-react";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useToast } from "@/components/ui/use-toast";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/landing/Footer";
// import Typewriter from "typewriter-effect";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// // Import the sign-up pages directly
// import SignupStudent from "../../components/auth/SignupStudent";
// import SignupRecruiter from "../../components/auth/SignupRecruiter";

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState<
//     | "students"
//     | "recruiters"
//     | "createAdmin"
//     | "studentSignup"
//     | "recruiterSignup"
//   >("students");
//   const [adminEmail, setAdminEmail] = useState("");
//   const [adminPassword, setAdminPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const { toast } = useToast();

//   const handleCreateAdmin = () => {
//     if (adminPassword !== confirmPassword) {
//       toast({
//         title: "Error",
//         description: "Passwords do not match",
//         variant: "destructive",
//       });
//       return;
//     }

//     toast({
//       title: "Admin Created",
//       description: `New admin with email ${adminEmail} has been created successfully.`,
//     });

//     setAdminEmail("");
//     setAdminPassword("");
//     setConfirmPassword("");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-10">
//       {/* Navigation Bar - Simplified */}
//       <nav className="bg-white shadow-md sticky top-0 z-10">
//         {/* Page Title Section */}
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 shadow-md ">
//           <h1 className="text-3xl font-extrabold text-center text-white py-3 -mb-1 bg-clip-text text-transparent">
//             <Typewriter
//               options={{
//                 strings: ["Welcome to Admin Panel", "Manage Users Efficiently"],
//                 autoStart: true,
//                 loop: true,
//               }}
//             />
//           </h1>

//           <p className="text-center text-white mt-2 text-sm mb-1">
//             Here you can create and manage student, recruiter, and admin
//             accounts.
//           </p>
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center">
//               {activeTab === "students" && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="flex items-center"
//                 >
//                   <Users className="h-6 w-6 mr-2" />
//                   <h1 className="text-xl font-bold">Student Management</h1>
//                 </motion.div>
//               )}
//               {activeTab === "recruiters" && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="flex items-center"
//                 >
//                   <Briefcase className="h-6 w-6 mr-2" />
//                   <h1 className="text-xl font-bold">Recruiter Management</h1>
//                 </motion.div>
//               )}
//               {activeTab === "createAdmin" && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="flex items-center"
//                 >
//                   <UserPlus className="h-6 w-6 mr-2" />
//                   <h1 className="text-xl font-bold">Admin Creation</h1>
//                 </motion.div>
//               )}
//               {activeTab === "studentSignup" && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="flex items-center"
//                 >
//                   <GraduationCap className="h-6 w-6 mr-2" />
//                   <h1 className="text-xl font-bold">Student Registration</h1>
//                 </motion.div>
//               )}
//               {activeTab === "recruiterSignup" && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="flex items-center"
//                 >
//                   <Building className="h-6 w-6 mr-2" />
//                   <h1 className="text-xl font-bold">Recruiter Registration</h1>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 -mb-2">
//           <div className="flex items-center justify-between">
//             <Link to="/login" className="pb-2">
//               <Button variant="outline" className="sm:mr-4" size="sm">
//                 <ChevronLeft className="h-4 w-4 mt-[0.18rem] -mr-1" />
//                 <span className="hidden sm:inline">Home</span>
//               </Button>
//             </Link>
//             <div className="hidden sm:flex overflow-x-auto py-2 mx-auto">
//               {/* Navigation Buttons */}
//               {[
//                 {
//                   key: "studentSignup",
//                   label: "Create Student Account",
//                   icon: <GraduationCap className="mr-2 h-4 w-4" />,
//                 },
//                 {
//                   key: "recruiterSignup",
//                   label: "Create Recruiter Account",
//                   icon: <Building className="mr-2 h-4 w-4" />,
//                 },
//                 {
//                   key: "students",
//                   label: "Manage Students",
//                   icon: <Users className="mr-2 h-4 w-4" />,
//                 },
//                 {
//                   key: "recruiters",
//                   label: "Manage Recruiters",
//                   icon: <Briefcase className="mr-2 h-4 w-4" />,
//                 },
//                 {
//                   key: "createAdmin",
//                   label: "Create Admin",
//                   icon: <UserPlus className="mr-2 h-4 w-4" />,
//                 },
//               ].map(({ key, label, icon }) => (
//                 <motion.button
//                   key={key}
//                   onClick={() => setActiveTab(key)}
//                   className={`$ {
//                     activeTab === key
//                       ? "bg-indigo-50 text-indigo-700 border-indigo-600"
//                       : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
//                   } flex items-center px-4 py-2 text-sm font-medium rounded-md mr-2 border-b-2 border-transparent transition-all duration-150`}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   {icon} {label}
//                 </motion.button>
//               ))}
//             </div>

//             <div className="sm:hidden">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline" size="icon">
//                     <Menu className="h-4 w-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem
//                     onClick={() => setActiveTab("studentSignup")}
//                   >
//                     Create Student Account
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     onClick={() => setActiveTab("recruiterSignup")}
//                   >
//                     Create Recruiter Account
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setActiveTab("students")}>
//                     Manage Students
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setActiveTab("recruiters")}>
//                     Manage Recruiters
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setActiveTab("createAdmin")}>
//                     Create Admin
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <AnimatePresence mode="wait">
//           {activeTab === "students" ? (
//             <motion.div
//               key="students"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-6"
//             >
//               <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-center h-40">
//                     <div className="text-center">
//                       <Users className="h-12 w-12 mx-auto text-indigo-500 mb-2" />
//                       <h3 className="text-lg font-medium text-gray-900">
//                         Student Management
//                       </h3>
//                       <p className="text-gray-500 mt-2">
//                         Student management features coming soon. You'll be able
//                         to view, edit and manage student profiles.
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ) : activeTab === "recruiters" ? (
//             <motion.div
//               key="recruiters"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-6"
//             >
//               <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-center h-40">
//                     <div className="text-center">
//                       <Briefcase className="h-12 w-12 mx-auto text-teal-500 mb-2" />
//                       <h3 className="text-lg font-medium text-gray-900">
//                         Recruiter Management
//                       </h3>
//                       <p className="text-gray-500 mt-2">
//                         Recruiter management features coming soon. You'll be
//                         able to view, edit and manage recruiter profiles.
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ) : activeTab === "createAdmin" ? (
//             <motion.div
//               key="createAdmin"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-6"
//             >
//               <Card className="border-0 shadow-lg rounded-xl overflow-hidden bg-white">
//                 <CardContent className="p-6">
//                   <div className="max-w-md mx-auto">
//                     <div className="text-center mb-6">
//                       <UserPlus className="h-12 w-12 mx-auto text-indigo-500 mb-2" />
//                       <h3 className="text-lg font-medium text-gray-900">
//                         Create New Admin
//                       </h3>
//                       <p className="text-gray-500 text-sm">
//                         Add a new administrator to the system
//                       </p>
//                     </div>

//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="email" className="text-sm font-medium">
//                           Admin Email
//                         </Label>
//                         <div className="relative">
//                           <Input
//                             id="email"
//                             type="email"
//                             placeholder="admin@example.com"
//                             value={adminEmail}
//                             onChange={(e) => setAdminEmail(e.target.value)}
//                             className="h-10 pl-3"
//                           />
//                         </div>
//                       </div>

//                       <div className="space-y-2">
//                         <Label
//                           htmlFor="password"
//                           className="text-sm font-medium"
//                         >
//                           Password
//                         </Label>
//                         <div className="relative">
//                           <Input
//                             id="password"
//                             type={showPassword ? "text" : "password"}
//                             placeholder="••••••••"
//                             value={adminPassword}
//                             onChange={(e) => setAdminPassword(e.target.value)}
//                             className="h-10 pl-3 pr-10"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
//                           >
//                             {showPassword ? (
//                               <EyeOff className="h-4 w-4" />
//                             ) : (
//                               <Eye className="h-4 w-4" />
//                             )}
//                           </button>
//                         </div>
//                       </div>

//                       <div className="space-y-2">
//                         <Label
//                           htmlFor="confirmPassword"
//                           className="text-sm font-medium"
//                         >
//                           Confirm Password
//                         </Label>
//                         <div className="relative">
//                           <Input
//                             id="confirmPassword"
//                             type={showConfirmPassword ? "text" : "password"}
//                             placeholder="••••••••"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             className="h-10 pl-3 pr-10"
//                           />
//                           <button
//                             type="button"
//                             onClick={() =>
//                               setShowConfirmPassword(!showConfirmPassword)
//                             }
//                             className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
//                           >
//                             {showConfirmPassword ? (
//                               <EyeOff className="h-4 w-4" />
//                             ) : (
//                               <Eye className="h-4 w-4" />
//                             )}
//                           </button>
//                         </div>
//                       </div>

//                       <motion.div
//                         whileHover={{ scale: 1.01 }}
//                         whileTap={{ scale: 0.99 }}
//                         className="pt-2"
//                       >
//                         <Button
//                           className="w-full h-10 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
//                           onClick={handleCreateAdmin}
//                           disabled={
//                             !adminEmail || !adminPassword || !confirmPassword
//                           }
//                         >
//                           <UserPlus className="mr-2 h-4 w-4" />
//                           Create Admin Account
//                         </Button>
//                       </motion.div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ) : activeTab === "studentSignup" ? (
//             <motion.div
//               key="studentSignup"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-6"
//             >
//               <Card className="border-0 shadow-lg rounded-xl overflow-hidden bg-white">
//                 <CardContent className="p-6">
//                   <div className="max-w-4xl mx-auto">
//                     <div className="text-center mb-6">
//                       <GraduationCap className="h-12 w-12 mx-auto text-blue-500 mb-2" />
//                       <h3 className="text-lg font-medium text-gray-900">
//                         Student Registration Form
//                       </h3>
//                       <p className="text-gray-500 text-sm">
//                         Create a new student account
//                       </p>
//                     </div>

//                     <SignupStudent
//                       onSubmit={(data) => {
//                         toast({
//                           title: "Student Account Created",
//                           description: `Student ${data.firstName} ${data.lastName} has been registered successfully.`,
//                         });
//                       }}
//                       isSubmitting={false}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="recruiterSignup"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-6"
//             >
//               <Card className="border-0 shadow-lg rounded-xl overflow-hidden bg-white">
//                 <CardContent className="p-6">
//                   <div className="max-w-2xl mx-auto">
//                     <div className="text-center mb-6">
//                       <Building className="h-12 w-12 mx-auto text-purple-500 mb-2" />
//                       <h3 className="text-lg font-medium text-gray-900">
//                         Recruiter Registration Form
//                       </h3>
//                       <p className="text-gray-500 text-sm">
//                         Create a new recruiter account
//                       </p>
//                     </div>

//                     <SignupRecruiter
//                       onSubmit={(data) => {
//                         toast({
//                           title: "Recruiter Account Created",
//                           description: `${data.companyName} has been registered successfully.`,
//                         });
//                       }}
//                       isSubmitting={false}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;



// src/components/admin/AdminDashboard.tsx
import {
  Users,
  Briefcase,
  ChevronLeft,
  UserPlus,
  Menu,
  Eye,
  EyeOff,
  Layers,
  GraduationCap,
  Building,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Typewriter from "typewriter-effect";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignupStudent from "../../components/auth/SignupStudent";
import SignupRecruiter from "../../components/auth/SignupRecruiter";
import { auth, db, createUserWithEmailAndPassword, addDoc, collection } from "@/backend/firebase";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<
    | "students"
    | "recruiters"
    | "createAdmin"
    | "studentSignup"
    | "recruiterSignup"
  >("students");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
  const [isCreatingStudent, setIsCreatingStudent] = useState(false);
  const [isCreatingRecruiter, setIsCreatingRecruiter] = useState(false);

  const { toast } = useToast();

  const handleCreateAdmin = async () => {
    if (adminPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingAdmin(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        adminEmail,
        adminPassword
      );

      await addDoc(collection(db, "admins"), {
        email: adminEmail,
        createdAt: new Date(),
        role: "admin",
        uid: userCredential.user.uid,
      });

      toast({
        title: "Admin Created",
        description: `New admin with email ${adminEmail} has been created successfully.`,
      });

      setAdminEmail("");
      setAdminPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      let errorMessage = "Failed to create admin account";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email is already in use";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters";
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsCreatingAdmin(false);
    }
  };

  const handleStudentSubmit = async (data: any) => {
    setIsCreatingStudent(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await addDoc(collection(db, "students"), {
        ...data,
        uid: userCredential.user.uid,
        createdAt: new Date(),
        role: "student",
        status: "active",
      });

      toast({
        title: "Student Created",
        description: `Student ${data.firstName} ${data.lastName} has been registered successfully.`,
      });
    } catch (error: any) {
      let errorMessage = "Failed to create student account";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email is already in use";
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsCreatingStudent(false);
    }
  };

  const handleRecruiterSubmit = async (data: any) => {
    setIsCreatingRecruiter(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await addDoc(collection(db, "recruiters"), {
        ...data,
        uid: userCredential.user.uid,
        createdAt: new Date(),
        role: "recruiter",
        status: "active",
      });

      toast({
        title: "Recruiter Created",
        description: `${data.companyName} has been registered successfully.`,
      });
    } catch (error: any) {
      let errorMessage = "Failed to create recruiter account";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email is already in use";
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsCreatingRecruiter(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-10">
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 shadow-md">
          <h1 className="text-3xl font-extrabold text-center text-white py-3 -mb-1 bg-clip-text text-transparent">
            <Typewriter
              options={{
                strings: ["Welcome to Admin Panel", "Manage Users Efficiently"],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>

          <p className="text-center text-white mt-2 text-sm mb-1">
            Here you can create and manage student, recruiter, and admin accounts.
          </p>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              {activeTab === "students" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center"
                >
                  <Users className="h-6 w-6 mr-2" />
                  <h1 className="text-xl font-bold">Student Management</h1>
                </motion.div>
              )}
              {activeTab === "recruiters" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center"
                >
                  <Briefcase className="h-6 w-6 mr-2" />
                  <h1 className="text-xl font-bold">Recruiter Management</h1>
                </motion.div>
              )}
              {activeTab === "createAdmin" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center"
                >
                  <UserPlus className="h-6 w-6 mr-2" />
                  <h1 className="text-xl font-bold">Admin Creation</h1>
                </motion.div>
              )}
              {activeTab === "studentSignup" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center"
                >
                  <GraduationCap className="h-6 w-6 mr-2" />
                  <h1 className="text-xl font-bold">Student Registration</h1>
                </motion.div>
              )}
              {activeTab === "recruiterSignup" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center"
                >
                  <Building className="h-6 w-6 mr-2" />
                  <h1 className="text-xl font-bold">Recruiter Registration</h1>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 -mb-2">
          <div className="flex items-center justify-between">
            <Link to="/login" className="pb-2">
              <Button variant="outline" className="sm:mr-4" size="sm">
                <ChevronLeft className="h-4 w-4 mt-[0.18rem] -mr-1" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
            <div className="hidden sm:flex overflow-x-auto py-2 mx-auto">
              {[
                {
                  key: "studentSignup",
                  label: "Create Student Account",
                  icon: <GraduationCap className="mr-2 h-4 w-4" />,
                },
                {
                  key: "recruiterSignup",
                  label: "Create Recruiter Account",
                  icon: <Building className="mr-2 h-4 w-4" />,
                },
                {
                  key: "students",
                  label: "Manage Students",
                  icon: <Users className="mr-2 h-4 w-4" />,
                },
                {
                  key: "recruiters",
                  label: "Manage Recruiters",
                  icon: <Briefcase className="mr-2 h-4 w-4" />,
                },
                {
                  key: "createAdmin",
                  label: "Create Admin",
                  icon: <UserPlus className="mr-2 h-4 w-4" />,
                },
              ].map(({ key, label, icon }) => (
                <motion.button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`${
                    activeTab === key
                      ? "bg-indigo-50 text-indigo-700 border-indigo-600"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  } flex items-center px-4 py-2 text-sm font-medium rounded-md mr-2 border-b-2 border-transparent transition-all duration-150`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {icon} {label}
                </motion.button>
              ))}
            </div>

            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setActiveTab("studentSignup")}>
                    Create Student Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("recruiterSignup")}>
                    Create Recruiter Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("students")}>
                    Manage Students
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("recruiters")}>
                    Manage Recruiters
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("createAdmin")}>
                    Create Admin
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
              <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center h-40">
                    <div className="text-center">
                      <Users className="h-12 w-12 mx-auto text-indigo-500 mb-2" />
                      <h3 className="text-lg font-medium text-gray-900">
                        Student Management
                      </h3>
                      <p className="text-gray-500 mt-2">
                        Student management features coming soon. You'll be able
                        to view, edit and manage student profiles.
                      </p>
                    </div>
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
              className="space-y-6"
            >
              <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center h-40">
                    <div className="text-center">
                      <Briefcase className="h-12 w-12 mx-auto text-teal-500 mb-2" />
                      <h3 className="text-lg font-medium text-gray-900">
                        Recruiter Management
                      </h3>
                      <p className="text-gray-500 mt-2">
                        Recruiter management features coming soon. You'll be
                        able to view, edit and manage recruiter profiles.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : activeTab === "createAdmin" ? (
            <motion.div
              key="createAdmin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-lg rounded-xl overflow-hidden bg-white">
                <CardContent className="p-6">
                  <div className="max-w-md mx-auto">
                    <div className="text-center mb-6">
                      <UserPlus className="h-12 w-12 mx-auto text-indigo-500 mb-2" />
                      <h3 className="text-lg font-medium text-gray-900">
                        Create New Admin
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Add a new administrator to the system
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Admin Email
                        </Label>
                        <div className="relative">
                          <Input
                            id="email"
                            type="email"
                            placeholder="admin@example.com"
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                            className="h-10 pl-3"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            className="h-10 pl-3 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="h-10 pl-3 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="pt-2"
                      >
                        <Button
                          className="w-full h-10 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                          onClick={handleCreateAdmin}
                          disabled={
                            !adminEmail || !adminPassword || !confirmPassword || isCreatingAdmin
                          }
                        >
                          {isCreatingAdmin ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            <>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Create Admin Account
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : activeTab === "studentSignup" ? (
            <motion.div
              key="studentSignup"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-lg rounded-xl overflow-hidden bg-white">
                <CardContent className="p-6">
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-6">
                      <GraduationCap className="h-12 w-12 mx-auto text-blue-500 mb-2" />
                      <h3 className="text-lg font-medium text-gray-900">
                        Student Registration Form
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Create a new student account
                      </p>
                    </div>

                    <SignupStudent
                      onSubmit={handleStudentSubmit}
                      isSubmitting={isCreatingStudent}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="recruiterSignup"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-lg rounded-xl overflow-hidden bg-white">
                <CardContent className="p-6">
                  <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-6">
                      <Building className="h-12 w-12 mx-auto text-purple-500 mb-2" />
                      <h3 className="text-lg font-medium text-gray-900">
                        Recruiter Registration Form
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Create a new recruiter account
                      </p>
                    </div>

                    <SignupRecruiter
                      onSubmit={handleRecruiterSubmit}
                      isSubmitting={isCreatingRecruiter}
                    />
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