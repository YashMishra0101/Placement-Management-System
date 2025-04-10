
import { useEffect, useState } from "react";

// Updated company logos with more reliable URLs
const companies = [
  { name: "Infosys", logo: "https://logos-world.net/wp-content/uploads/2020/08/Infosys-Logo.png" },
  { name: "TCS", logo: "https://logos-world.net/wp-content/uploads/2020/06/Tata-Consultancy-Services-TCS-Logo.png" },
  { name: "Wipro", logo: "https://logos-world.net/wp-content/uploads/2020/07/Wipro-Logo.png" },
  { name: "Tech Mahindra", logo: "https://logos-world.net/wp-content/uploads/2020/11/Tech-Mahindra-Logo.png" },
  { name: "HCL", logo: "https://logos-world.net/wp-content/uploads/2020/11/HCL-Technologies-Logo.png" },
  { name: "Cognizant", logo: "https://logos-world.net/wp-content/uploads/2022/07/Cognizant-Logo.png" },
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
    <section id="companies-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Trusted by Leading Companies
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            These top companies recruit through our platform every year, offering
            students exclusive opportunities.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {companies.map((company, index) => (
              <div
                key={index}
                className={`flex justify-center items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${
                  animated
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                } transition-all duration-700 ease-in-out hover:scale-105`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-12 object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
