
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SkillsList from './SkillsList';

interface UserProfileCardProps {
  user: {
    name: string;
    avatar: string;
    title: string;
    skills: string[];
    learningGoals: string[];
    schedule: string;
    matchScore: number;
  };
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  return (
    <Card className="overflow-hidden animate-enter transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-start gap-4 pb-2">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-skillsync-purple flex-shrink-0">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-xl">{user.name}</CardTitle>
          <CardDescription>{user.title}</CardDescription>
          <div className="mt-1 flex items-center">
            <span className="text-xs font-medium bg-skillsync-soft-purple text-skillsync-purple px-2 py-0.5 rounded-full">
              {user.matchScore}% Match
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-1">Skills</h4>
          <SkillsList skills={user.skills} />
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Learning Goals</h4>
          <SkillsList skills={user.learningGoals} />
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Availability</h4>
          <p className="text-sm text-muted-foreground">{user.schedule}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-skillsync-purple hover:bg-skillsync-light-purple">Connect</Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfileCard;
