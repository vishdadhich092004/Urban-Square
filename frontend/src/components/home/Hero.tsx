import BackgroundCarousel from "./BackgroundCarousel";
import SearchForm from "./SearchForm";
import HeroStats from "./HeroStats";

interface HeroProps {
  onSearch: (query: string, propertyType: string, status: string) => void;
}

const Hero = ({ onSearch }: HeroProps) => {
  return (
    <section className="relative text-white py-32 md:py-48 overflow-hidden">
      <BackgroundCarousel />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Find Your <span className="text-primary">Dream Home</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
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
