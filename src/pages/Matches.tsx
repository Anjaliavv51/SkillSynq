
import { useState, useEffect } from 'react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import NavBar from '@/components/NavBar';
import UserCard from '@/components/UserCard';
import SkillBadge from '@/components/SkillBadge';
import { useToast } from "@/hooks/use-toast";
import { 
  getCurrentUser,
  getMatchesForUser,
  getUserById,
  mockUsers,
  skillsList
} from '@/utils/mockData';
import { Search } from 'lucide-react';

const Matches = () => {
  const currentUser = getCurrentUser();
  const userMatches = getMatchesForUser(currentUser.id);
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("suggested");
  const [searchQuery, setSearchQuery] = useState("");
  const [minimumMatchScore, setMinimumMatchScore] = useState([60]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
  // Filter users to exclude current user and already matched users
  const allMatchedUserIds = userMatches.map(match => 
    match.users.find(id => id !== currentUser.id) as string
  );
  
  const suggestedUsers = mockUsers
    .filter(user => 
      user.id !== currentUser.id && 
      !allMatchedUserIds.includes(user.id)
    )
    .map(user => {
      // Generate a match score and reason
      // This would be done by the AI in the real app
      const commonSkills = user.skills.filter(skill => 
        currentUser.skills.some(s => s.id === skill.id)
      );
      
      const commonGoals = user.learningGoals.filter(goal => 
        currentUser.learningGoals.some(g => g.name.toLowerCase().includes(goal.name.toLowerCase()) ||
                                         goal.name.toLowerCase().includes(g.name.toLowerCase()))
      );
      
      let matchScore = 0.5; // Base score
      if (commonSkills.length > 0) {
        matchScore += 0.1 * commonSkills.length;
      }
      if (commonGoals.length > 0) {
        matchScore += 0.15 * commonGoals.length;
      }
      // Cap at 0.95
      matchScore = Math.min(matchScore, 0.95);
      
      let matchReason = "Based on your shared interests";
      if (commonSkills.length > 0) {
        matchReason = `You both have skills in ${commonSkills.map(s => s.name).join(", ")}`;
      } else if (commonGoals.length > 0) {
        matchReason = `You have similar learning goals`;
      }
      
      return {
        user,
        matchScore,
        matchReason
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
  
  const pendingMatches = userMatches
    .filter(match => match.status === 'pending')
    .map(match => {
      const otherUserId = match.users.find(id => id !== currentUser.id);
      const otherUser = otherUserId ? getUserById(otherUserId) : undefined;
      return otherUser ? {
        match,
        user: otherUser
      } : null;
    })
    .filter(Boolean);
  
  const connectedMatches = userMatches
    .filter(match => match.status === 'accepted')
    .map(match => {
      const otherUserId = match.users.find(id => id !== currentUser.id);
      const otherUser = otherUserId ? getUserById(otherUserId) : undefined;
      return otherUser ? {
        match,
        user: otherUser
      } : null;
    })
    .filter(Boolean);
  
  const handleConnect = (userId: string) => {
    toast({
      title: "Connection request sent!",
      description: "We'll notify you when they respond."
    });
  };
  
  const filteredSuggestions = suggestedUsers
    .filter(({ user, matchScore }) => {
      // Filter by search query
      if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !user.skills.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }
      
      // Filter by match score
      if ((matchScore * 100) < minimumMatchScore[0]) {
        return false;
      }
      
      // Filter by selected skills
      if (selectedSkills.length > 0 && 
          !user.skills.some(skill => selectedSkills.includes(skill.id))) {
        return false;
      }
      
      return true;
    });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container-lg py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Find Learning Partners</h1>
        
        <Tabs defaultValue="suggested" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="suggested">Suggested</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingMatches.length})</TabsTrigger>
            <TabsTrigger value="connected">Connected ({connectedMatches.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="suggested" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Find Perfect Matches</CardTitle>
                <CardDescription>Filter potential learning partners based on your preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="search">Search by name or skill</Label>
                    <div className="relative mt-1">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search users or skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="match-score">Minimum match score: {minimumMatchScore}%</Label>
                    <Slider
                      id="match-score"
                      min={0}
                      max={100}
                      step={5}
                      value={minimumMatchScore}
                      onValueChange={setMinimumMatchScore}
                      className="mt-3"
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Filter by skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skillsList.map((skill) => (
                      <button
                        key={skill.id}
                        onClick={() => {
                          if (selectedSkills.includes(skill.id)) {
                            setSelectedSkills(selectedSkills.filter(id => id !== skill.id));
                          } else {
                            setSelectedSkills([...selectedSkills, skill.id]);
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedSkills.includes(skill.id)
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {skill.name}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Results */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Suggested Matches ({filteredSuggestions.length})</h2>
              {filteredSuggestions.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredSuggestions.map(({ user, matchScore, matchReason }) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      matchScore={matchScore}
                      matchReason={matchReason}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-6">
                      <h3 className="font-medium text-xl mb-2">No matches found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your filters or search criteria
                      </p>
                      <Button onClick={() => {
                        setSearchQuery("");
                        setMinimumMatchScore([0]);
                        setSelectedSkills([]);
                      }}>Clear filters</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4">
            {pendingMatches.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pendingMatches.map(item => (
                  <UserCard
                    key={item!.user.id}
                    user={item!.user}
                    matchScore={item!.match.matchScore}
                    matchReason={item!.match.matchReason}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-6">
                    <h3 className="font-medium text-xl mb-2">No pending requests</h3>
                    <p className="text-muted-foreground mb-4">
                      You don't have any pending connection requests
                    </p>
                    <Button onClick={() => setActiveTab("suggested")}>
                      Find learning partners
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="connected" className="space-y-4">
            {connectedMatches.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {connectedMatches.map(item => (
                  <UserCard
                    key={item!.user.id}
                    user={item!.user}
                    matchScore={item!.match.matchScore}
                    matchReason={item!.match.matchReason}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-6">
                    <h3 className="font-medium text-xl mb-2">No connections yet</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't connected with any learning partners
                    </p>
                    <Button onClick={() => setActiveTab("suggested")}>
                      Find learning partners
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Matches;
