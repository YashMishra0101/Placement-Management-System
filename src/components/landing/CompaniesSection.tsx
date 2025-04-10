
import { useEffect, useState } from "react";

const companies = [
  { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/2560px-Infosys_logo.svg.png" },
  { name: "TCS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1200px-Tata_Consultancy_Services_Logo.svg.png" },
  { name: "Wipro", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/1200px-Wipro_Primary_Logo_Color_RGB.svg.png" },
  { name: "Tech Mahindra", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Tech_Mahindra_Logo.svg/1200px-Tech_Mahindra_Logo.svg.png" },
  { name: "HCL", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/HCLTechnologies_logo.svg/1200px-HCLTechnologies_logo.svg.png" },
  { name: "Cognizant", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Cognizant_logo_2022.svg/1200px-Cognizant_logo_2022.svg.png" },
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
