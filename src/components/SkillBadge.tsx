
import { getSkillBadgeColor } from '@/utils/mockData';

interface SkillBadgeProps {
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  showLevel?: boolean;
}

const SkillBadge = ({ name, level, showLevel = false }: SkillBadgeProps) => {
  const color = getSkillBadgeColor(name);
  
  return (
    <div className={`skill-badge skill-badge-${color} flex items-center gap-1`}>
      <span>{name}</span>
      {showLevel && level && (
        <span className="text-xs opacity-80">• {level.charAt(0).toUpperCase() + level.slice(1)}</span>
      )}
    </div>
  );
};

export default SkillBadge;
