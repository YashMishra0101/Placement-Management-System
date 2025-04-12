import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  BookOpen,
  Award,
  FileText,
  Upload,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";



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
      "We’re offering a 6-month internship for MERN stack developers. Work on real-world projects under experienced mentors.",
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
  {
    id: 4,
    jobTitle: "Full Stack Developer",
    companyName: "CodeCrush Pvt. Ltd.",
    companyDescription:
      "Empowering enterprises with scalable software solutions",
    jobDescription:
      "We need a Full Stack Developer to work on web platforms using React and Node.js. Experience in cloud services is a plus.",
    location: "Mumbai, India",
    salaryRange: "₹10L - ₹14L per annum",
    jobType: "Full-time",
    skillsRequired: ["React", "Node.js", "AWS", "Docker"],
    minCGPA: 7.8,
    minTenthPercentage: 80,
    minTwelfthPercentage: 80,
    maxBacklogs: 0,
    postedDate: "2023-07-05",
  },
  {
    id: 5,
    jobTitle: "Junior Software Engineer",
    companyName: "PixelEdge Solutions",
    companyDescription:
      "Digital transformation agency serving clients globally",
    jobDescription:
      "We’re hiring entry-level software engineers passionate about web development. Training provided.",
    location: "Pune, India",
    salaryRange: "₹5L - ₹7L per annum",
    jobType: "Full-time",
    skillsRequired: ["JavaScript", "HTML", "CSS", "Git"],
    minCGPA: 6.0,
    minTenthPercentage: 60,
    minTwelfthPercentage: 60,
    maxBacklogs: 3,
    postedDate: "2023-07-10",
  },
];

const JobListingsPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: number]: File | null;
  }>({});
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"available" | "applied">(
    "available"
  );

  const handleFileChange = (
    jobId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setUploadedFiles((prev) => ({ ...prev, [jobId]: file }));
      } else {
        alert("Please upload a PDF file");
      }
    }
  };

  const handleApply = (jobId: number) => {
    if (!uploadedFiles[jobId]) {
      alert("Please upload your resume first");
      return;
    }
    setAppliedJobs((prev) => [...prev, jobId]);
    setExpandedJob(null);
    alert(
      `Application submitted for ${
        dummyJobs.find((job) => job.id === jobId)?.jobTitle
      }`
    );
  };

  const toggleExpand = (jobId: number) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const availableJobs = dummyJobs.filter(
    (job) => !appliedJobs.includes(job.id)
  );
  const studentAppliedJobs = dummyJobs.filter((job) =>
    appliedJobs.includes(job.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-14">
            <Navbar />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-1 pt-20">
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

        {/* Job Opportunities Section */}
        <div className="text-center mb-10 -mt-4">
          <motion.h1
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Job Opportunities
          </motion.h1>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            Browse and apply to the latest job postings from top companies
          </motion.p>

          {/* Tab Navigation */}
          <motion.div
            className="flex justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <Button
              variant={activeTab === "available" ? "default" : "outline"}
              onClick={() => setActiveTab("available")}
              className="gap-2"
            >
              <Briefcase className="h-4 w-4" />
              Available Jobs ({availableJobs.length})
            </Button>
            <Button
              variant={activeTab === "applied" ? "default" : "outline"}
              onClick={() => setActiveTab("applied")}
              className="gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              My Applications ({studentAppliedJobs.length})
            </Button>
          </motion.div>
        </div>

        {/* Available Jobs Section */}
        <AnimatePresence mode="wait">
          {activeTab === "available" && (
            <motion.section
              key="available"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {availableJobs.length > 0 ? (
                availableJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div
                      className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleExpand(job.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {job.jobTitle}
                          </h3>
                          <p className="text-gray-600">{job.companyName}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{job.jobType}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-500 hover:text-green-600 bg-gray-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(job.id);
                            }}
                          >
                            {expandedJob === job.id
                              ? "Hide Details"
                              : "View Full Details"}
                            <ChevronDown
                              className={`h-4 w-4 ml-2 transition-transform ${
                                expandedJob === job.id ? "rotate-180" : ""
                              }`}
                            />
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center text-gray-700">
                          <MapPin className="h-4 w-4 mr-2 text-indigo-500" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                          <span>{job.salaryRange}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Award className="h-4 w-4 mr-2 text-purple-500" />
                          <span>CGPA: {job.minCGPA}+</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                          <span>Posted: {job.postedDate}</span>
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedJob === job.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-6"
                          >
                            <div className="border-t border-gray-200 pt-6">
                              <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                                Job Description
                              </h4>
                              <p className="text-gray-600 mb-6">
                                {job.jobDescription}
                              </p>

                              <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                <Award className="h-5 w-5 mr-2 text-purple-500" />
                                Requirements
                              </h4>
                              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                                <div>
                                  10th Percentage: {job.minTenthPercentage}%+
                                </div>
                                <div>
                                  12th Percentage: {job.minTwelfthPercentage}%+
                                </div>
                                <div>Maximum Backlogs: {job.maxBacklogs}</div>
                              </div>

                              <h4 className="font-medium text-gray-800 mb-3">
                                Skills Required
                              </h4>
                              <div className="flex flex-wrap gap-2 mb-6">
                                {job.skillsRequired.map((skill, index) => (
                                  <Badge key={index} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex flex-col sm:flex-row gap-3">
                                <label className="flex-1">
                                  <Input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) =>
                                      handleFileChange(job.id, e)
                                    }
                                    className="hidden"
                                    id={`resume-upload-${job.id}`}
                                  />
                                  <Button
                                    variant="outline"
                                    className="w-full gap-2"
                                    asChild
                                  >
                                    <div>
                                      <Upload className="h-4 w-4" />
                                      {uploadedFiles[job.id] ? (
                                        <span className="truncate max-w-[120px]">
                                          {uploadedFiles[job.id]?.name}
                                        </span>
                                      ) : (
                                        <span>Upload Resume (PDF)</span>
                                      )}
                                    </div>
                                  </Button>
                                </label>
                                <Button
                                  onClick={() => handleApply(job.id)}
                                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                                >
                                  Apply Now
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">
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
              className="space-y-4"
            >
              {studentAppliedJobs.length > 0 ? (
                studentAppliedJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {job.jobTitle}
                          </h3>
                          <p className="text-gray-600">{job.companyName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800">
                            Applied
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => toggleExpand(job.id)}
                          >
                            {expandedJob === job.id
                              ? "Hide Details"
                              : "View Details"}
                            <ChevronDown
                              className={`h-4 w-4 ml-2 transition-transform ${
                                expandedJob === job.id ? "rotate-180" : ""
                              }`}
                            />
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center text-gray-700">
                          <MapPin className="h-4 w-4 mr-2 text-indigo-500" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                          <span>{job.salaryRange}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Clock className="h-4 w-4 mr-2 text-yellow-500" />
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
                            className="mt-6"
                          >
                            <div className="border-t border-gray-200 pt-6">
                              <div className="flex items-center gap-2 text-green-600 mb-4">
                                <CheckCircle className="h-5 w-5" />
                                <span>Application submitted successfully</span>
                              </div>

                              <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                                Job Description
                              </h4>
                              <p className="text-gray-600 mb-6">
                                {job.jobDescription}
                              </p>

                              <h4 className="font-medium text-gray-800 mb-3">
                                Skills Required
                              </h4>
                              <div className="flex flex-wrap gap-2 mb-6">
                                {job.skillsRequired.map((skill, index) => (
                                  <Badge key={index} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>

                              <p className="text-sm text-gray-500">
                                You applied with:{" "}
                                {uploadedFiles[job.id]?.name || "Resume.pdf"}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">
                    You haven't applied to any jobs yet.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setActiveTab("available")}
                  >
                    Browse Available Jobs
                  </Button>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
      <div className="-mb-16 -pr-12 mt-14">

      <Footer />
      </div>
    </div>
    
  );

};

export default JobListingsPage;
