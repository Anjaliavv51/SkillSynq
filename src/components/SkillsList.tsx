
import React from 'react';

interface SkillsListProps {
  skills: string[];
}

const SkillsList: React.FC<SkillsListProps> = ({ skills }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span key={index} className="skill-tag">
          {skill}
        </span>
      ))}
    </div>
  );
};

export default SkillsList;
