
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-float absolute top-20 right-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="animate-float delay-300 absolute bottom-20 left-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="animate-float delay-700 absolute top-1/2 left-1/2 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="block text-gray-900">Welcome to the</span>
              <span className="block text-gradient mt-2">
                Placement Portal
              </span>
              <span className="block text-gray-900 mt-2">
                of Government College Amravati
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto lg:mx-0">
              Connecting talented students with leading companies for a
              brighter future. Streamline your placement process with our
              all-in-one platform.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/signup">
                <Button size="lg" className="text-md font-semibold">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-md font-semibold"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative lg:block hidden">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-20 blur-lg transform -rotate-6"></div>
              <div className="relative bg-white rounded-lg shadow-xl overflow-hidden card-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg
                          className="h-6 w-6 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          New Job Opening
                        </p>
                        <p className="text-xs text-gray-500">
                          Just now
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      New
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Software Developer at Infosys
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Join one of India's leading IT companies and work on
                    cutting-edge technologies.
                  </p>
                  <div className="mt-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Requirements:</span> B.Tech / MCA, 60% in
                      10th & 12th, 7.0 CGPA
                    </p>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button
                      size="sm"
                      className="w-full text-center"
                      disabled
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-20 -right-10 animate-float delay-500">
              <div className="relative bg-white rounded-lg shadow-xl overflow-hidden card-shadow transform rotate-6 w-64">
                <div className="p-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <svg
                        className="h-4 w-4 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Application Approved!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
