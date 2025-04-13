import React from "react";
import BackgroundCarousel from "./BackgroundCarousel";
import SearchForm from "./SearchForm";
import HeroStats from "./HeroStats";

interface HeroProps {
  onSearch: (query: string, propertyType: string, status: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  return (
    <section className="relative text-white py-32 md:py-48 hero overflow-hidden">
      <BackgroundCarousel />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your <span className="text-primary-400">Dream Home</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto">
            Discover the perfect property with our comprehensive listings of
            homes, apartments, and commercial spaces.
          </p>

          <SearchForm onSearch={onSearch} />
          <HeroStats />
        </div>
      </div>
    </section>
  );
};

export default Hero;
