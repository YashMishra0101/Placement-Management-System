
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
  },
  {
    title: "Get Approved",
    description:
      "Admin reviews your details and approves your account, giving you full access to the platform.",
    icon: CheckCircle,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Apply or Post Jobs",
    description:
      "Students can apply for jobs, companies can post new openings. The platform matches eligible candidates.",
    icon: Briefcase,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Track Progress",
    description:
      "Monitor application status, manage interviews, and track placement results all in one place.",
    icon: ClipboardCheck,
    color: "bg-orange-100 text-orange-600",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple 4-step process makes placement management easy for
            everyone involved.
          </p>
        </div>

        <div className="mt-20 relative">
          {/* Line connecting steps */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative mb-12 lg:mb-24 ${
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
                    className={`z-10 flex items-center justify-center w-16 h-16 rounded-full ${step.color}`}
                  >
                    <step.icon className="h-8 w-8" />
                  </div>
                  {index !== steps.length - 1 && (
                    <div className="lg:hidden w-0.5 h-12 bg-gray-200 mt-4"></div>
                  )}
                </div>

                <div className="lg:w-5/12">
                  <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{step.description}</p>
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
