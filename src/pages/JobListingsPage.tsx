// import {
//   Briefcase,
//   MapPin,
//   Clock,
//   DollarSign,
//   BookOpen,
//   CheckCircle,
//   ChevronDown,
//   User,
//   Send,
//   AlertCircle,
//   Clock as PendingIcon,
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { motion, AnimatePresence } from "framer-motion";
// import { TypeAnimation } from "react-type-animation";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/landing/Footer";
// import { useAuth } from "@/context/AuthContext";

// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   addDoc,
//   serverTimestamp,
//   doc,
//   getDoc,
//   onSnapshot,
// } from "firebase/firestore";
// import { db, auth } from "@/backend/FirebaseConfig";

// const FormItem = ({ children }: { children: React.ReactNode }) => (
//   <div className="flex flex-col gap-1">{children}</div>
// );

// const FormLabel = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => <label className={`text-gray-600 ${className || ""}`}>{children}</label>;

// const JobListingsPage = () => {
//   const { currentUser } = useAuth();
//   const [expandedJob, setExpandedJob] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<
//     "available" | "applied" | "profile"
//   >("available");
//   const [showApplicationForm, setShowApplicationForm] = useState<string | null>(
//     null
//   );
//   const [internshipCount, setInternshipCount] = useState("0");
//   const [internshipMonths, setInternshipMonths] = useState("0");
//   const [hasProjects, setHasProjects] = useState("No");
//   const [projects, setProjects] = useState([
//     { link: "", description: "" },
//     { link: "", description: "" },
//     { link: "", description: "" },
//   ]);
//   const [jobs, setJobs] = useState<any[]>([]);
//   const [applications, setApplications] = useState<any[]>([]);
//   const [studentProfile, setStudentProfile] = useState<any>(null);
//   const [loading, setLoading] = useState({
//     jobs: true,
//     applications: true,
//     profile: true,
//   });

//   // Fetch student profile and applications
//   useEffect(() => {
//     if (!currentUser) return;

//     const fetchData = async () => {
//       try {
//         // Fetch student profile
//         const studentRef = doc(db, "student", currentUser.uid);
//         const studentSnap = await getDoc(studentRef);

//         if (studentSnap.exists()) {
//           setStudentProfile(studentSnap.data());
//           localStorage.setItem('studentProfile', JSON.stringify(studentSnap.data()));
//         }

//         // Fetch applications for this student
//         const applicationsQuery = query(
//           collection(db, "applications"),
//           where("studentId", "==", currentUser.uid)
//         );
//         const unsubscribeApplications = onSnapshot(applicationsQuery, (snapshot) => {
//           const apps = snapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//           }));
//           setApplications(apps);
//           setLoading(prev => ({ ...prev, applications: false }));
//         });

//         return () => unsubscribeApplications();
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(prev => ({ ...prev, profile: false }));
//       }
//     };

//     fetchData();
//   }, [currentUser]);

//   // Fetch active jobs from active recruiters
//   useEffect(() => {
//     if (!currentUser) return;

//     const q = query(
//       collection(db, "jobPosts"),
//       where("status", "==", "active"),
//       where("recruiterStatus", "==", "active")
//     );

//     const unsubscribeJobs = onSnapshot(q, (querySnapshot) => {
//       const jobsData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//         createdAt: doc.data().createdAt?.toDate() || new Date(),
//       }));
//       setJobs(jobsData);
//       setLoading(prev => ({ ...prev, jobs: false }));
//     });

//     return () => unsubscribeJobs();
//   }, [currentUser]);

//   const handleApply = (jobId: string) => {
//     setShowApplicationForm(jobId);
//   };

//   const handleSubmitApplication = async (jobId: string) => {
//     try {
//       const user = auth.currentUser;
//       if (!user) throw new Error("Not authenticated");

//       const job = jobs.find((j) => j.id === jobId);
//       if (!job) throw new Error("Job not found");

//       const applicationData = {
//         jobId,
//         jobTitle: job.jobTitle,
//         companyName: job.companyName,
//         studentId: user.uid,
//         studentName: `${studentProfile?.firstName} ${studentProfile?.lastName}`,
//         studentEmail: studentProfile?.email,
//         status: "pending",
//         appliedAt: serverTimestamp(),
//         internshipCount,
//         internshipMonths,
//         hasProjects,
//         projects: hasProjects === "Yes" ? projects : [],
//         studentProfile: {
//           ...studentProfile,
//           password: undefined,
//           confirmPassword: undefined,
//         },
//       };

//       // Add to applications collection
//       const applicationRef = await addDoc(collection(db, "applications"), applicationData);

//       // Add to job's applicants subcollection
//       await addDoc(collection(db, "jobPosts", jobId, "applicants"), {
//         studentId: user.uid,
//         applicationId: applicationRef.id,
//         status: "pending",
//         appliedAt: serverTimestamp(),
//       });

//       setShowApplicationForm(null);
//       // Reset form fields
//       setInternshipCount("0");
//       setInternshipMonths("0");
//       setHasProjects("No");
//       setProjects([
//         { link: "", description: "" },
//         { link: "", description: "" },
//         { link: "", description: "" },
//       ]);

//     } catch (error) {
//       console.error("Error submitting application:", error);
//     }
//   };

//   const toggleExpand = (jobId: string) => {
//     setExpandedJob(expandedJob === jobId ? null : jobId);
//   };

