import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaArrowRight } from "react-icons/fa";

const CTA: React.FC = () => {
  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--primary-700), var(--primary-800))",
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute -right-5 -top-5 w-40 h-40 bg-white rounded-full"></div>
        <div className="absolute left-1/4 top-1/3 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute right-1/3 bottom-1/4 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute left-10 bottom-10 w-32 h-32 bg-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Find Your Dream Home?
          </h2>

          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto">
            Join thousands of satisfied customers who found their perfect
            property. Start your search today!
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/properties"
              className="btn bg-white text-primary-700 hover:bg-gray-100 font-medium px-8 py-4 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <FaSearch className="mr-2" /> Browse Properties
            </Link>

            <Link
              to="/contact"
              className="btn bg-transparent border-2 border-white hover:bg-white hover:text-primary-700 font-medium px-8 py-4 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105"
            >
              Contact Us <FaArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold">1000+</div>
              <div className="text-white/80">Properties Available</div>
            </div>

            <div className="w-px h-16 bg-white/20 hidden sm:block"></div>

            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold">24/7</div>
              <div className="text-white/80">Customer Support</div>
            </div>

            <div className="w-px h-16 bg-white/20 hidden sm:block"></div>

            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold">100%</div>
              <div className="text-white/80">Satisfaction Guarantee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave shape at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 text-gray-50 fill-current"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C67.44,118.92,143.94,111.31,213.34,92.83Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default CTA;
