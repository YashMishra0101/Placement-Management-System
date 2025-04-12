import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom'; // Make sure this is imported at the top

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Briefcase, Users, CheckCircle2, XCircle, Download, Plus, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const jobPostSchema = z.object({
  jobTitle: z.string().min(5, "Job title must be at least 5 characters"),
  companyName: z.string().min(2, "Company name is required"),
  companyDescription: z.string().min(50, "Description must be at least 50 characters"),
  jobDescription: z.string().min(100, "Job description must be at least 100 characters"),
  location: z.string().min(2, "Location is required"),
  salaryRange: z.string().min(1, "Salary range is required"),
  jobType: z.enum(["Full-time", "Part-time", "Contract", "Internship"]),
  skillsRequired: z.array(z.string()).min(1, "At least one skill is required"),
  minCGPA: z.number().min(0).max(10, "CGPA must be between 0 and 10"),
  minTenthPercentage: z.number().min(0).max(100, "Percentage must be between 0 and 100"),
  minTwelfthPercentage: z.number().min(0).max(100, "Percentage must be between 0 and 100"),
  maxBacklogs: z.number().min(0, "Backlogs cannot be negative"),
});

const JobPostForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [skillsInput, setSkillsInput] = useState('');
  const [skills, setSkills] = useState<string[]>([]);

  const form = useForm<z.infer<typeof jobPostSchema>>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      jobTitle: "",
      companyName: "",
      companyDescription: "",
      jobDescription: "",
      location: "",
      salaryRange: "",
      jobType: "Full-time",
      skillsRequired: [],
      minCGPA: 0,
      minTenthPercentage: 0,
      minTwelfthPercentage: 0,
      maxBacklogs: 0,
    },
  });

  const addSkill = () => {
    if (skillsInput.trim() && !skills.includes(skillsInput.trim())) {
      const newSkills = [...skills, skillsInput.trim()];
      setSkills(newSkills);
      form.setValue('skillsRequired', newSkills);
      setSkillsInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(newSkills);
    form.setValue('skillsRequired', newSkills);
  };

  const onSubmit = async (data: z.infer<typeof jobPostSchema>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Job Posted Successfully",
        description: "Your job listing is now live and visible to candidates.",
      });
      form.reset();
      setSkills([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post job. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CardTitle className="text-2xl md:text-3xl font-bold">Create Job Posting</CardTitle>
            <p className="text-indigo-100 mt-2">
              Fill in the details to post a new job opportunity
            </p>
          </motion.div>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Job Details */}
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Job Title *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. Software Engineer" 
                            {...field} 
                            className="h-12 text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jobType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Job Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-base">
                              <SelectValue placeholder="Select job type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Location *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. Bangalore, India" 
                            {...field} 
                            className="h-12 text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salaryRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Salary Range *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. ₹6L - ₹10L per annum" 
                            {...field} 
                            className="h-12 text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Company Details */}
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Company Name *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your company name" 
                            {...field} 
                            className="h-12 text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Company Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief about your company..."
                            className="min-h-[120px] text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </div>

              {/* Job Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FormField
                  control={form.control}
                  name="jobDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Job Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed job description, responsibilities, requirements, etc."
                          className="min-h-[180px] text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Skills */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <FormLabel className="text-gray-700 font-medium">Required Skills *</FormLabel>
                <div className="flex gap-3">
                  <Input
                    placeholder="Add a skill (e.g. JavaScript)"
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    className="h-12 text-base"
                  />
                  <Button 
                    type="button" 
                    onClick={addSkill}
                    variant="secondary"
                    className="h-12 gap-2"
                  >
                    <Plus size={18} />
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {skills.map((skill) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Badge
                          variant="secondary"
                          className="px-3 py-1.5 text-sm flex items-center gap-1.5 rounded-full"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                {form.formState.errors.skillsRequired && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.skillsRequired.message}
                  </p>
                )}
              </motion.div>

              {/* Requirements */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <FormField
                  control={form.control}
                  name="minCGPA"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Minimum CGPA</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            placeholder="e.g. 7.5"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            className="h-12 text-base"
                          />
                          <span className="absolute right-3 top-3 text-gray-400">/10</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="minTenthPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Minimum 10th %</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="e.g. 75"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            className="h-12 text-base"
                          />
                          <span className="absolute right-3 top-3 text-gray-400">%</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="minTwelfthPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Minimum 12th %</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="e.g. 75"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            className="h-12 text-base"
                          />
                          <span className="absolute right-3 top-3 text-gray-400">%</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxBacklogs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Max Backlogs Allowed</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="e.g. 2"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          className="h-12 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div 
                className="flex justify-end pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="h-12 px-8 text-base bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Posting Job...
                    </>
                  ) : (
                    "Post Job Opportunity"
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Dummy student data
const dummyStudents = [
  {
    id: 1,
    firstName: "Rahul",
    middleName: "Kumar",
    lastName: "Sharma",
    branch: "Computer Science",
    cgpa: 8.7,
    tenthPercentage: 92,
    twelfthPercentage: 88,
    backlogs: 0,
    resumeUrl: "#",
    skills: ["JavaScript", "React", "Node.js"]
  },
  {
    id: 2,
    firstName: "Priya",
    middleName: "",
    lastName: "Patel",
    branch: "Information Technology",
    cgpa: 9.2,
    tenthPercentage: 95,
    twelfthPercentage: 90,
    backlogs: 0,
    resumeUrl: "#",
    skills: ["Python", "Django", "Machine Learning"]
  },
  {
    id: 3,
    firstName: "Amit",
    middleName: "Singh",
    lastName: "Verma",
    branch: "Electronics",
    cgpa: 7.8,
    tenthPercentage: 85,
    twelfthPercentage: 80,
    backlogs: 1,
    resumeUrl: "#",
    skills: ["Embedded Systems", "C++", "IoT"]
  },
  {
    id: 4,
    firstName: "Neha",
    middleName: "",
    lastName: "Gupta",
    branch: "Mechanical",
    cgpa: 8.1,
    tenthPercentage: 89,
    twelfthPercentage: 82,
    backlogs: 0,
    resumeUrl: "#",
    skills: ["CAD", "SolidWorks", "Thermodynamics"]
  },
];

const ApplicantsList = ({ students, onApprove, onReject }: {
  students: typeof dummyStudents;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CardTitle className="text-2xl md:text-3xl font-bold">Student Applications</CardTitle>
            <p className="text-indigo-100 mt-2">
              {students.length} {students.length === 1 ? 'applicant' : 'applicants'} found
            </p>
          </motion.div>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6">
            {students.length > 0 ? (
              <AnimatePresence>
                {students.map((student) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {student.firstName} {student.middleName} {student.lastName}
                          </h3>
                          <p className="text-gray-600">{student.branch}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {student.skills.map((skill, index) => (
                            <Badge 
                              key={index} 
                              variant="secondary"
                              className="px-3 py-1 rounded-full"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                          <div>
                            <p className="text-sm text-gray-500">CGPA</p>
                            <p className="font-medium">{student.cgpa}/10</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">10th %</p>
                            <p className="font-medium">{student.tenthPercentage}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">12th %</p>
                            <p className="font-medium">{student.twelfthPercentage}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Backlogs</p>
                            <p className="font-medium">{student.backlogs}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row md:flex-col gap-2 min-w-[200px]">
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => window.open(student.resumeUrl, "_blank")}
                          className="gap-2"
                        >
                          <Download size={18} />
                          Resume
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            variant="success"
                            size="lg"
                            onClick={() => onApprove(student.id)}
                            className="flex-1 gap-2"
                          >
                            <CheckCircle2 size={18} />
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="lg"
                            onClick={() => onReject(student.id)}
                            className="flex-1 gap-2"
                          >
                            <XCircle size={18} />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="mx-auto h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No applicants found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Students who apply to your jobs will appear here. Check back later or share your job postings.
                </p>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const RecruiterJobPostPage  = () => {
  const [activeTab, setActiveTab] = useState<"jobPosting" | "applicants">("jobPosting");
  const [students, setStudents] = useState(dummyStudents);
  const { toast } = useToast();

  const handleApprove = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    setStudents(students.filter(student => student.id !== studentId));
    toast({
      title: "Application Approved",
      description: `${student?.firstName} ${student?.lastName} has been approved.`,
    });
  };

  const handleReject = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    setStudents(students.filter(student => student.id !== studentId));
    toast({
      title: "Application Rejected",
      description: `${student?.firstName} ${student?.lastName} has been rejected.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
                        <Link to="/login">
            
                          <Button variant="outline" className="mr-4 bg-slate-200">
                            ← Back
                          </Button>
                          </Link>
            
                        </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <motion.span 
                  className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent ml-32"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Recruiter Portal
                </motion.span>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <motion.button
                onClick={() => setActiveTab("jobPosting")}
                className={`${
                  activeTab === "jobPosting"
                    ? "border-indigo-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Briefcase className="mr-2 h-5 w-5" />
                Job Posting
              </motion.button>
              <motion.button
                onClick={() => setActiveTab("applicants")}
                className={`${
                  activeTab === "applicants"
                    ? "border-indigo-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="mr-2 h-5 w-5" />
                View Applicants
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "jobPosting" ? (
            <JobPostForm />
          ) : (
            <ApplicantsList 
              students={students} 
              onApprove={handleApprove} 
              onReject={handleReject} 
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default RecruiterJobPostPage ;