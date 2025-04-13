import React from "react";

const HeroStats: React.FC = () => {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      <div className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full">
        <span className="text-sm font-medium">50,000+ Properties</span>
      </div>
      <div className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full">
        <span className="text-sm font-medium">100+ Cities</span>
      </div>
      <div className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full">
        <span className="text-sm font-medium">Trusted by 10,000+ Clients</span>
      </div>
    </div>
  );
};

export default HeroStats;
