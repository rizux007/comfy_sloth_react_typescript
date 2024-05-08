import React from "react";
import { Contact, FeaturedProducts, Hero, Services } from "../components";

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  );
};

export default HomePage;
