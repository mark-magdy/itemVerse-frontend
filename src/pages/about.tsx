import React from "react";
import TeamSection from "../components/TeamSection"; 

const About = () => {
  return (
    <div className="bg-[url('/images/Backgroundabout.jpg')] bg-cover bg-center min-h-screen">
      <div className="bg-white/70 py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>

        <p className="max-w-2xl mx-auto text-center text-muted-foreground mb-12">
          Welcome to our company! We’re passionate about innovation and excellence.
        </p>

        {/* Leadership Team Section */}
        <TeamSection />
      </div>
    </div>
  );
};

export default About; 
