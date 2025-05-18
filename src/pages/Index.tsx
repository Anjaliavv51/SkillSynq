
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import MatchesList from '@/components/MatchesList';

const exampleMatches = [
  {
    name: "Jordan Lee",
    avatar: "https://i.pravatar.cc/150?img=33",
    title: "Frontend Developer",
    skills: ["React", "TypeScript", "TailwindCSS"],
    learningGoals: ["Node.js", "GraphQL", "AWS"],
    schedule: "Evenings & Weekends",
    matchScore: 95
  },
  {
    name: "Taylor Smith",
    avatar: "https://i.pravatar.cc/150?img=23",
    title: "UX/UI Designer",
    skills: ["Figma", "User Research", "Prototyping"],
    learningGoals: ["React", "Frontend Development", "Animation"],
    schedule: "Weekday Afternoons",
    matchScore: 87
  },
  {
    name: "Morgan Rivers",
    avatar: "https://i.pravatar.cc/150?img=12",
    title: "Data Scientist",
    skills: ["Python", "Machine Learning", "Statistics"],
    learningGoals: ["JavaScript", "Web Development", "Data Visualization"],
    schedule: "Morning Hours",
    matchScore: 82
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight">Find Your Perfect Learning Match</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Here are some example matches based on skills and learning goals
              </p>
            </div>
            <MatchesList matches={exampleMatches} />
          </div>
        </section>
        
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
