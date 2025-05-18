
import React from 'react';
import { Button } from "@/components/ui/button";

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-skillsync-purple text-white">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Find Your Learning Partner?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto text-skillsync-soft-purple">
          Join SkillSync today and connect with peers who share your learning journey.
        </p>
        <Button className="bg-white text-skillsync-purple hover:bg-skillsync-soft-purple">
          Get Started Now
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
