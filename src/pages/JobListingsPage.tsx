import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  BookOpen,
  CheckCircle,
  ChevronDown,
  User,
  Edit,
  Send,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";

// Dummy student profile data
const dummyStudentProfile = {
  firstName: "Rahul",
  middleName: "Kumar",
  lastName: "Sharma",
  gender: "Male",
  phone: "+91 9876543210",
  email: "rahul.sharma@example.com",
  dob: "2000-05-15",
  tenthPercentage: "92",
  twelfthPercentage: "88",
  cgpa: "8.7",
  branch: "Computer Science & Engineering",
  semester: "6",
  backlogs: "0",
};

// Dummy job data
const dummyJobs = [
  {
    id: 1,
    jobTitle: "Frontend Developer",
    companyName: "Tech Solutions Inc.",
    companyDescription:
      "Leading tech company specializing in innovative web solutions",
    jobDescription:
      "We're looking for a skilled Frontend Developer to join our team. You'll be responsible for building user interfaces using React and TypeScript, collaborating with designers, and optimizing applications for maximum speed and scalability.",
    location: "Bangalore, India (Remote)",
    salaryRange: "₹6L - ₹10L per annum",
    jobType: "Full-time",
    skillsRequired: ["React", "TypeScript", "CSS", "Redux"],
    minCGPA: 7.5,
    minTenthPercentage: 75,
    minTwelfthPercentage: 75,
    maxBacklogs: 1,
    postedDate: "2023-06-15",
  },
  {
    id: 2,
    jobTitle: "Backend Developer",
    companyName: "DataCore Labs",
    companyDescription:
      "A fast-growing data analytics firm revolutionizing business intelligence",
    jobDescription:
      "We're hiring a backend developer experienced in Node.js and MongoDB. The ideal candidate will design REST APIs, manage databases, and ensure smooth backend operations.",
    location: "Hyderabad, India",
    salaryRange: "₹8L - ₹12L per annum",
    jobType: "Full-time",
    skillsRequired: ["Node.js", "Express", "MongoDB", "REST API"],
    minCGPA: 7.0,
    minTenthPercentage: 70,
    minTwelfthPercentage: 70,
    maxBacklogs: 0,
    postedDate: "2023-06-20",
  },
  {
    id: 3,
    jobTitle: "MERN Stack Developer Intern",
    companyName: "StartupVerse",
    companyDescription:
      "A budding startup focusing on AI-powered learning platforms",
    jobDescription:
      "We're offering a 6-month internship for MERN stack developers. Work on real-world projects under experienced mentors.",
    location: "Remote",
    salaryRange: "₹15K - ₹25K per month",
    jobType: "Internship",
    skillsRequired: ["MongoDB", "Express", "React", "Node.js"],
    minCGPA: 6.5,
    minTenthPercentage: 65,
    minTwelfthPercentage: 65,
    maxBacklogs: 2,
    postedDate: "2023-07-01",
  },
];
// Add these simple component definitions at the top of your file, right after the imports
const FormItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-1">{children}</div>
);

const FormLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={`text-gray-600 ${className || ''}`}>{children}</label>
);

// Also add these arrays that are used in the profile form
const branches = [
  "Computer Science & Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electronics & Communication",
  "Information Technology",
];

const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

