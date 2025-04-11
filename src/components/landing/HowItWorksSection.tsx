
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
    <section className="py-14 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">
            Our simple 4-step process makes placement management easy for
            everyone involved.
          </p>
        </div>

        <div className="mt-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`mb-16 lg:mb-24 ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="lg:flex items-center gap-12">
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                  <div className="relative">
                    <div className="bg-white p-3 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                      <div className="relative overflow-hidden rounded-xl aspect-video">
                        <img 
                          src={step.image} 
                          alt={step.title}
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>
                    <div className={`absolute -top-6 -right-6 md:top-4 md:-right-6 w-16 h-16 rounded-full flex items-center justify-center ${step.color} shadow-lg z-10`}>
                      <span className="text-2xl font-bold">{index + 1}</span>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-1/2">
                  <div className="p-6 md:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center mr-4`}>
                        <step.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-lg text-gray-600">{step.description}</p>
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
