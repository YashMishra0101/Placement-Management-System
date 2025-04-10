
import { useEffect, useState } from "react";

// Add logos of popular Indian companies
const companies = [
  { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png" },
  { name: "TCS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/2560px-Tata_Consultancy_Services_Logo.svg.png" },
  { name: "Wipro", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/2560px-Wipro_Primary_Logo_Color_RGB.svg.png" },
  { name: "Tech Mahindra", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Tech_Mahindra_New_Logo.svg/2560px-Tech_Mahindra_New_Logo.svg.png" },
  { name: "HCL", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/HCL_Technologies_logo.svg/2560px-HCL_Technologies_logo.svg.png" },
  { name: "Cognizant", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Cognizant_logo.svg/1280px-Cognizant_logo.svg.png" },
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
    <section id="companies-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Trusted by Leading Companies
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            These top companies recruit through our platform every year, offering
            students exclusive opportunities.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {companies.map((company, index) => (
              <div
                key={index}
                className={`flex justify-center items-center p-4 bg-white rounded-lg hover-scale ${
                  animated
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                } transition-all duration-700 ease-in-out`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-12 object-contain"
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
