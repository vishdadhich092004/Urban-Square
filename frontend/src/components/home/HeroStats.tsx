const HeroStats = () => {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      <div className="bg-background/5 backdrop-blur-sm py-2 px-4 rounded-full border border-white/10">
        <span className="text-sm font-medium text-white">
          50,000+ Properties
        </span>
      </div>
      <div className="bg-background/5 backdrop-blur-sm py-2 px-4 rounded-full border border-white/10">
        <span className="text-sm font-medium text-white">100+ Cities</span>
      </div>
      <div className="bg-background/5 backdrop-blur-sm py-2 px-4 rounded-full border border-white/10">
        <span className="text-sm font-medium text-white">
          Trusted by 10,000+ Clients
        </span>
      </div>
    </div>
  );
};

export default HeroStats;
