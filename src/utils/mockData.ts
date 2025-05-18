
import { User, Match, Message, Skill, LearningGoal } from "../types";

export const skillsList: Skill[] = [
  { id: '1', name: 'JavaScript', level: 'intermediate' },
  { id: '2', name: 'React', level: 'beginner' },
  { id: '3', name: 'Node.js', level: 'intermediate' },
  { id: '4', name: 'Python', level: 'advanced' },
  { id: '5', name: 'Machine Learning', level: 'beginner' },
  { id: '6', name: 'Data Science', level: 'intermediate' },
  { id: '7', name: 'UI/UX Design', level: 'expert' },
  { id: '8', name: 'TypeScript', level: 'advanced' },
  { id: '9', name: 'GraphQL', level: 'beginner' },
  { id: '10', name: 'Docker', level: 'intermediate' },
];

export const learningGoalsList: LearningGoal[] = [
  { id: '1', name: 'Master React Hooks', description: 'Understand and implement all React hooks effectively' },
  { id: '2', name: 'Build a Full-Stack App', description: 'Create a complete application with frontend and backend' },
  { id: '3', name: 'Learn Machine Learning Basics', description: 'Understand fundamental ML concepts and algorithms' },
  { id: '4', name: 'Mobile Development with React Native', description: 'Build cross-platform mobile applications' },
  { id: '5', name: 'Master Data Structures', description: 'Implement and understand common data structures' },
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Full-stack developer passionate about React and Node.js',
    skills: [skillsList[0], skillsList[1], skillsList[2]],
    learningGoals: [learningGoalsList[0], learningGoalsList[4]],
    timezone: 'America/New_York',
    joinDate: new Date('2023-01-15'),
  },
  {
    id: '2',
    name: 'Sam Taylor',
    email: 'sam@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    bio: 'Data scientist with interest in machine learning and AI',
    skills: [skillsList[3], skillsList[5], skillsList[4]],
    learningGoals: [learningGoalsList[2]],
    timezone: 'America/Chicago',
    joinDate: new Date('2023-02-20'),
  },
  {
    id: '3',
    name: 'Jordan Lee',
    email: 'jordan@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'UI/UX designer transitioning to frontend development',
    skills: [skillsList[6], skillsList[1]],
    learningGoals: [learningGoalsList[0], learningGoalsList[1]],
    timezone: 'Europe/London',
    joinDate: new Date('2023-01-05'),
  },
  {
    id: '4',
    name: 'Morgan Smith',
    email: 'morgan@example.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
    bio: 'Backend engineer focused on scalable architecture',
    skills: [skillsList[2], skillsList[7], skillsList[9]],
    learningGoals: [learningGoalsList[1], learningGoalsList[3]],
    timezone: 'America/Los_Angeles',
    joinDate: new Date('2023-03-10'),
  },
  {
    id: '5',
    name: 'Riley Carter',
    email: 'riley@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Frontend developer with design background',
    skills: [skillsList[0], skillsList[7], skillsList[1]],
    learningGoals: [learningGoalsList[3]],
    timezone: 'Asia/Tokyo',
    joinDate: new Date('2023-02-01'),
  },
];

export const mockMatches: Match[] = [
  {
    id: '1',
    users: ['1', '3'],
    matchScore: 0.89,
    matchReason: 'Both are interested in React and frontend development',
    createdAt: new Date('2023-04-05'),
    status: 'accepted',
  },
  {
    id: '2',
    users: ['1', '5'],
    matchScore: 0.76,
    matchReason: 'Common interests in JavaScript and TypeScript',
    createdAt: new Date('2023-04-10'),
    status: 'pending',
  },
  {
    id: '3',
    users: ['2', '4'],
    matchScore: 0.82,
    matchReason: 'Complementary skills in backend and data science',
    createdAt: new Date('2023-04-15'),
    status: 'accepted',
  },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    matchId: '1',
    senderId: '1',
    content: 'Hi Jordan! I saw you\'re learning React too. How\'s your progress?',
    timestamp: new Date('2023-04-06T10:30:00'),
    read: true,
  },
  {
    id: '2',
    matchId: '1',
    senderId: '3',
    content: 'Hey Alex! I\'m just getting started with hooks. Do you have any good resources to recommend?',
    timestamp: new Date('2023-04-06T10:35:00'),
    read: true,
  },
  {
    id: '3',
    matchId: '1',
    senderId: '1',
    content: 'Definitely! React docs are great, but I also like Egghead.io courses. Want to work through some examples together?',
    timestamp: new Date('2023-04-06T10:38:00'),
    read: true,
  },
  {
    id: '4',
    matchId: '1',
    senderId: '3',
    content: 'That would be awesome! When are you free this week?',
    timestamp: new Date('2023-04-06T10:40:00'),
    read: false,
  },
  {
    id: '5',
    matchId: '3',
    senderId: '2',
    content: 'Hello Morgan, I see you\'re interested in scalable architectures. I\'m working on a data pipeline that needs to scale. Any thoughts?',
    timestamp: new Date('2023-04-16T14:20:00'),
    read: true,
  },
  {
    id: '6',
    matchId: '3',
    senderId: '4',
    content: 'Hi Sam! I\'d recommend looking into Kubernetes for that. Have you used it before?',
    timestamp: new Date('2023-04-16T14:25:00'),
    read: true,
  },
];

// Helper function to get current user (for demo)
export const getCurrentUser = (): User => mockUsers[0];

// Helper function to get a user by ID
export const getUserById = (id: string): User | undefined => 
  mockUsers.find(user => user.id === id);

// Helper function to get matches for a user
export const getMatchesForUser = (userId: string): Match[] => 
  mockMatches.filter(match => match.users.includes(userId));

// Helper function to get messages for a match
export const getMessagesForMatch = (matchId: string): Message[] => 
  mockMessages.filter(message => message.matchId === matchId);

// Helper function to get matched users for current user
export const getMatchedUsers = (currentUserId: string): User[] => {
  const matches = getMatchesForUser(currentUserId);
  return matches
    .filter(match => match.status === 'accepted')
    .map(match => {
      const matchedUserId = match.users.find(id => id !== currentUserId);
      return matchedUserId ? getUserById(matchedUserId) : undefined;
    })
    .filter((user): user is User => user !== undefined);
};

// Helper to get skill badge color
export const getSkillBadgeColor = (skillName: string): string => {
  const colors = ['purple', 'blue', 'green', 'orange', 'pink'];
  // Simple hash function to assign a consistent color for the same skill
  const hash = skillName.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  return colors[hash % colors.length];
};
