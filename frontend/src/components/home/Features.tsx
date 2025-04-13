import React from "react";
import {
  FaHome,
  FaBuilding,
  FaLandmark,
  FaMoneyBillWave,
  FaChevronRight,
} from "react-icons/fa";

const Features: React.FC = () => {
  const features = [
    {
      icon: <FaHome className="text-3xl" />,
      title: "Wide Range of Properties",
      description:
        "Browse through thousands of listings to find the perfect match for your needs and budget.",
      link: "/properties",
    },
    {
      icon: <FaBuilding className="text-3xl" />,
      title: "Top Rated Agents",
      description:
        "Our agents are experienced professionals dedicated to providing exceptional service.",
      link: "/agents",
    },
    {
      icon: <FaLandmark className="text-3xl" />,
      title: "Trusted by Thousands",
      description:
        "Join thousands of satisfied customers who found their dream properties through our platform.",
      link: "/testimonials",
    },
    {
      icon: <FaMoneyBillWave className="text-3xl" />,
      title: "Competitive Prices",
      description:
        "We ensure our listings offer the best value in the market with transparent pricing.",
      link: "/about",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Why Choose <span className="text-primary-600">Urban Square</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">
            We're dedicated to providing the best real estate experience with
            exceptional properties and service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-box group hover:bg-primary-600 hover:text-white transition-all duration-500"
            >
              <div className="feature-icon group-hover:bg-white group-hover:text-primary-600 transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4 group-hover:text-white/90 transition-all duration-300">
                {feature.description}
              </p>
              <a
                href={feature.link}
                className="inline-flex items-center text-primary-600 font-medium group-hover:text-white transition-all duration-300"
              >
                Learn More{" "}
                <FaChevronRight className="ml-2 text-sm transition-transform group-hover:translate-x-1 duration-300" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-primary-600 font-bold text-4xl">10K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-primary-600 font-bold text-4xl">500+</div>
            <div className="text-gray-600">Properties Sold</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-primary-600 font-bold text-4xl">99%</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
