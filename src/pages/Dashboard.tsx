
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import NavBar from '@/components/NavBar';
import UserCard from '@/components/UserCard';
import { User, Match } from '@/types';
import { getCurrentUser, getMatchesForUser, getUserById } from '@/utils/mockData';
import { ArrowRight } from 'lucide-react';
import SkillProgress from '@/components/SkillProgress';
import GroupLearning from '@/components/GroupLearning';
import GamificationHub from '@/components/GamificationHub';
import SessionSummary from '@/components/SessionSummary';
import VideoChat from '@/components/VideoChat';
import SmartScheduler from '@/components/SmartScheduler';

const Dashboard = () => {
  const currentUser = getCurrentUser();
  const userMatches = getMatchesForUser(currentUser.id);
  
  const [activeTab, setActiveTab] = useState("overview");
  
  const pendingMatches = userMatches
    .filter(match => match.status === 'pending')
    .map(match => {
      const otherUserId = match.users.find(id => id !== currentUser.id);
      const otherUser = otherUserId ? getUserById(otherUserId) : undefined;
      return { match, user: otherUser };
    })
    .filter((item): item is { match: Match; user: User } => !!item.user);
  
  const acceptedMatches = userMatches
    .filter(match => match.status === 'accepted')
    .map(match => {
      const otherUserId = match.users.find(id => id !== currentUser.id);
      const otherUser = otherUserId ? getUserById(otherUserId) : undefined;
      return { match, user: otherUser };
    })
    .filter((item): item is { match: Match; user: User } => !!item.user);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <Link to="/matches">Find Matches</Link>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full md:w-auto flex flex-wrap">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="learningGoals">Learning Goals</TabsTrigger>
            <TabsTrigger value="groupLearning">Group Learning</TabsTrigger>
            <TabsTrigger value="gamification">Gamification</TabsTrigger>
            <TabsTrigger value="videoChat">Video Chat</TabsTrigger>
            <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
            <TabsTrigger value="aiTools">AI Tools</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            {/* Welcome Card */}
            <Card className="border-none shadow-sm bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Welcome back, {currentUser.name}!</CardTitle>
                <CardDescription className="text-primary-foreground/90">
                  Here's what's happening with your learning journey today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-white/20 p-4 rounded-md">
                    <div className="text-sm font-medium">Pending Matches</div>
                    <div className="text-2xl font-bold mt-1">{pendingMatches.length}</div>
                  </div>
                  <div className="bg-white/20 p-4 rounded-md">
                    <div className="text-sm font-medium">Active Learning Partners</div>
                    <div className="text-2xl font-bold mt-1">{acceptedMatches.length}</div>
                  </div>
                  <div className="bg-white/20 p-4 rounded-md">
                    <div className="text-sm font-medium">Learning Goals</div>
                    <div className="text-2xl font-bold mt-1">{currentUser.learningGoals.length}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Pending Matches Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pending Matches</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/matches" className="flex items-center">
                      View all <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {pendingMatches.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {pendingMatches.slice(0, 2).map(({ match, user }) => (
                      <UserCard 
                        key={match.id} 
                        user={user} 
                        matchScore={match.matchScore}
                        matchReason={match.matchReason}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No pending matches at the moment.</p>
                    <Button variant="outline" className="mt-4" asChild>
                      <Link to="/matches">Find new matches</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Skill Progress */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Skill Progress</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/skill-progress" className="flex items-center">
                      View details <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <SkillProgress skills={currentUser.skills.slice(0, 3)} />
                <div className="mt-4 text-center">
                  <Button variant="outline" asChild>
                    <Link to="/skill-progress">View All Skills</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Group Learning Preview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Group Learning</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/group-learning" className="flex items-center">
                      View all <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Join group learning sessions to collaborate with multiple peers at once.
                </p>
                <Button asChild>
                  <Link to="/group-learning">Explore Learning Rooms</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="matches" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Matches</CardTitle>
                <CardDescription>
                  View and manage all your learning partner matches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[...pendingMatches, ...acceptedMatches].map(({ match, user }) => (
                    <UserCard 
                      key={match.id} 
                      user={user} 
                      matchScore={match.matchScore}
                      matchReason={match.matchReason}
                    />
                  ))}
                  {userMatches.length === 0 && (
                    <div className="text-center py-6 col-span-full">
                      <p className="text-muted-foreground">You don't have any matches yet.</p>
                      <Button className="mt-4" asChild>
                        <Link to="/matches">Find matches</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="learningGoals" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Learning Goals</CardTitle>
                    <CardDescription>
                      Track your progress towards your learning objectives
                    </CardDescription>
                  </div>
                  <Button asChild>
                    <Link to="/profile/edit">Edit Goals</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {currentUser.learningGoals.length > 0 ? (
                  <ul className="space-y-4">
                    {currentUser.learningGoals.map(goal => (
                      <li key={goal.id} className="p-4 border rounded-md">
                        <h3 className="font-medium text-lg">{goal.name}</h3>
                        {goal.description && (
                          <p className="text-muted-foreground mt-1">{goal.description}</p>
                        )}
                        {goal.targetDate && (
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Target completion:</span>{" "}
                            {new Date(goal.targetDate).toLocaleDateString()}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No learning goals defined yet.</p>
                    <Button className="mt-4" asChild>
                      <Link to="/profile/edit">Add learning goals</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Add skill progress tracking component */}
            <SkillProgress skills={currentUser.skills} />
          </TabsContent>
          
          <TabsContent value="groupLearning" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Button asChild>
                <Link to="/group-learning">View Full Page</Link>
              </Button>
            </div>
            <GroupLearning />
          </TabsContent>
          
          <TabsContent value="gamification" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Button asChild>
                <Link to="/gamification">View Full Page</Link>
              </Button>
            </div>
            <GamificationHub />
          </TabsContent>
          
          <TabsContent value="videoChat" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Button asChild>
                <Link to="/video-chat">Open in Full Screen</Link>
              </Button>
            </div>
            <VideoChat userName={acceptedMatches[0]?.user.name} />
          </TabsContent>
          
          <TabsContent value="scheduling" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Button asChild>
                <Link to="/scheduling">Go to Scheduler</Link>
              </Button>
            </div>
            <SmartScheduler />
          </TabsContent>
          
          <TabsContent value="aiTools" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Button asChild>
                <Link to="/ai-tools">Open AI Tools</Link>
              </Button>
            </div>
            <SessionSummary />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
