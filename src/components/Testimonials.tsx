
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Web Developer",
      comment: "SkillSync helped me find a coding buddy who knew exactly what I needed to learn. We've been meeting weekly for three months now!",
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
      name: "Sarah Chen",
      role: "UX Designer",
      comment: "I was looking to improve my UI design skills, and SkillSync matched me with someone who had complementary skills. It's been incredible!",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      name: "Michael Wong",
      role: "Data Analyst",
      comment: "The matching algorithm is spot on. I found someone who could teach me Python while I helped them with data visualization.",
      avatar: "https://i.pravatar.cc/150?img=8"
    }
  ];

  return (
    <section className="py-16 bg-skillsync-bg-light">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">What Our Users Say</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Join thousands of learners who have found their perfect learning partners
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-sm animate-enter" style={{ animationDelay: `${0.1 * index}s` }}>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic">&ldquo;{testimonial.comment}&rdquo;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
