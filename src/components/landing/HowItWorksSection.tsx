
import {
  UserPlus,
  ClipboardCheck,
  CheckCircle,
  Briefcase,
} from "lucide-react";

const steps = [
  {
    title: "Sign Up",
    description:
      "Create your account as a student or recruiter. Fill in your details and submit for approval.",
    icon: UserPlus,
    color: "bg-blue-100 text-blue-600",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  },
  {
    title: "Get Approved",
    description:
      "Admin reviews your details and approves your account, giving you full access to the platform.",
    icon: CheckCircle,
    color: "bg-green-100 text-green-600",
    image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  },
  {
    title: "Apply or Post Jobs",
    description:
      "Students can apply for jobs, companies can post new openings. The platform matches eligible candidates.",
    icon: Briefcase,
    color: "bg-purple-100 text-purple-600",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  },
  {
    title: "Track Progress",
    description:
      "Monitor application status, manage interviews, and track placement results all in one place.",
    icon: ClipboardCheck,
    color: "bg-orange-100 text-orange-600",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 mb-4"></div>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple 4-step process makes placement management easy for
            everyone involved.
          </p>
        </div>

        <div className="mt-16 relative">
          {/* Line connecting steps */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary transform -translate-x-1/2"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative mb-16 lg:mb-24 ${
                index % 2 === 0 ? "lg:text-right" : "lg:text-left"
              }`}
            >
              <div
                className={`lg:flex items-center ${
                  index % 2 === 0
                    ? "lg:flex-row-reverse lg:justify-start"
                    : "lg:flex-row lg:justify-end"
                }`}
              >
                <div
                  className={`flex flex-col items-center mb-6 lg:mb-0 ${
                    index % 2 === 0 ? "lg:ml-8" : "lg:mr-8"
                  }`}
                >
                  <div
                    className={`z-10 flex items-center justify-center w-16 h-16 rounded-full ${step.color} shadow-lg`}
                  >
                    <step.icon className="h-8 w-8" />
                  </div>
                  {index !== steps.length - 1 && (
                    <div className="lg:hidden w-0.5 h-12 bg-gradient-to-b from-primary/50 to-secondary/50 mt-4"></div>
                  )}
                </div>

                <div className="lg:w-5/12">
                  <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group">
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{step.description}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
