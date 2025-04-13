import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Property } from "../types";
import apiService from "../services/api";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import FeaturedProperties from "../components/home/FeaturedProperties";
import CTA from "../components/home/CTA";

const Home: React.FC = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        const response = await apiService.properties.getAll({
          limit: 6,
          sort: "-createdAt",
        });
        if (response.success && response.data) {
          setFeaturedProperties(response.data);
        }
      } catch (error) {
        console.error("Error fetching featured properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  const handleSearch = (
    query: string,
    propertyType: string,
    status: string
  ) => {
    navigate(
      `/properties?city=${query}&propertyType=${propertyType}&status=${status}`
    );
  };

  return (
    <div>
      <Hero onSearch={handleSearch} />
      <Features />
      <FeaturedProperties properties={featuredProperties} loading={loading} />
      <CTA />
    </div>
  );
};

export default Home;
