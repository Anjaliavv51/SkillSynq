
import { User } from '@/types';
import SkillBadge from './SkillBadge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserCardProps {
  user: User;
  matchScore?: number;
  matchReason?: string;
}

const UserCard = ({ user, matchScore, matchReason }: UserCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h4 className="font-semibold text-lg">{user.name}</h4>
          {matchScore && (
            <div className="flex items-center">
              <div className="text-sm text-muted-foreground">Match score:</div>
              <div className="ml-1 px-1.5 py-0.5 bg-primary/10 rounded text-primary text-xs font-medium">
                {Math.round(matchScore * 100)}%
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {user.bio && (
          <p className="text-sm text-gray-600 mb-4">{user.bio}</p>
        )}
        
        {user.skills.length > 0 && (
          <div className="mb-4">
            <h5 className="text-sm font-semibold mb-2">Skills</h5>
            <div className="flex flex-wrap gap-2">
              {user.skills.slice(0, 3).map((skill) => (
                <SkillBadge 
                  key={skill.id} 
                  name={skill.name} 
                  level={skill.level}
                  showLevel={true} 
                />
              ))}
              {user.skills.length > 3 && (
                <span className="text-xs text-gray-500 self-center">
                  +{user.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {user.learningGoals.length > 0 && (
          <div>
            <h5 className="text-sm font-semibold mb-2">Learning Goals</h5>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              {user.learningGoals.slice(0, 2).map((goal) => (
                <li key={goal.id}>{goal.name}</li>
              ))}
              {user.learningGoals.length > 2 && (
                <li className="text-gray-500">
                  +{user.learningGoals.length - 2} more goals
                </li>
              )}
            </ul>
          </div>
        )}
      </CardContent>
      {matchReason && (
        <div className="px-6 py-3 bg-secondary text-secondary-foreground text-sm">
          <strong>Why you matched:</strong> {matchReason}
        </div>
      )}
      <CardFooter className="flex justify-between bg-gray-50 py-3 px-6">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/profile/${user.id}`}>View Profile</Link>
        </Button>
        <Button size="sm" asChild>
          <Link to={`/chat/${user.id}`}>
            <MessageSquare className="h-4 w-4 mr-1" /> Message
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
