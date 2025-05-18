
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features: React.FC = () => {
  const features = [
    {
      title: "Smart Matching",
      description: "Our AI-powered algorithm pairs you with peers who have complementary skills and learning goals.",
      icon: "🤝",
    },
    {
      title: "Skill Sharing",
      description: "Exchange knowledge and learn from each other through collaborative sessions.",
      icon: "💡",
    },
    {
      title: "Flexible Scheduling",
      description: "Find learning partners who match your availability and time preferences.",
      icon: "📅",
    },
    {
      title: "Real-time Chat",
      description: "Communicate seamlessly with your learning partners through our integrated chat system.",
      icon: "💬",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">How SkillSync Works</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Our platform makes peer-to-peer learning simple and effective
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-sm transition-all hover:shadow-md animate-enter" style={{ animationDelay: `${0.1 * index}s` }}>
              <CardHeader>
                <div className="text-3xl mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
