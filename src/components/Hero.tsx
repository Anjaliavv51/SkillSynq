
import React from 'react';
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-skillsync-bg-light">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none animate-enter">
              Connect, Learn, <span className="text-skillsync-purple">Grow Together</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl animate-enter" style={{ animationDelay: "0.1s" }}>
              Find the perfect learning partner based on your skills, goals, and schedule.
            </p>
          </div>
          <div className="space-x-4 animate-enter" style={{ animationDelay: "0.2s" }}>
            <Button className="bg-skillsync-purple hover:bg-skillsync-light-purple text-white">Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