//   const handleProjectChange = (index: number, field: string, value: string) => {
//     const newProjects = [...projects];
//     newProjects[index] = { ...newProjects[index], [field]: value };
//     setProjects(newProjects);
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "selected":
//         return (
//           <Badge className="bg-green-100 text-green-800 text-xs sm:text-sm">
//             <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
//             Selected
//           </Badge>
//         );
//       case "rejected":
//         return (
//           <Badge className="bg-red-100 text-red-800 text-xs sm:text-sm">
//             <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
//             Rejected
//           </Badge>
//         );
//       default:
//         return (
//           <Badge className="bg-yellow-100 text-yellow-800 text-xs sm:text-sm">
//             <PendingIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
//             Pending
//           </Badge>
//         );
//     }
//   };

//   const getStatusMessage = (status: string) => {
//     switch (status) {
//       case "selected":
//         return (
//           <div className="bg-green-50 p-3 rounded-lg border border-green-100 mt-3">
//             <p className="text-green-700 text-sm">
//               You have been selected! The recruiter will contact you via your
//               email ID or registered phone number.
//             </p>
//           </div>
//         );
//       case "rejected":
//         return (
//           <div className="bg-red-50 p-3 rounded-lg border border-red-100 mt-3">
//             <p className="text-red-700 text-sm">
//               ❌ You have not been selected for this position.
//             </p>
//           </div>
//         );
//       default:
//         return (
//           <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mt-3">
//             <p className="text-blue-700 text-sm">
//               🕐 Your application is pending review by the recruiter.
//             </p>
//           </div>
//         );
//     }
//   };

//   const availableJobs = jobs.filter(
//     (job) => !applications.some((app) => app.jobId === job.id)
//   );
//   const appliedJobs = applications.map((app) => {
//     const job = jobs.find((j) => j.id === app.jobId);
//     return { ...app, ...job };
//   });

//   const branches = [
//     "Computer Science & Engineering",
//     "Electrical Engineering",
//     "Mechanical Engineering",
//     "Civil Engineering",
//     "Electronics & Communication",
//     "Information Technology",
//   ];

//   const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
//   const backlogOptions = ["0", "1", "2", "3", "4", "5+"];

//   const getProfileImage = () => {
//     return studentProfile?.gender === "Female"
//       ? "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
//       : "https://cdn-icons-png.flaticon.com/512/4140/4140047.png";
//   };

//   if (loading.profile || !studentProfile) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//         <Navbar />
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <Navbar />

//       <div className="max-w-6xl mx-auto px-4 sm:px-6">
//         <div className="text-center mb-6 sm:mb-8">
//           <h1 className="text-2xl sm:text-4xl pt-20 font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-1 sm:pt-20">
//             <TypeAnimation
//               sequence={[
//                 "Your Dream Career Awaits",
//                 1000,
//                 "Find Your Perfect Job Match",
//                 1000,
//                 "Launch Your Professional Journey",
//                 1000,
//               ]}
//               wrapper="span"
//               speed={50}
//               style={{ display: "inline-block" }}
//               repeat={Infinity}
//             />
//           </h1>
//         </div>

//         {/* Tab Navigation */}
//         <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
//           <Button
//             variant={activeTab === "available" ? "default" : "outline"}
//             onClick={() => setActiveTab("available")}
//             className="gap-2 text-xs sm:text-sm"
//             size="sm"
//           >
//             <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
//             Available Jobs ({availableJobs.length})
//           </Button>
//           <Button
//             variant={activeTab === "applied" ? "default" : "outline"}
//             onClick={() => setActiveTab("applied")}
//             className="gap-2 text-xs sm:text-sm"
//             size="sm"
//           >
//             <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
//             My Applications ({appliedJobs.length})
//           </Button>
//           <Button
//             variant={activeTab === "profile" ? "default" : "outline"}
//             onClick={() => setActiveTab("profile")}
//             className="gap-2 text-xs sm:text-sm"
//             size="sm"
//           >
//             <User className="h-3 w-3 sm:h-4 sm:w-4" />
//             Your Profile
//           </Button>
//         </div>

//         {/* Available Jobs Section */}
//         <AnimatePresence mode="wait">
//           {activeTab === "available" && (
//             <motion.section
//               key="available"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="space-y-3 sm:space-y-4"
//             >
//               {loading.jobs ? (
//                 <div className="flex justify-center items-center h-40">
//                   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//                 </div>
//               ) : availableJobs.length > 0 ? (
//                 availableJobs.map((job) => (
//                   <Card
//                     key={job.id}
//                     className="border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white/90 backdrop-blur-sm"
//                   >
//                     <div className="p-4 sm:p-6">
//                       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
//                         <div>
//                           <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
//                             {job.jobTitle}
//                           </h3>
//                           <p className="text-sm sm:text-base text-gray-600">
//                             {job.companyName}
//                           </p>
//                         </div>
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
//                           <Button
//                             variant="default"
//                             size="sm"
//                             className="text-xs sm:text-sm"
//                             onClick={() => handleApply(job.id)}
//                           >
//                             Apply Now
//                           </Button>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-800"
//                             onClick={() => toggleExpand(job.id)}
//                           >
//                             {expandedJob === job.id
//                               ? "Hide Details"
//                               : "View Details"}
//                             <ChevronDown
//                               className={`h-3 w-3 sm:h-4 sm:w-4 ml-1 transition-transform ${
//                                 expandedJob === job.id ? "rotate-180" : ""
//                               }`}
//                             />
//                           </Button>
//                         </div>
//                       </div>

