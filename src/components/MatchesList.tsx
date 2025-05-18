
import React from 'react';
import UserProfileCard from './UserProfileCard';

interface MatchesListProps {
  matches: Array<{
    name: string;
    avatar: string;
    title: string;
    skills: string[];
    learningGoals: string[];
    schedule: string;
    matchScore: number;
  }>;
}

const MatchesList: React.FC<MatchesListProps> = ({ matches }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {matches.map((match, index) => (
        <UserProfileCard key={index} user={match} />
      ))}
    </div>
  );
};

export default MatchesList;
