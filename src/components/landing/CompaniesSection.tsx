
import { useEffect, useState } from "react";

// Updated with more reliable image URLs
const companies = [
  { 
    name: "Infosys", 
    logo: "https://logos-world.net/wp-content/uploads/2020/08/Infosys-Logo.png" 
  },
  { 
    name: "TCS", 
    logo: "https://www.mockrocket.io/images/companies/tcs.png" 
  },
  { 
    name: "Wipro", 
    logo: "https://logos-world.net/wp-content/uploads/2020/10/Wipro-Logo.png"
  },
  { 
    name: "Tech Mahindra", 
    logo: "https://1000logos.net/wp-content/uploads/2021/08/Tech-Mahindra-Logo.png" 
  },
  { 
    name: "HCL", 
    logo: "https://1000logos.net/wp-content/uploads/2021/09/HCL-Logo-2000.png" 
  },
  { 
    name: "Cognizant", 
    logo: "https://1000logos.net/wp-content/uploads/2021/08/Cognizant-Logo.png" 
  },
];

const CompaniesSection = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("companies-section");
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight && !animated) {
          setAnimated(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [animated]);

  return (
    <section id="companies-section" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Leading Companies
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">
            These top companies recruit through our platform every year, offering
            students exclusive opportunities.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {companies.map((company, index) => (
              <div
                key={index}
                className={`flex justify-center items-center p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ${
                  animated
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } hover:scale-105`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  transitionDuration: "500ms",
                  transitionProperty: "all",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              >
                <div className="h-16 w-full flex items-center justify-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-10 md:h-12 max-w-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback image if the main one fails to load
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/150x60?text=" + company.name;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
