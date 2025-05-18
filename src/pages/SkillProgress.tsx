
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavBar from '@/components/NavBar';
import SkillProgress from '@/components/SkillProgress';
import { getCurrentUser } from '@/utils/mockData';

const SkillProgressPage = () => {
  const currentUser = getCurrentUser();
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">("month");
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Skill Progress</h1>
        </div>
        
        <Tabs defaultValue="month" value={timeframe} onValueChange={(value) => setTimeframe(value as "week" | "month" | "year")}>
          <TabsList>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
            <TabsTrigger value="year">This Year</TabsTrigger>
          </TabsList>
          
          <TabsContent value="week" className="space-y-4">
            <SkillProgress skills={currentUser.skills} timeframe="week" />
          </TabsContent>
          
          <TabsContent value="month" className="space-y-4">
            <SkillProgress skills={currentUser.skills} timeframe="month" />
          </TabsContent>
          
          <TabsContent value="year" className="space-y-4">
            <SkillProgress skills={currentUser.skills} timeframe="year" />
          </TabsContent>
        </Tabs>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Learning Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentUser.skills.map(skill => (
                <div key={skill.id} className="p-4 border rounded-md">
                  <h3 className="font-medium">{skill.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on your current {skill.level} level, we recommend focusing on {skill.level === 'beginner' ? 'fundamentals and core concepts' : 
                    skill.level === 'intermediate' ? 'advanced techniques and practical applications' : 
                    'mentoring others and working on complex projects'}.
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SkillProgressPage;