//                       {/* Application Form */}
//                       {showApplicationForm === job.id && (
//                         <motion.div
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: "auto" }}
//                           exit={{ opacity: 0, height: 0 }}
//                           transition={{ duration: 0.2 }}
//                           className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100"
//                         >
//                           <h4 className="font-medium text-sm sm:text-base text-blue-800 mb-3">
//                             Additional Application Information
//                           </h4>
//                           <p className="text-xs sm:text-sm text-blue-600 mb-4">
//                             By default, your saved profile information will also
//                             be sent to the recruiter along with this
//                             application.
//                           </p>

//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                             <div>
//                               <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                                 How many internships have you done?
//                               </label>
//                               <select
//                                 value={internshipCount}
//                                 onChange={(e) =>
//                                   setInternshipCount(e.target.value)
//                                 }
//                                 className="w-full text-xs sm:text-sm h-8 sm:h-9 border border-gray-300 rounded-md px-2"
//                               >
//                                 {[0, 1, 2, 3, 4, 5].map((num) => (
//                                   <option key={num} value={num}>
//                                     {num}
//                                   </option>
//                                 ))}
//                               </select>
//                             </div>

//                             <div>
//                               <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                                 Total internship experience (in months)
//                               </label>
//                               <select
//                                 value={internshipMonths}
//                                 onChange={(e) =>
//                                   setInternshipMonths(e.target.value)
//                                 }
//                                 className="w-full text-xs sm:text-sm h-8 sm:h-9 border border-gray-300 rounded-md px-2"
//                               >
//                                 {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
//                                   (num) => (
//                                     <option key={num} value={num}>
//                                       {num}
//                                     </option>
//                                   )
//                                 )}
//                               </select>
//                             </div>
//                           </div>
// ////////////////////
//                           <div className="mb-4">
//                             <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
//                               Have you worked on any projects?
//                             </label>
//                             <div className="flex gap-4">
//                               <label className="inline-flex items-center">
//                                 <input
//                                   type="radio"
//                                   name="hasProjects"
//                                   value="Yes"
//                                   checked={hasProjects === "Yes"}
//                                   onChange={() => setHasProjects("Yes")}
//                                   className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600"
//                                 />
//                                 <span className="ml-2 text-xs sm:text-sm">
//                                   Yes
//                                 </span>
//                               </label>
//                               <label className="inline-flex items-center">
//                                 <input
//                                   type="radio"
//                                   name="hasProjects"
//                                   value="No"
//                                   checked={hasProjects === "No"}
//                                   onChange={() => setHasProjects("No")}
//                                   className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600"
//                                 />
//                                 <span className="ml-2 text-xs sm:text-sm">
//                                   No
//                                 </span>
//                               </label>
//                             </div>
//                           </div>

//                           {hasProjects === "Yes" && (
//                             <div className="space-y-3 mb-4">
//                               {projects.map((project, index) => (
//                                 <div
//                                   key={index}
//                                   className="bg-white p-3 rounded border border-gray-200"
//                                 >
//                                   <h5 className="text-xs sm:text-sm font-medium mb-2">
//                                     Project {index + 1}
//                                   </h5>
//                                   <div className="space-y-2">
//                                     <div>
//                                       <label className="block text-xs text-gray-500 mb-1">
//                                         Link (optional)
//                                       </label>
//                                       <input
//                                         type="text"
//                                         value={project.link}
//                                         onChange={(e) =>
//                                           handleProjectChange(
//                                             index,
//                                             "link",
//                                             e.target.value
//                                           )
//                                         }
//                                         className="w-full text-xs sm:text-sm h-8 border border-gray-300 rounded-md px-2"
//                                         placeholder="https://example.com/project"
//                                       />
//                                     </div>
//                                     <div>
//                                       <label className="block text-xs text-gray-500 mb-1">
//                                         Description (optional)
//                                       </label>
//                                       <textarea
//                                         value={project.description}
//                                         onChange={(e) =>
//                                           handleProjectChange(
//                                             index,
//                                             "description",
//                                             e.target.value
//                                           )
//                                         }
//                                         className="w-full text-xs sm:text-sm h-16 border border-gray-300 rounded-md px-2 py-1"
//                                         placeholder="Brief description of the project"
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           )}

//                           <div className="flex justify-end gap-2">
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="text-xs sm:text-sm"
//                               onClick={() => setShowApplicationForm(null)}
//                             >
//                               Cancel
//                             </Button>
//                             <Button
//                               variant="default"
//                               size="sm"
//                               className="text-xs sm:text-sm"
//                               onClick={() => handleSubmitApplication(job.id)}
//                             >
//                               Submit Application
//                             </Button>
//                           </div>
//                         </motion.div>
//                       )}

//                       <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
//                         <div className="flex items-center text-gray-700">
//                           <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-indigo-500" />
//                           <span>{job.location}</span>
//                         </div>
//                         <div className="flex items-center text-gray-700">
//                           <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-green-500" />
//                           <span>{job.salaryRange}</span>
//                         </div>
//                         <div className="flex items-center text-gray-700">
//                           <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-yellow-500" />
//                           <span>
//                             Posted:{" "}
//                             {new Date(
//                               job.createdAt?.toDate()
//                             ).toLocaleDateString()}
//                           </span>
//                         </div>
//                       </div>

//                       <AnimatePresence>
//                         {expandedJob === job.id &&
//                           showApplicationForm !== job.id && (
//                             <motion.div
//                               initial={{ opacity: 0, height: 0 }}
//                               animate={{ opacity: 1, height: "auto" }}
//                               exit={{ opacity: 0, height: 0 }}
//                               transition={{ duration: 0.2 }}
//                               className="mt-4 sm:mt-6"
//                             >
//                               <div className="border-t border-gray-200 pt-4 sm:pt-6">
//                                 <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
//                                   <h4 className="font-medium text-sm sm:text-base text-gray-800 mb-2 flex items-center">
//                                     <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-500" />
//                                     Job Description
//                                   </h4>
//                                   <p className="text-xs sm:text-sm text-gray-600">
//                                     {job.jobDescription}
//                                   </p>
//                                 </div>

