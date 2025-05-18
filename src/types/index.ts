
export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  skills: Skill[];
  learningGoals: LearningGoal[];
  availability?: Availability;
  timezone?: string;
  joinDate: Date;
};

export type Skill = {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
};

export type LearningGoal = {
  id: string;
  name: string;
  description?: string;
  targetDate?: Date;
};

export type Availability = {
  monday?: TimeSlot[];
  tuesday?: TimeSlot[];
  wednesday?: TimeSlot[];
  thursday?: TimeSlot[];
  friday?: TimeSlot[];
  saturday?: TimeSlot[];
  sunday?: TimeSlot[];
};

export type TimeSlot = {
  start: string; // 24-hour format, e.g., "09:00"
  end: string; // 24-hour format, e.g., "17:00"
};

export type Match = {
  id: string;
  users: [string, string]; // user IDs
  matchScore: number;
  matchReason: string;
  createdAt: Date;
  status: 'pending' | 'accepted' | 'rejected';
};

export type Message = {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
};
