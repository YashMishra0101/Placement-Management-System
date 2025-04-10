
import { useState } from "react";
import { ChevronDown, ChevronUp, Search, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";

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

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const categories = ["All", ...new Set(faqData.map((faq) => faq.category))];

  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === null || activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow">
        <div className="bg-gradient-to-r from-primary to-secondary py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-6">Frequently Asked Questions</h1>
            <p className="text-white/90 text-lg mb-8">
              Find answers to common questions about our placement process, eligibility, and more.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for questions..."
                className="pl-10 py-6 text-lg rounded-full border-none shadow-lg focus-visible:ring-offset-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category || (category === "All" && activeCategory === null)
                      ? "bg-primary text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveCategory(category === "All" ? null : category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No questions found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <button
                    className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                    <span className="ml-6 flex-shrink-0">
                      {activeIndex === index ? (
                        <ChevronUp className="h-5 w-5 text-primary" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </span>
                  </button>
                  <div
                    className={`px-6 pb-6 transition-all duration-300 overflow-hidden ${
                      activeIndex === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-700 whitespace-pre-line">{faq.answer}</p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FaqsPage;