//                                 <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
//                                   <h4 className="font-medium text-sm sm:text-base text-gray-800 mb-2">
//                                     Skills Required
//                                   </h4>
//                                   <div className="flex flex-wrap gap-1 sm:gap-2">
//                                     {job.skillsRequired.map(
//                                       (skill: string, index: number) => (
//                                         <Badge
//                                           key={index}
//                                           variant="secondary"
//                                           className="text-xs sm:text-sm bg-indigo-100 text-indigo-700"
//                                         >
//                                           {skill}
//                                         </Badge>
//                                       )
//                                     )}
//                                   </div>
//                                 </div>

//                                 <div className="mt-4 sm:mt-6">
//                                   <h4 className="font-medium text-sm sm:text-base text-gray-800 mb-2">
//                                     Eligibility Criteria
//                                   </h4>
//                                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
//                                     <div className="bg-gray-50 p-2 sm:p-3 rounded">
//                                       <span className="font-medium">
//                                         Min CGPA:
//                                       </span>{" "}
//                                       {job.minCGPA}
//                                     </div>
//                                     <div className="bg-gray-50 p-2 sm:p-3 rounded">
//                                       <span className="font-medium">
//                                         10th %:
//                                       </span>{" "}
//                                       {job.minTenthPercentage}%
//                                     </div>
//                                     <div className="bg-gray-50 p-2 sm:p-3 rounded">
//                                       <span className="font-medium">
//                                         12th %:
//                                       </span>{" "}
//                                       {job.minTwelfthPercentage}%
//                                     </div>
//                                     <div className="bg-gray-50 p-2 sm:p-3 rounded">
//                                       <span className="font-medium">
//                                         Max Backlogs:
//                                       </span>{" "}
//                                       {job.maxBacklogs}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </motion.div>
//                           )}
//                       </AnimatePresence>
//                     </div>
//                   </Card>
//                 ))
//               ) : (
//                 <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg">
//                   <p className="text-sm sm:text-base text-gray-500">
//                     No available jobs at the moment. Please check back later.
//                   </p>
//                 </div>
//               )}
//             </motion.section>
//           )}

//           {/* My Applications Section - Kept exactly as provided */}
//           {activeTab === "applied" && (
//             <motion.section
//               key="applied"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="space-y-3 sm:space-y-4"
//             >
//               {loading.applications ? (
//                 <div className="flex justify-center items-center h-40">
//                   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//                 </div>
//               ) : appliedJobs.length > 0 ? (
//                 appliedJobs.map((application) => (
//                   <Card
//                     key={application.id}
//                     className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
//                   >
//                     <div className="p-4 sm:p-6">
//                       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
//                         <div>
//                           <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
//                             {application.jobTitle}
//                           </h3>
//                           <p className="text-sm sm:text-base text-gray-600">
//                             {application.companyName}
//                           </p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           {getStatusBadge(application.status)}
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             className="text-xs sm:text-sm text-gray-500 hover:text-gray-700"
//                             onClick={() => toggleExpand(application.jobId)}
//                           >
//                             {expandedJob === application.jobId
//                               ? "Hide Details"
//                               : "View Details"}
//                             <ChevronDown
//                               className={`h-3 w-3 sm:h-4 sm:w-4 ml-1 transition-transform ${
//                                 expandedJob === application.jobId
//                                   ? "rotate-180"
//                                   : ""
//                               }`}
//                             />
//                           </Button>
//                         </div>
//                       </div>

//                       <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
//                         <div className="flex items-center text-gray-700">
//                           <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-indigo-500" />
//                           <span>{application.location}</span>
//                         </div>
//                         <div className="flex items-center text-gray-700">
//                           <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-green-500" />
//                           <span>{application.salaryRange}</span>
//                         </div>
//                         <div className="flex items-center text-gray-700">
//                           <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-yellow-500" />
//                           <span>
//                             Applied on:{" "}
//                             {application.appliedAt
//                               ?.toDate()
//                               .toLocaleDateString()}
//                           </span>
//                         </div>
//                       </div>

//                       <AnimatePresence>
//                         {expandedJob === application.jobId && (
//                           <motion.div
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: "auto" }}
//                             exit={{ opacity: 0, height: 0 }}
//                             transition={{ duration: 0.2 }}
//                             className="mt-4 sm:mt-6"
//                           >
//                             <div className="border-t border-gray-200 pt-4 sm:pt-6">
//                               {getStatusMessage(application.status)}

//                               <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
//                                 <h4 className="font-medium text-sm sm:text-base text-gray-800 mb-2 flex items-center">
//                                   <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-500" />
//                                   Job Description
//                                 </h4>
//                                 <p className="text-xs sm:text-sm text-gray-600">
//                                   {application.jobDescription}
//                                 </p>
//                               </div>

