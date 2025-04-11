import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Search, HelpCircle, ChevronRight, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FaqItem[] = [
  {
    question: "What is the placement process at Government College, Amravati?",
    answer: "The placement process typically involves company registration, pre-placement talks, eligibility screening, applications, aptitude tests, interviews (technical and HR), and finally job offers. Our platform streamlines this entire process for both students and recruiters.",
    category: "General",
  },
  {
    question: "When does the placement season begin?",
    answer: "The placement season generally begins in August-September each year for final year students. However, some companies may conduct early recruitment drives as early as July. Internship drives for pre-final year students usually start in January.",
    category: "General",
  },
  {
    question: "Can I apply to multiple companies?",
    answer: "Yes, students can apply to multiple companies until they receive and accept an offer. Once a student accepts an offer, they are typically not allowed to sit for further placement drives as per our placement policy.",
    category: "For Students",
  },
  {
    question: "What are the eligibility criteria for placement?",
    answer: "Eligibility varies by company, but generally includes: minimum 60% in 10th and 12th standards, minimum CGPA of 6.5-7.0, and no active backlogs. Some companies may have additional requirements which will be specified in their job postings.",
    category: "For Students",
  },
  {
    question: "How should I prepare for placement interviews?",
    answer: "Focus on strong fundamentals in your core subjects, practice coding regularly, prepare for aptitude tests, work on communication skills, participate in mock interviews, and keep your resume updated with relevant projects and experiences.",
    category: "For Students",
  },
  {
    question: "What documents do I need to keep ready for placement?",
    answer: "You should have digital copies of your resume, all academic mark sheets (10th, 12th, semester-wise), ID proof, passport-size photographs, and certificates of extracurricular activities or projects. Keep physical copies as well for in-person interviews.",
    category: "For Students",
  },
  {
    question: "How can companies participate in the placement process?",
    answer: "Companies can register on our portal, provide details about job openings and requirements, and our placement cell will coordinate the scheduling of pre-placement talks, test and interview slots. The entire process can be managed through our platform.",
    category: "For Recruiters",
  },
  {
    question: "What facilities are provided by the college for recruitment drives?",
    answer: "The college provides well-equipped auditoriums for pre-placement talks, computer labs for online tests, and multiple interview rooms. We also offer video conferencing facilities for remote recruitment processes.",
    category: "For Recruiters",
  },
  {
    question: "Are there any fees for companies to participate in placements?",
    answer: "No, there are no registration or participation fees for companies to conduct recruitment drives at Government College, Amravati. We believe in building mutually beneficial relationships with our industry partners.",
    category: "For Recruiters",
  },
  {
    question: "How far in advance should we schedule our recruitment drive?",
    answer: "We recommend scheduling at least 2-3 weeks in advance to ensure maximum student participation and proper coordination. For peak placement season (August-October), earlier scheduling is advised.",
    category: "For Recruiters",
  },
  {
    question: "What is the placement record of the college?",
    answer: "Government College Amravati has maintained an excellent placement record with over 85% eligible students getting placed each year. We have long-standing relationships with top companies across IT, manufacturing, finance, and other sectors.",
    category: "General",
  },
  {
    question: "How do I check my eligibility for a particular job posting?",
    answer: "Our platform automatically compares your profile with company requirements and shows you whether you're eligible for each job posting. Look for the eligibility indicator (green for eligible, red for not eligible) next to job listings in your dashboard.",
    category: "For Students",
  },
  {
    question: "What happens if I miss a placement drive due to health issues?",
    answer: "Contact the placement cell immediately with valid medical documentation. Depending on the company's policies and recruitment timeline, we may be able to request a separate interview slot for genuine cases.",
    category: "For Students",
  },
  {
    question: "Does the college provide any placement preparation support?",
    answer: "Yes, the college conducts mock interviews, resume building workshops, aptitude test practice sessions, and technical training programs throughout the year to prepare students for placements.",
    category: "For Students",
  },
  {
    question: "Can alumni access the placement portal?",
    answer: "Yes, alumni who graduated within the last two years can request access to the portal for job opportunities. They need to contact the placement cell with their details to get their accounts activated.",
    category: "General",
  },
];

const FaqsPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const categories = ["All", ...Array.from(new Set(faqData.map((faq) => faq.category)))];

  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === null || activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    // Reset active FAQ when search query changes
    setActiveIndex(null);
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-slate-50">
      <Navbar />
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-600 opacity-90"></div>
          
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0zMHY2aDZ2LTZoLTZ6bTMwIDMwdjZoNnYtNmgtNnptMC0zMHY2aDZ2LTZoLTZ6bS0xNSAxNXY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] mix-blend-overlay opacity-70"></div>
          
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-indigo-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            >
              Find answers to common questions about our placement process, eligibility, and more.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative max-w-2xl mx-auto"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for questions..."
                className="pl-12 pr-4 py-6 text-base md:text-lg rounded-full border-none shadow-xl focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0 bg-white/10 text-white placeholder:text-indigo-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 py-12 -mt-10 relative z-20">
          {/* Category filters */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-indigo-950">Filter by category</h2>
              <button 
                className="md:hidden flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-1" />
                {showFilters ? "Hide filters" : "Show filters"}
              </button>
            </div>
            
            <div className={`md:block ${showFilters ? 'block' : 'hidden'}`}>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === category || (category === "All" && activeCategory === null)
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md"
                        : "bg-white text-indigo-700 hover:bg-indigo-50 border border-indigo-100"
                    }`}
                    onClick={() => setActiveCategory(category === "All" ? null : category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ items */}
          {filteredFaqs.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white rounded-2xl shadow-sm border border-indigo-100"
            >
              <HelpCircle className="mx-auto h-16 w-16 text-indigo-200" />
              <h3 className="mt-4 text-xl font-medium text-indigo-900">No questions found</h3>
              <p className="mt-2 text-indigo-500">Try adjusting your search or filter criteria</p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-indigo-100 hover:shadow-md transition-all duration-300"
                >
                  <button
                    className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={activeIndex === index}
                  >
                    <span className="text-lg font-medium text-indigo-950">{faq.question}</span>
                    <span className="ml-6 flex-shrink-0 bg-indigo-50 rounded-full p-2 transition-transform duration-300">
                      {activeIndex === index ? (
                        <ChevronUp className="h-5 w-5 text-indigo-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-indigo-400" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="text-indigo-700 whitespace-pre-line">{faq.answer}</p>
                          <div className="mt-4 flex justify-between items-center">
                            <span className="text-xs px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full font-medium">
                              {faq.category}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {/* Extra help section */}
          <div className="mt-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-8 shadow-sm">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-indigo-800 mb-4">Still have questions?</h3>
              <p className="text-indigo-600 mb-6">Our placement team is here to help you with any queries.</p>
              <Link to="/contact" className="inline-flex items-center px-6 py-3 font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                Contact Us <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FaqsPage;