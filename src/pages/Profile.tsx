
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import SkillBadge from '@/components/SkillBadge';
import NavBar from '@/components/NavBar';
import { getCurrentUser, getUserById } from '@/utils/mockData';
import { Edit } from 'lucide-react';

const Profile = () => {
  const { userId } = useParams();
  const currentUser = getCurrentUser();
  const isCurrentUser = !userId || userId === currentUser.id;
  const user = isCurrentUser ? currentUser : getUserById(userId || '');
  
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="container-lg py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">User not found</h1>
          <p className="text-muted-foreground">The user you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container-lg py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            {isCurrentUser ? 'Your Profile' : `${user.name}'s Profile`}
          </h1>
          {isCurrentUser && (
            <Button className="mt-4 md:mt-0" asChild>
              <a href="/profile/edit">
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </a>
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Profile Summary */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-2xl">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mb-1">{user.name}</CardTitle>
              <CardDescription className="text-sm">
                {user.timezone && (
                  <div className="mt-2">
                    <span className="block text-muted-foreground">Timezone</span>
                    {user.timezone}
                  </div>
                )}
                <div className="mt-2">
                  <span className="block text-muted-foreground">Joined</span>
                  {new Date(user.joinDate).toLocaleDateString()}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.bio && (
                <div className="mb-6">
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">About</h3>
                  <p className="text-sm">{user.bio}</p>
                </div>
              )}
              
              {user.skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill) => (
                      <SkillBadge
                        key={skill.id}
                        name={skill.name}
                        level={skill.level}
                        showLevel={true}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {!isCurrentUser && (
                <div className="mt-6">
                  <Button className="w-full">Connect</Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Right Column - Detailed Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="learningGoals">Learning Goals</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Goals</CardTitle>
                    <CardDescription>
                      What {isCurrentUser ? 'you are' : `${user.name} is`} currently focused on learning
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.learningGoals.length > 0 ? (
                      <ul className="space-y-4">
                        {user.learningGoals.map((goal) => (
                          <li key={goal.id} className="p-4 border rounded-md">
                            <h3 className="font-medium text-lg">{goal.name}</h3>
                            {goal.description && (
                              <p className="text-muted-foreground mt-1">{goal.description}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No learning goals defined yet.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="learningGoals" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Goals</CardTitle>
                    <CardDescription>
                      Detailed overview of what {isCurrentUser ? 'you want' : `${user.name} wants`} to learn
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.learningGoals.length > 0 ? (
                      <ul className="space-y-4">
                        {user.learningGoals.map((goal) => (
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
                        {isCurrentUser && (
                          <Button className="mt-4" asChild>
                            <a href="/profile/edit">Add learning goals</a>
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="availability" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Availability</CardTitle>
                    <CardDescription>
                      When {isCurrentUser ? 'you are' : `${user.name} is`} available for learning sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.availability ? (
                      <div className="grid gap-2">
                        {Object.entries(user.availability).map(([day, slots]) => (
                          <div key={day} className="p-4 border rounded-md">
                            <h3 className="font-medium capitalize">{day}</h3>
                            {slots && slots.length > 0 ? (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {slots.map((slot, index) => (
                                  <div key={index} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                                    {slot.start} - {slot.end}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-muted-foreground mt-1">Not available</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">No availability information provided.</p>
                        {isCurrentUser && (
                          <Button className="mt-4" asChild>
                            <a href="/profile/edit">Set availability</a>
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
