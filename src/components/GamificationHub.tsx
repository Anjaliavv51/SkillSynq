
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { award, star, clock, messageSquare, check, helpingHand } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  achieved: boolean;
  progress?: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress: number;
  maxProgress: number;
}

const GamificationHub = () => {
  const level = 3;
  const currentXP = 350;
  const nextLevelXP = 500;
  const xpProgress = (currentXP / nextLevelXP) * 100;
  
  const badges: Badge[] = [
    { 
      id: "1", 
      name: "Fast Learner", 
      description: "Complete 5 learning sessions in a week",
      icon: <clock className="h-6 w-6" />,
      achieved: true 
    },
    { 
      id: "2", 
      name: "Helpful Mentor", 
      description: "Help 10 peers with their learning goals",
      icon: <helpingHand className="h-6 w-6" />,
      achieved: false,
      progress: 70
    },
    { 
      id: "3", 
      name: "Discussion Master", 
      description: "Participate in 20 group discussions",
      icon: <messageSquare className="h-6 w-6" />,
      achieved: false,
      progress: 45
    },
    { 
      id: "4", 
      name: "Goal Achiever", 
      description: "Complete 3 learning goals",
      icon: <check className="h-6 w-6" />,
      achieved: true 
    },
  ];
  
  const achievements: Achievement[] = [
    {
      id: "1",
      title: "Consistency Champion",
      description: "Log in for 7 consecutive days",
      completed: true,
      progress: 7,
      maxProgress: 7
    },
    {
      id: "2",
      title: "Network Builder",
      description: "Connect with 10 learning partners",
      completed: false,
      progress: 7,
      maxProgress: 10
    },
    {
      id: "3",
      title: "Knowledge Sharer",
      description: "Share 5 learning resources with peers",
      completed: false,
      progress: 3,
      maxProgress: 5
    }
  ];
  
  // Top learners would typically come from an API
  const topLearners = [
    { name: "Alex Johnson", points: 2340, avatar: null },
    { name: "Sarah Miller", points: 2105, avatar: null },
    { name: "David Chen", points: 1870, avatar: null },
    { name: "Emma Wilson", points: 1620, avatar: null },
    { name: "Michael Brown", points: 1580, avatar: null },
  ];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <award className="h-5 w-5" /> 
            Your Learning Journey
          </CardTitle>
          <CardDescription>Track your progress and earn rewards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Level and XP progress */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <div>
                <h4 className="font-semibold text-lg">Level {level}</h4>
                <p className="text-sm text-muted-foreground">Learning Pathfinder</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium">{currentXP} / {nextLevelXP} XP</span>
                <p className="text-sm text-muted-foreground">to Level {level + 1}</p>
              </div>
            </div>
            <Progress value={xpProgress} className="h-2" />
          </div>
          
          {/* Badges section */}
          <div>
            <h3 className="font-semibold mb-3">Your Badges</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {badges.map(badge => (
                <TooltipProvider key={badge.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className={`flex flex-col items-center p-3 rounded-lg border ${
                        badge.achieved ? 'bg-primary/5 border-primary/20' : 'bg-muted/50'
                      }`}>
                        <div className={`rounded-full p-3 mb-2 ${
                          badge.achieved ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                        }`}>
                          {badge.icon}
                        </div>
                        <span className="text-sm font-medium text-center">{badge.name}</span>
                        {!badge.achieved && badge.progress && (
                          <Progress value={badge.progress} className="h-1 w-full mt-2" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{badge.description}</p>
                      {!badge.achieved && badge.progress && (
                        <p className="text-xs mt-1">{badge.progress}% complete</p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
          
          {/* Achievements */}
          <div>
            <h3 className="font-semibold mb-3">Achievements</h3>
            <div className="space-y-3">
              {achievements.map(achievement => (
                <div key={achievement.id} className="flex items-center">
                  <div className={`rounded-full p-1 mr-3 ${
                    achievement.completed ? 'bg-green-100 text-green-800' : 'bg-muted'
                  }`}>
                    {achievement.completed ? (
                      <check className="h-4 w-4" />
                    ) : (
                      <span className="block h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{achievement.title}</span>
                      <span className="text-sm">
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <div className="mt-1">
                      <Progress 
                        value={(achievement.progress / achievement.maxProgress) * 100} 
                        className="h-1" 
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Leaderboard */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Top Learners</h3>
              <Button variant="outline" size="sm">View Full Leaderboard</Button>
            </div>
            <div className="space-y-2">
              {topLearners.map((learner, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary font-medium">
                      {index + 1}
                    </div>
                    <span>{learner.name}</span>
                  </div>
                  <div className="flex items-center">
                    <star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{learner.points}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamificationHub;