//                               <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
//                                 <h4 className="font-medium text-sm sm:text-base text-gray-800 mb-2">
//                                   Skills Required
//                                 </h4>
//                                 <div className="flex flex-wrap gap-1 sm:gap-2">
//                                   {application.skillsRequired?.map(
//                                     (skill: string, index: number) => (
//                                       <Badge
//                                         key={index}
//                                         variant="secondary"
//                                         className="text-xs sm:text-sm"
//                                       >
//                                         {skill}
//                                       </Badge>
//                                     )
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>
//                   </Card>
//                 ))
//               ) : (
//                 <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg">
//                   <p className="text-sm sm:text-base text-gray-500">
//                     You haven't applied to any jobs yet.
//                   </p>
//                   <Button
//                     variant="outline"
//                     className="mt-3 sm:mt-4 text-xs sm:text-sm"
//                     size="sm"
//                     onClick={() => setActiveTab("available")}
//                   >
//                     Browse Available Jobs
//                   </Button>
//                 </div>
//               )}
//             </motion.section>
//           )}

//           {/* Your Profile Section */}
//           {activeTab === "profile" && (
//             <motion.section
//               key="profile"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="space-y-3 sm:space-y-4"
//             >
//               <Card className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
//                 <div className="p-4 sm:p-6">
//                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
//                     <div className="flex items-center gap-4">
//                       <img
//                         src={getProfileImage()}
//                         alt="Profile"
//                         className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-indigo-100"
//                       />
//                       <div>
//                         <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
//                           {studentProfile.firstName} {studentProfile.middleName}{" "}
//                           {studentProfile.lastName}
//                         </h3>
//                         <p className="text-sm sm:text-base text-gray-600">
//                           {studentProfile.branch}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                     <FormItem>
//                       <FormLabel className="text-xs sm:text-sm">
//                         First Name
//                       </FormLabel>
//                       <div className="text-sm sm:text-base">
//                         {studentProfile.firstName}
//                       </div>
//                     </FormItem>

//                     <FormItem>
//                       <FormLabel className="text-xs sm:text-sm">
//                         Middle Name
//                       </FormLabel>
//                       <div className="text-sm sm:text-base">
//                         {studentProfile.middleName || "-"}
//                       </div>
//                     </FormItem>

//                     <FormItem>
//                       <FormLabel className="text-xs sm:text-sm">
//                         Last Name
//                       </FormLabel>
//                       <div className="text-sm sm:text-base">
//                         {studentProfile.lastName}
//                       </div>
//                     </FormItem>

//                     <FormItem>
//                       <FormLabel className="text-xs sm:text-sm">
//                         Gender
//                       </FormLabel>
//                       <div className="text-sm sm:text-base">
//                         {studentProfile.gender}
//                       </div>
//                     </FormItem>

//                     <FormItem>
//                       <FormLabel className="text-xs sm:text-sm">
//                         Phone
//                       </FormLabel>
//                       <div className="text-sm sm:text-base">
//                         {studentProfile.phone}
//                       </div>
//                     </FormItem>

//                     <FormItem>
//                       <FormLabel className="text-xs sm:text-sm">
//                         Email
//                       </FormLabel>
//                       <div className="text-sm sm:text-base">
//                         {studentProfile.email}
//                       </div>
//                     </FormItem>

//                     <FormItem>
//                       <FormLabel className="text-xs sm:text-sm">
//                         Date of Birth
//                       </FormLabel>
//                       <div className="text-sm sm:text-base">
//                         {new Date(studentProfile.dob).toLocaleDateString()}
//                       </div>
//                     </FormItem>

//                     <FormItem>
//                       <FormLabel className="text-xs sm:text-sm">
//                         10th %
//                       </FormLabel>
//                       <div className="text-sm sm:text-base">
//                         {studentProfile.tenthPercentage}%
//                       </div>
//                     </FormItem>

//                     <FormItem>
//                       <FormLabel className="text-xs sm:text-sm">
//                         12th %
//                       </FormLabel>
//                       <div className="text-sm sm:text-base">
//                         {studentProfile.twelfthPercentage}%
//                       </div>
//                     </FormItem>

//                     <FormItem>
//                       <FormLabel className="text-xs sm:text-sm">CGPA</FormLabel>
//                       <div className="text-sm sm:text-base">
//                         {studentProfile.cgpa}/10
//                       </div>
//                     </FormItem>

//                     <FormItem>
//                       <FormLabel className="text-xs sm:text-sm">
//                         Branch
//                       </FormLabel>
//                       <div className="text-sm sm:text-base">
//                         {studentProfile.branch}
//                       </div>
//                     </FormItem>

//                     <FormItem>
//                       <FormLabel className="text-xs sm:text-sm">
//                         Semester
//                       </FormLabel>
//                       <div className="text-sm sm:text-base">
//                         {studentProfile.semester}
//                       </div>
//                     </FormItem>

//                     <FormItem>
//                       <FormLabel className="text-xs sm:text-sm">
//                         Backlogs
//                       </FormLabel>
//                       <div className="text-sm sm:text-base">
//                         {studentProfile.backlogs}
//                       </div>
//                     </FormItem>
//                   </div>
//                 </div>
//               </Card>
//             </motion.section>
//           )}
//         </AnimatePresence>
//       </div>
//       <div className="mt-8 sm:mt-12">
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default JobListingsPage;

import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  BookOpen,
  CheckCircle,
  ChevronDown,
  User,
  Send,
  AlertCircle,
  Clock as PendingIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import { useAuth } from "@/context/AuthContext";
import React, {  useCallback } from 'react';

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "@/backend/FirebaseConfig";

import { toast } from "react-hot-toast";

const FormItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-1">{children}</div>
);

const FormLabel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <label className={`text-gray-600 ${className || ""}`}>{children}</label>;

const JobListingsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [studentProfile, setStudentProfile] = useState(null);
  const [loading, setLoading] = useState({
    jobs: true,
    applications: true,
    profile: true,
  });
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("available");
  const [expandedJob, setExpandedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(null);
  const [hasProjects, setHasProjects] = useState("No");
  const [projects, setProjects] = useState([{ link: "", description: "" }]);
  const { currentUser } = useAuth();

  const toggleExpand = (jobId) => {
    setExpandedJob((prevId) => (prevId === jobId ? null : jobId));
    setShowApplicationForm(null); // Close application form if another job is expanded
  };

  const handleProjectChange = (index, name, value) => {
    const newProjects = [...projects];
    newProjects[index][name] = value;
    setProjects(newProjects);
  };

  const addProjectField = () => {
    setProjects([...projects, { link: "", description: "" }]);
  };

  const removeProjectField = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
            Pending
          </Badge>
        );
      case "reviewed":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            Reviewed
          </Badge>
        );
      case "shortlisted":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Shortlisted
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-700">
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case "pending":
        return (
          <p className="text-sm text-gray-600 mb-2">
            Your application is currently pending review.
          </p>
        );
      case "reviewed":
        return (
          <p className="text-sm text-gray-600 mb-2">
            Your application has been reviewed. We will update you on the next
            steps.
          </p>
        );
      case "shortlisted":
        return (
          <p className="text-sm text-green-600 font-medium mb-2">
            Congratulations! You have been shortlisted for the next round.
          </p>
        );
      case "rejected":
        return (
          <p className="text-sm text-red-600 mb-2">
            We regret to inform you that your application was not selected.
          </p>
        );
      default:
        return (
          <p className="text-sm text-gray-600 mb-2">
            Application status: {status}
          </p>
        );
    }
  };

  const getProfileImage = () => {
    return studentProfile?.profileImage || "/default-profile.png"; // Fallback image
  };

  const fetchJobs = useCallback(() => {
    if (!currentUser?.uid) {
      setLoading((prev) => ({ ...prev, jobs: false }));
      return;
    }

    const jobsQuery = query(
      collection(db, "jobs"),
      where("isActive", "==", true)
    );
    const unsubscribeJobs = onSnapshot(
      jobsQuery,
      (snapshot) => {
        const fetchedJobs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(fetchedJobs);
        setLoading((prev) => ({ ...prev, jobs: false }));
      },
      (error) => {
        console.error("Error fetching jobs:", error);
        setError("Failed to load job listings.");
        setLoading((prev) => ({ ...prev, jobs: false }));
        toast.error("Failed to load job listings.");
      }
    );
    return unsubscribeJobs;
  }, [currentUser]);

  const fetchAppliedJobs = useCallback(() => {
    if (!currentUser?.uid) {
      setLoading((prev) => ({ ...prev, applications: false }));
      return;
    }

    const applicationsQuery = query(
      collection(db, "applications"),
      where("studentId", "==", currentUser.uid)
    );
    const unsubscribeApplications = onSnapshot(
      applicationsQuery,
      async (snapshot) => {
        const fetchedApplications = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const applicationData = { id: doc.id, ...doc.data() };
            const jobRef = doc.data().jobRef;
            if (jobRef) {
              try {
                const jobSnap = await getDoc(jobRef);
                if (jobSnap.exists()) {
                  return {
                    ...applicationData,
                    ...jobSnap.data(),
                    jobId: jobSnap.id,
                  };
                }
              } catch (error) {
                console.error("Error fetching applied job details:", error);
              }
            }
            return applicationData;
          })
        );
        setAppliedJobs(fetchedApplications.filter((app) => app.jobTitle)); // Ensure job details are fetched
        setLoading((prev) => ({ ...prev, applications: false }));
      },
      (error) => {
        console.error("Error fetching applied jobs:", error);
        setError("Failed to load your applications.");
        setLoading((prev) => ({ ...prev, applications: false }));
        toast.error("Failed to load your applications.");
      }
    );
    return unsubscribeApplications;
  }, [currentUser]);

  const fetchProfile = useCallback(() => {
    if (!currentUser?.uid) {
      setLoading((prev) => ({ ...prev, profile: false }));
      return;
    }

    const profileDocRef = doc(db, "profiles", currentUser.uid);
    getDoc(profileDocRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          setStudentProfile(docSnap.data());
        } else {
          setError("Profile not found.");
          toast.error("Profile not found.");
        }
        setLoading((prev) => ({ ...prev, profile: false }));
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setError("Failed to load your profile.");
        setLoading((prev) => ({ ...prev, profile: false }));
        toast.error("Failed to load your profile.");
      });
  }, [currentUser]);

  useEffect(() => {
    let unsubscribeJobs, unsubscribeApplications;

    if (currentUser?.uid) {
      unsubscribeJobs = fetchJobs();
      unsubscribeApplications = fetchAppliedJobs();
      fetchProfile();
    } else {
      // If no user, immediately set loading to false for all sections
      setLoading({ jobs: false, applications: false, profile: false });
    }

    return () => {
      if (unsubscribeJobs) {
        unsubscribeJobs();
      }
      if (unsubscribeApplications) {
        unsubscribeApplications();
      }
    };
  }, [currentUser, fetchJobs, fetchAppliedJobs, fetchProfile]);

  const handleSubmitApplication = async (jobId) => {
    if (!currentUser?.uid || !studentProfile) {
      toast.error(
        "You must be logged in and your profile must be loaded to apply."
      );
      return;
    }

    try {
      const jobRef = doc(db, "jobs", jobId);
      await addDoc(collection(db, "applications"), {
        studentId: currentUser.uid,
        jobRef: jobRef,
        jobTitle: jobs.find((job) => job.id === jobId)?.jobTitle,
        companyName: jobs.find((job) => job.id === jobId)?.companyName,
        location: jobs.find((job) => job.id === jobId)?.location,
        salaryRange: jobs.find((job) => job.id === jobId)?.salaryRange,
        jobDescription: jobs.find((job) => job.id === jobId)?.jobDescription,
        skillsRequired: jobs.find((job) => job.id === jobId)?.skillsRequired,
        hasProjects: hasProjects,
        projects: hasProjects === "Yes" ? projects : [],
        appliedAt: serverTimestamp(),
        status: "pending", // Initial status
      });
      toast.success("Application submitted successfully!");
      setShowApplicationForm(null); // Close the form after submission
      // Optionally, refetch applied jobs to update the list
      // fetchAppliedJobs(); // This might cause unnecessary re-renders, onSnapshot should handle it
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    }
  };

  if (loading.jobs || loading.applications || loading.profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 font-semibold">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="available">Available Jobs</option>
            <option value="applied">My Applications</option>
            <option value="profile">My Profile</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="flex space-x-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("available")}
              className={`${
                activeTab === "available"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-500 hover:text-gray-700"
              } px-3 py-2 font-medium text-sm rounded-md`}
            >
              Available Jobs
            </button>
            <button
              onClick={() => setActiveTab("applied")}
              className={`${
                activeTab === "applied"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-500 hover:text-gray-700"
              } px-3 py-2 font-medium text-sm rounded-md`}
            >
              My Applications
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`${
                activeTab === "profile"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-500 hover:text-gray-700"
              } px-3 py-2 font-medium text-sm rounded-md`}
            >
              My Profile
            </button>
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {activeTab === "available" && (
          <motion.section
            key="available"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {loading.jobs ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
                <Card
                  key={job.id}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                          {job.jobTitle}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600">
                          {job.companyName}
                        </p>
                      </div>
                      <Button
                        variant="default"
                        size="sm"
                        className="text-xs sm:text-sm"
                        onClick={() => setShowApplicationForm(job.id)}
                      >
                        Apply Now
                      </Button>
                    </div>

                    {showApplicationForm === job.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 border-t border-gray-200 pt-4"
                      >
                        <div className="mb-4">
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Have you worked on any projects?
                          </label>
                          <div className="flex gap-4">
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="hasProjects"
                                value="Yes"
                                checked={hasProjects === "Yes"}
                                onChange={() => setHasProjects("Yes")}
                                className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600"
                              />
                              <span className="ml-2 text-xs sm:text-sm">
                                Yes
                              </span>
                            </label>
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                name="hasProjects"
                                value="No"
                                checked={hasProjects === "No"}
                                onChange={() => setHasProjects("No")}
                                className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600"
                              />
                              <span className="ml-2 text-xs sm:text-sm">
                                No
                              </span>
                            </label>
                          </div>
                        </div>

                        {hasProjects === "Yes" && (
                          <div className="space-y-3 mb-4">
                            {projects.map((project, index) => (
                              <div
                                key={index}
                                className="bg-white p-3 rounded border border-gray-200"
                              >
                                <h5 className="text-xs sm:text-sm font-medium mb-2">
                                  Project {index + 1}
                                </h5>
                                <div className="space-y-2">
                                  <div>
                                    <label className="block text-xs text-gray-500 mb-1">
                                      Link (optional)
                                    </label>
                                    <input
                                      type="text"
                                      value={project.link}
                                      onChange={(e) =>
                                        handleProjectChange(
                                          index,
                                          "link",
                                          e.target.value
                                        )
                                      }
                                      className="w-full text-xs sm:text-sm h-8 border border-gray-300 rounded-md px-2"
                                      placeholder="https://example.com/project"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-500 mb-1">
                                      Description (optional)
                                    </label>
                                    <textarea
                                      value={project.description}
                                      onChange={(e) =>
                                        handleProjectChange(
                                          index,
                                          "description",
                                          e.target.value
                                        )
                                      }
                                      className="w-full text-xs sm:text-sm h-16 border border-gray-300 rounded-md px-2 py-1"
                                      placeholder="Brief description of the project"
                                    />
                                  </div>
                                  {projects.length > 1 && (
                                    <Button
                                      variant="ghost"
                                      size="xs"
                                      className="text-red-500 hover:bg-red-50"
                                      onClick={() => removeProjectField(index)}
                                    >
                                      Remove
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                            {projects.length < 3 && ( // Limit to a reasonable number of projects
                              <Button
                                variant="outline"
                                size="xs"
                                className="text-indigo-500 hover:bg-indigo-50"
                                onClick={addProjectField}
                              >
                                Add Project
                              </Button>
                            )}
                          </div>
                        )}

                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs sm:text-sm"
                            onClick={() => setShowApplicationForm(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            className="text-xs sm:text-sm"
                            onClick={() => handleSubmitApplication(job.id)}
                          >
                            Submit Application
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                      <div className="flex items-center text-gray-700">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-indigo-500" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-green-500" />
                        <span>{job.salaryRange}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-yellow-500" />
                        <span>
                          Posted:{" "}
                          {new Date(
                            job.createdAt?.toDate()
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedJob === job.id &&
                        showApplicationForm !== job.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-4 sm:mt-6"
                          >
                            <div className="border-t border-gray-200 pt-4 sm:pt-6">
                              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                                <h4 className="font-medium text-sm sm:text-base text-gray-800 mb-2 flex items-center">
                                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-500" />
                                  Job Description
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-600">
                                  {job.jobDescription}
                                </p>
                              </div>

                              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                                <h4 className="font-medium text-sm sm:text-base text-gray-800 mb-2">
                                  Skills Required
                                </h4>
                                <div className="flex flex-wrap gap-1 sm:gap-2">
                                  {job.skillsRequired.map((skill, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="text-xs sm:text-sm bg-indigo-100 text-indigo-700"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="mt-4 sm:mt-6">
                                <h4 className="font-medium text-sm sm:text-base text-gray-800 mb-2">
                                  Eligibility Criteria
                                </h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                                  <div className="bg-gray-50 p-2 sm:p-3 rounded">
                                    <span className="font-medium">
                                      Min CGPA:
                                    </span>{" "}
                                    {job.minCGPA}
                                  </div>
                                  <div className="bg-gray-50 p-2 sm:p-3 rounded">
                                    <span className="font-medium">10th %:</span>{" "}
                                    {job.minTenthPercentage}%
                                  </div>
                                  <div className="bg-gray-50 p-2 sm:p-3 rounded">
                                    <span className="font-medium">12th %:</span>{" "}
                                    {job.minTwelfthPercentage}%
                                  </div>
                                  <div className="bg-gray-50 p-2 sm:p-3 rounded">
                                    <span className="font-medium">
                                      Max Backlogs:
                                    </span>{" "}
                                    {job.maxBacklogs}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg">
                <p className="text-sm sm:text-base text-gray-500">
                  No available jobs at the moment. Please check back later.
                </p>
              </div>
            )}
          </motion.section>
        )}

        {/* My Applications Section - Kept exactly as provided */}
        {activeTab === "applied" && (
          <motion.section
            key="applied"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3 sm:space-y-4"
          >
            {loading.applications ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : appliedJobs.length > 0 ? (
              appliedJobs.map((application) => (
                <Card
                  key={application.id}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                          {application.jobTitle}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600">
                          {application.companyName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(application.status)}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs sm:text-sm text-gray-500 hover:text-gray-700"
                          onClick={() => toggleExpand(application.jobId)}
                        >
                          {expandedJob === application.jobId
                            ? "Hide Details"
                            : "View Details"}
                          <ChevronDown
                            className={`h-3 w-3 sm:h-4 sm:w-4 ml-1 transition-transform ${
                              expandedJob === application.jobId
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                      <div className="flex items-center text-gray-700">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-indigo-500" />
                        <span>{application.location}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-green-500" />
                        <span>{application.salaryRange}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-yellow-500" />
                        <span>
                          Applied on:{" "}
                          {application.appliedAt?.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedJob === application.jobId && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-4 sm:mt-6"
                        >
                          <div className="border-t border-gray-200 pt-4 sm:pt-6">
                            {getStatusMessage(application.status)}

                            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                              <h4 className="font-medium text-sm sm:text-base text-gray-800 mb-2 flex items-center">
                                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-500" />
                                Job Description
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-600">
                                {application.jobDescription}
                              </p>
                            </div>

                            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                              <h4 className="font-medium text-sm sm:text-base text-gray-800 mb-2">
                                Skills Required
                              </h4>
                              <div className="flex flex-wrap gap-1 sm:gap-2">
                                {application.skillsRequired?.map(
                                  (skill, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="text-xs sm:text-sm"
                                    >
                                      {skill}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg">
                <p className="text-sm sm:text-base text-gray-500">
                  You haven't applied to any jobs yet.
                </p>
                <Button
                  variant="outline"
                  className="mt-3 sm:mt-4 text-xs sm:text-sm"
                  size="sm"
                  onClick={() => setActiveTab("available")}
                >
                  Browse Available Jobs
                </Button>
              </div>
            )}
          </motion.section>
        )}

        {/* Your Profile Section */}
        {activeTab === "profile" && (
          <motion.section
            key="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3 sm:space-y-4"
          >
            <Card className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={getProfileImage()}
                      alt="Profile"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-indigo-100"
                    />
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                        {studentProfile.firstName} {studentProfile.middleName}{" "}
                        {studentProfile.lastName}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        {studentProfile.branch}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      First Name
                    </FormLabel>
                    <div className="text-sm sm:text-base">
                      {studentProfile.firstName}
                    </div>
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      MiddleName
                    </FormLabel>
                    <div className="text-sm sm:text-base">
                      {studentProfile.middleName || "-"}
                    </div>
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Last Name
                    </FormLabel>
                    <div className="text-sm sm:text-base">
                      {studentProfile.lastName}
                    </div>
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">Email</FormLabel>
                    <div className="text-sm sm:text-base">
                      {currentUser?.email}
                    </div>
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Enrollment Number
                    </FormLabel>
                    <div className="text-sm sm:text-base">
                      {studentProfile.enrollmentNumber}
                    </div>
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">Branch</FormLabel>
                    <div className="text-sm sm:text-base">
                      {studentProfile.branch}
                    </div>
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Current CGPA
                    </FormLabel>
                    <div className="text-sm sm:text-base">
                      {studentProfile.cgpa}
                    </div>
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      10th Percentage
                    </FormLabel>
                    <div className="text-sm sm:text-base">
                      {studentProfile.tenthPercentage}%
                    </div>
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      12th Percentage
                    </FormLabel>
                    <div className="text-sm sm:text-base">
                      {studentProfile.twelfthPercentage}%
                    </div>
                  </FormItem>

                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm">
                      Current Backlogs
                    </FormLabel>
                    <div className="text-sm sm:text-base">
                      {studentProfile.backlogs}
                    </div>
                  </FormItem>
                </div>
              </div>
            </Card>
          </motion.section>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default JobListingsPage;
