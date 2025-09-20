import CallToAction from "../components/sections/CallToAction";
import FeaturedCategorySection from "../components/sections/FeaturedCategorySection";
import Hero from "../components/sections/Hero";
import MyChoice from "../components/sections/MyChoice";
import NewsletterSection from "../components/sections/NewsletterSection";
import Products  from "./Products";
import React from "react";
import Testimonials from "../components/sections/Testimonials";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Afritabs - Forestry & Poultry Services</title>
        <meta name="description" content="Sustainable timber & poultry solutions in South Africa" />
        <meta name="keywords" content="forestry, poultry, South Africa, timber, chicken, eggs" />
      </Helmet>
      <Hero />
      <FeaturedCategorySection />
      <Products />
      <WhyChooseUs />
      <MyChoice />
      <Testimonials />
      <NewsletterSection />
      <CallToAction />
    </div>
  );
};

export default Home;