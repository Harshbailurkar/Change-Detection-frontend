import React from "react";
import Hero from "../../components/hero/Hero";
import WhatWeDo from "../../components/what we do/WhatWeDo";
import Demo from "../../components/Demo/Demo";

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <WhatWeDo />
      <Demo />
    </div>
  );
};

export default Home;
