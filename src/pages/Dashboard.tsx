
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MatchesList from '@/components/MatchesList';
import SkillsList from '@/components/SkillsList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const currentUser = {
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=11",
    title: "Web Developer",
    skills: ["JavaScript", "HTML", "CSS", "React"],
    learningGoals: ["TypeScript", "Node.js", "GraphQL"],
    schedule: "Evenings & Weekends"
  };

  const recommendedMatches = [
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 bg-skillsync-bg-light">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-xl">Your Profile</CardTitle>
                <CardDescription>Manage your skills and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-skillsync-purple">
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{currentUser.name}</h3>
                    <p className="text-sm text-muted-foreground">{currentUser.title}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Your Skills</h4>
                  <SkillsList skills={currentUser.skills} />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Learning Goals</h4>
                  <SkillsList skills={currentUser.learningGoals} />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Availability</h4>
                  <p className="text-sm text-muted-foreground">{currentUser.schedule}</p>
                </div>
                
                <Button className="w-full" variant="outline">Edit Profile</Button>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl">Learning Progress</CardTitle>
                <CardDescription>Track your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>TypeScript</span>
                      <span>45%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-skillsync-purple h-full rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Node.js</span>
                      <span>30%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-skillsync-purple h-full rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>GraphQL</span>
                      <span>20%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-skillsync-purple h-full rounded-full" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Recommended Matches</h2>
            <MatchesList matches={recommendedMatches} />
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Upcoming Sessions</CardTitle>
              <CardDescription>Your scheduled learning sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img src="https://i.pravatar.cc/150?img=33" alt="Jordan Lee" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium">TypeScript Basics with Jordan</h4>
                      <p className="text-sm text-muted-foreground">Tomorrow, 6:00 PM - 7:00 PM</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Join</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img src="https://i.pravatar.cc/150?img=23" alt="Taylor Smith" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium">UI/UX Principles with Taylor</h4>
                      <p className="text-sm text-muted-foreground">Sunday, 10:00 AM - 11:30 AM</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Join</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