const backlogOptions = ["0", "1", "2", "3", "4", "5+"];
const JobListingsPage = () => {
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"available" | "applied" | "profile">(
    "available"
  );
  const [showApplicationForm, setShowApplicationForm] = useState<number | null>(null);
  const [internshipCount, setInternshipCount] = useState("0");
  const [internshipMonths, setInternshipMonths] = useState("0");
  const [hasProjects, setHasProjects] = useState("No");
  const [projects, setProjects] = useState([
    { link: "", description: "" },
    { link: "", description: "" },
    { link: "", description: "" },
  ]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState(dummyStudentProfile);

  const handleApply = (jobId: number) => {
    setShowApplicationForm(jobId);
  };

  const handleSubmitApplication = (jobId: number) => {
    setAppliedJobs((prev) => [...prev, jobId]);
    setShowApplicationForm(null);
    // Reset form fields
    setInternshipCount("0");
    setInternshipMonths("0");
    setHasProjects("No");
    setProjects([
      { link: "", description: "" },
      { link: "", description: "" },
      { link: "", description: "" },
    ]);
  };

  const toggleExpand = (jobId: number) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setProjects(newProjects);
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const availableJobs = dummyJobs.filter(
    (job) => !appliedJobs.includes(job.id)
  );
  const studentAppliedJobs = dummyJobs.filter((job) =>
    appliedJobs.includes(job.id)
  );

  const getProfileImage = () => {
    return profileData.gender === "Female" 
      ? "https://cdn-icons-png.flaticon.com/512/4140/4140048.png" 
      : "https://cdn-icons-png.flaticon.com/512/4140/4140047.png";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8 ">
          <h1 className="text-2xl sm:text-4xl pt-20 font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-1 sm:pt-20">
            <TypeAnimation
              sequence={[
                "Your Dream Career Awaits",
                1000,
                "Find Your Perfect Job Match",
                1000,
                "Launch Your Professional Journey",
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ display: "inline-block" }}
              repeat={Infinity}
            />
          </h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <Button
            variant={activeTab === "available" ? "default" : "outline"}
            onClick={() => setActiveTab("available")}
            className="gap-2 text-xs sm:text-sm"
            size="sm"
          >
            <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
            Available Jobs ({availableJobs.length})
          </Button>
          <Button
            variant={activeTab === "applied" ? "default" : "outline"}
            onClick={() => setActiveTab("applied")}
            className="gap-2 text-xs sm:text-sm"
            size="sm"
          >
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
            My Applications ({studentAppliedJobs.length})
          </Button>
          <Button
            variant={activeTab === "profile" ? "default" : "outline"}
            onClick={() => setActiveTab("profile")}
            className="gap-2 text-xs sm:text-sm"
            size="sm"
          >
            <User className="h-3 w-3 sm:h-4 sm:w-4" />
            Your Profile
          </Button>
        </div>

        {/* Available Jobs Section */}
        <AnimatePresence mode="wait">
          {activeTab === "available" && (
            <motion.section
              key="available"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3 sm:space-y-4"
            >
              {availableJobs.length > 0 ? (
                availableJobs.map((job) => (
                  <Card 
                    key={job.id}
                    className="border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white/90 backdrop-blur-sm"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                            {job.jobTitle}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600">{job.companyName}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                          <Button
                            variant="default"
                            size="sm"
                            className="text-xs sm:text-sm"
                            onClick={() => handleApply(job.id)}
                          >
                            Apply Now
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-800"
                            onClick={() => toggleExpand(job.id)}
                          >
                            {expandedJob === job.id
                              ? "Hide Details"
                              : "View Details"}
                            <ChevronDown
                              className={`h-3 w-3 sm:h-4 sm:w-4 ml-1 transition-transform ${
                                expandedJob === job.id ? "rotate-180" : ""
                              }`}
                            />
                          </Button>
                        </div>
                      </div>

                      {/* Application Form (shown when Apply is clicked) */}
                      {showApplicationForm === job.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100"
                        >
                          <h4 className="font-medium text-sm sm:text-base text-blue-800 mb-3">
                            Additional Application Information
                          </h4>
                          <p className="text-xs sm:text-sm text-blue-600 mb-4">
                            By default, your saved profile information will also be sent to the recruiter along with this application.
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                How many internships have you done?
                              </label>
                              <select
                                value={internshipCount}
                                onChange={(e) => setInternshipCount(e.target.value)}
                                className="w-full text-xs sm:text-sm h-8 sm:h-9 border border-gray-300 rounded-md px-2"
                              >
                                {[0, 1, 2, 3, 4, 5].map((num) => (
                                  <option key={num} value={num}>{num}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                Total internship experience (in months)
                              </label>
                              <select
                                value={internshipMonths}
                                onChange={(e) => setInternshipMonths(e.target.value)}
                                className="w-full text-xs sm:text-sm h-8 sm:h-9 border border-gray-300 rounded-md px-2"
                              >
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                                  <option key={num} value={num}>{num}</option>
                                ))}
                              </select>
                            </div>
                          </div>

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
                                <span className="ml-2 text-xs sm:text-sm">Yes</span>
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
                                <span className="ml-2 text-xs sm:text-sm">No</span>
                              </label>
                            </div>
                          </div>

                          {hasProjects === "Yes" && (
                            <div className="space-y-3 mb-4">
                              {projects.map((project, index) => (
                                <div key={index} className="bg-white p-3 rounded border border-gray-200">
                                  <h5 className="text-xs sm:text-sm font-medium mb-2">Project {index + 1}</h5>
                                  <div className="space-y-2">
                                    <div>
                                      <label className="block text-xs text-gray-500 mb-1">Link (optional)</label>
                                      <input
                                        type="text"
                                        value={project.link}
                                        onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                                        className="w-full text-xs sm:text-sm h-8 border border-gray-300 rounded-md px-2"
                                        placeholder="https://example.com/project"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs text-gray-500 mb-1">Description (optional)</label>
                                      <textarea
                                        value={project.description}
                                        onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                                        className="w-full text-xs sm:text-sm h-16 border border-gray-300 rounded-md px-2 py-1"
                                        placeholder="Brief description of the project"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
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
                          <span>Posted: {job.postedDate}</span>
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedJob === job.id && showApplicationForm !== job.id && (
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
                                <p className="text-xs sm:text-sm text-gray-600">{job.jobDescription}</p>
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
                                    <span className="font-medium">Min CGPA:</span> {job.minCGPA}
                                  </div>
                                  <div className="bg-gray-50 p-2 sm:p-3 rounded">
                                    <span className="font-medium">10th %:</span> {job.minTenthPercentage}%
                                  </div>
                                  <div className="bg-gray-50 p-2 sm:p-3 rounded">
                                    <span className="font-medium">12th %:</span> {job.minTwelfthPercentage}%
                                  </div>
                                  <div className="bg-gray-50 p-2 sm:p-3 rounded">
                                    <span className="font-medium">Max Backlogs:</span> {job.maxBacklogs}
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

          {/* My Applications Section */}
          {activeTab === "applied" && (
            <motion.section
              key="applied"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3 sm:space-y-4"
            >
              {studentAppliedJobs.length > 0 ? (
                studentAppliedJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                            {job.jobTitle}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600">{job.companyName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 text-xs sm:text-sm">
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            Applied
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs sm:text-sm text-gray-500 hover:text-gray-700"
                            onClick={() => toggleExpand(job.id)}
                          >
                            {expandedJob === job.id
                              ? "Hide Details"
                              : "View Details"}
                            <ChevronDown
                              className={`h-3 w-3 sm:h-4 sm:w-4 ml-1 transition-transform ${
                                expandedJob === job.id ? "rotate-180" : ""
                              }`}
                            />
                          </Button>
                        </div>
                      </div>

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
                            Applied on: {new Date().toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedJob === job.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-4 sm:mt-6"
                          >
                            <div className="border-t border-gray-200 pt-4 sm:pt-6">
                              <div className="flex items-center gap-2 text-green-600 mb-3 sm:mb-4 text-sm sm:text-base">
                                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span>Application submitted successfully</span>
                              </div>

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
                                      className="text-xs sm:text-sm"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
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
                          {profileData.firstName} {profileData.middleName} {profileData.lastName}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600">{profileData.branch}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {isEditingProfile ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs sm:text-sm"
                            onClick={() => setIsEditingProfile(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            className="text-xs sm:text-sm gap-1"
                            onClick={() => {
                              setIsEditingProfile(false);
                              // In a real app, you would save to backend here
                            }}
                          >
                            <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                            Submit for Approval
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="default"
                          size="sm"
                          className="text-xs sm:text-sm gap-1"
                          onClick={() => setIsEditingProfile(true)}
                        >
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">First Name</FormLabel>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => handleProfileChange("firstName", e.target.value)}
                          className="w-full text-xs sm:text-sm h-8 border border-gray-300 rounded-md px-2"
                        />
                      ) : (
                        <div className="text-sm sm:text-base">{profileData.firstName}</div>
                      )}
                    </FormItem>

                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">Middle Name</FormLabel>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={profileData.middleName}
                          onChange={(e) => handleProfileChange("middleName", e.target.value)}
                          className="w-full text-xs sm:text-sm h-8 border border-gray-300 rounded-md px-2"
                        />
                      ) : (
                        <div className="text-sm sm:text-base">{profileData.middleName || "-"}</div>
                      )}
                    </FormItem>

                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">Last Name</FormLabel>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) => handleProfileChange("lastName", e.target.value)}
                          className="w-full text-xs sm:text-sm h-8 border border-gray-300 rounded-md px-2"
                        />
                      ) : (
                        <div className="text-sm sm:text-base">{profileData.lastName}</div>
                      )}
                    </FormItem>

                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">Gender</FormLabel>
                      {isEditingProfile ? (
                        <select
                          value={profileData.gender}
                          onChange={(e) => handleProfileChange("gender", e.target.value)}
                          className="w-full text-xs sm:text-sm h-8 border border-gray-300 rounded-md px-2"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Non-binary">Non-binary</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <div className="text-sm sm:text-base">{profileData.gender}</div>
                      )}
                    </FormItem>

                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">Phone</FormLabel>
                      {isEditingProfile ? (
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => handleProfileChange("phone", e.target.value)}
                          className="w-full text-xs sm:text-sm h-8 border border-gray-300 rounded-md px-2"
                        />
                      ) : (
                        <div className="text-sm sm:text-base">{profileData.phone}</div>
                      )}
                    </FormItem>

                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">Email</FormLabel>
                      <div className="text-sm sm:text-base">{profileData.email}</div>
                    </FormItem>

                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">Date of Birth</FormLabel>
                      {isEditingProfile ? (
                        <input
                          type="date"
                          value={profileData.dob}
                          onChange={(e) => handleProfileChange("dob", e.target.value)}
                          className="w-full text-xs sm:text-sm h-8 border border-gray-300 rounded-md px-2"
                        />
                      ) : (
                        <div className="text-sm sm:text-base">
                          {new Date(profileData.dob).toLocaleDateString()}
                        </div>
                      )}
                    </FormItem>

                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">10th %</FormLabel>
                      {isEditingProfile ? (
                        <input
                          type="number"
                          value={profileData.tenthPercentage}
                          onChange={(e) => handleProfileChange("tenthPercentage", e.target.value)}
                          className="w-full text-xs sm:text-sm h-8 border border-gray-300 rounded-md px-2"
                        />
                      ) : (
                        <div className="text-sm sm:text-base">{profileData.tenthPercentage}%</div>
                      )}
                    </FormItem>

                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">12th %</FormLabel>
                      {isEditingProfile ? (
                        <input
                          type="number"
                          value={profileData.twelfthPercentage}
                          onChange={(e) => handleProfileChange("twelfthPercentage", e.target.value)}
                          className="w-full text-xs sm:text-sm h-8 border border-gray-300 rounded-md px-2"
                        />
                      ) : (
                        <div className="text-sm sm:text-base">{profileData.twelfthPercentage}%</div>
                      )}
                    </FormItem>

                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">CGPA</FormLabel>
                      {isEditingProfile ? (
                        <input
                          type="number"
                          step="0.01"
                          value={profileData.cgpa}
                          onChange={(e) => handleProfileChange("cgpa", e.target.value)}
                          className="w-full text-xs sm:text-sm h-8 border border-gray-300 rounded-md px-2"
                        />
                      ) : (
                        <div className="text-sm sm:text-base">{profileData.cgpa}/10</div>
                      )}
                    </FormItem>

                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">Branch</FormLabel>
                      {isEditingProfile ? (
                        <select
                          value={profileData.branch}
                          onChange={(e) => handleProfileChange("branch", e.target.value)}
                          className="w-full text-xs sm:text-sm h-8 border border-gray-300 rounded-md px-2"
                        >
                          {branches.map((branch) => (
                            <option key={branch} value={branch}>{branch}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="text-sm sm:text-base">{profileData.branch}</div>
                      )}
                    </FormItem>

                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">Semester</FormLabel>
                      {isEditingProfile ? (
                        <select
                          value={profileData.semester}
                          onChange={(e) => handleProfileChange("semester", e.target.value)}
                          className="w-full text-xs sm:text-sm h-8 border border-gray-300 rounded-md px-2"
                        >
                          {semesters.map((sem) => (
                            <option key={sem} value={sem}>{sem}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="text-sm sm:text-base">{profileData.semester}</div>
                      )}
                    </FormItem>

                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">Backlogs</FormLabel>
                      {isEditingProfile ? (
                        <select
                          value={profileData.backlogs}
                          onChange={(e) => handleProfileChange("backlogs", e.target.value)}
                          className="w-full text-xs sm:text-sm h-8 border border-gray-300 rounded-md px-2"
                        >
                          {backlogOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="text-sm sm:text-base">{profileData.backlogs}</div>
                      )}
                    </FormItem>
                  </div>
                </div>
              </Card>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-8 sm:mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default JobListingsPage;