
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { users, video, link, fileText } from "lucide-react";

interface LearningRoom {
  id: string;
  name: string;
  description: string;
  participants: number;
  tags: string[];
  isLive: boolean;
}

const SAMPLE_ROOMS: LearningRoom[] = [
  {
    id: "1",
    name: "React Hooks Deep Dive",
    description: "Exploring advanced React hooks patterns and custom hooks",
    participants: 8,
    tags: ["React", "JavaScript", "Frontend"],
    isLive: true,
  },
  {
    id: "2",
    name: "Data Structures Study Group",
    description: "Weekly practice with common data structures and algorithms",
    participants: 5,
    tags: ["Algorithms", "Computer Science", "Interview Prep"],
    isLive: false,
  },
  {
    id: "3",
    name: "UX Design Principles",
    description: "Discussing user experience best practices and case studies",
    participants: 12,
    tags: ["Design", "UX", "User Research"],
    isLive: true,
  },
];

const GroupLearning = () => {
  const [rooms, setRooms] = useState<LearningRoom[]>(SAMPLE_ROOMS);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomDescription, setNewRoomDescription] = useState("");
  const [newRoomTags, setNewRoomTags] = useState("");

  const handleCreateRoom = () => {
    if (!newRoomName) return;
    
    const newRoom: LearningRoom = {
      id: Date.now().toString(),
      name: newRoomName,
      description: newRoomDescription,
      participants: 1,
      tags: newRoomTags.split(',').map(tag => tag.trim()).filter(Boolean),
      isLive: true,
    };
    
    setRooms([newRoom, ...rooms]);
    setNewRoomName("");
    setNewRoomDescription("");
    setNewRoomTags("");
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <users className="h-5 w-5" />
              Group Learning Rooms
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">Create Room</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a learning room</DialogTitle>
                  <DialogDescription>
                    Create a virtual space for group learning and collaboration.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="room-name" className="text-sm font-medium">Room Name</label>
                    <Input 
                      id="room-name" 
                      value={newRoomName}
                      onChange={(e) => setNewRoomName(e.target.value)}
                      placeholder="e.g. JavaScript Study Group" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="room-desc" className="text-sm font-medium">Description</label>
                    <Textarea 
                      id="room-desc" 
                      value={newRoomDescription}
                      onChange={(e) => setNewRoomDescription(e.target.value)}
                      placeholder="What will this group focus on?" 
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="room-tags" className="text-sm font-medium">Tags (comma separated)</label>
                    <Input 
                      id="room-tags" 
                      value={newRoomTags}
                      onChange={(e) => setNewRoomTags(e.target.value)}
                      placeholder="e.g. JavaScript, WebDev, Beginners" 
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateRoom}>Create Room</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {rooms.map((room) => (
              <Card key={room.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{room.name}</CardTitle>
                    {room.isLive && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                        Live
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-sm line-clamp-2">{room.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {[...Array(Math.min(room.participants, 3))].map((_, i) => (
                        <Avatar key={i} className="border-2 border-background h-8 w-8">
                          <AvatarFallback className="text-xs">U{i+1}</AvatarFallback>
                        </Avatar>
                      ))}
                      {room.participants > 3 && (
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted border-2 border-background text-xs font-medium">
                          +{room.participants - 3}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <video className="h-4 w-4" />
                      </Button>
                      <Button variant="default" size="sm">
                        Join Room
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {room.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupLearning;
