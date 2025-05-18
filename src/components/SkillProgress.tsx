
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Skill } from "@/types";
import { Activity, TrendingUp } from "lucide-react";

interface SkillProgressProps {
  skills: Skill[];
  timeframe?: "week" | "month" | "year";
}

interface ProgressData {
  name: string;
  progress: number;
  goal: number;
}

const SkillProgress = ({ skills, timeframe = "month" }: SkillProgressProps) => {
  const [progressData, setProgressData] = useState<ProgressData[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll generate sample progress data
    const data = skills.map(skill => ({
      name: skill.name,
      progress: Math.floor(Math.random() * 75) + 10, // Random progress between 10-85%
      goal: 100
    }));
    
    setProgressData(data);
  }, [skills, timeframe]);

  // Convert skill level to percentage
  const levelToPercentage = (level: string): number => {
    switch (level) {
      case 'beginner': return 25;
      case 'intermediate': return 50;
      case 'advanced': return 75;
      case 'expert': return 100;
      default: return 0;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" /> 
          Skill Progress Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        {skills.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No skills added yet. Add skills in your profile to track progress.
          </p>
        ) : (
          <div className="space-y-6">
            {/* Individual skill progress bars */}
            <div className="space-y-4">
              {skills.map(skill => (
                <div key={skill.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{skill.name}</span>
                    <span className="text-muted-foreground">{levelToPercentage(skill.level)}%</span>
                  </div>
                  <Progress value={levelToPercentage(skill.level)} className="h-2" />
                </div>
              ))}
            </div>
            
            {/* Skills analytics chart */}
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" /> 
                Learning Analytics
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillProgress;
