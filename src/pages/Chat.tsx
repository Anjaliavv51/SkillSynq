import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import NavBar from '@/components/NavBar';
import { 
  getCurrentUser, 
  getUserById, 
  getMatchesForUser, 
  getMessagesForMatch,
  mockMessages,
  mockUsers,
  mockMatches
} from '@/utils/mockData';
import { Message, User, Match } from '@/types';
import { Send } from 'lucide-react';

const Chat = () => {
  const { matchId } = useParams();
  const currentUser = getCurrentUser();
  const userMatches = getMatchesForUser(currentUser.id);
  
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [matchedUser, setMatchedUser] = useState<User | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get all matched users for the sidebar
  const matchedUsers = userMatches
    .filter(match => match.status === 'accepted')
    .map(match => {
      const otherUserId = match.users.find(id => id !== currentUser.id);
      return {
        match,
        user: otherUserId ? getUserById(otherUserId) : null
      };
    })
    .filter((item): item is { match: Match; user: User } => !!item.user);
  
  // Handle match selection
  useEffect(() => {
    // If matchId is provided in URL, select that match
    if (matchId) {
      const match = userMatches.find(m => m.id === matchId);
      if (match) {
        setSelectedMatch(match);
        const otherUserId = match.users.find(id => id !== currentUser.id);
        if (otherUserId) {
          const user = getUserById(otherUserId);
          if (user) setMatchedUser(user);
        }
      }
    } 
    // Otherwise select the first match if available
    else if (matchedUsers.length > 0 && !selectedMatch) {
      setSelectedMatch(matchedUsers[0].match);
      setMatchedUser(matchedUsers[0].user);
    }
  }, [matchId, userMatches, matchedUsers]);
  
  // Load messages when match changes
  useEffect(() => {
    if (selectedMatch) {
      const matchMessages = getMessagesForMatch(selectedMatch.id);
      setMessages(matchMessages);
    } else {
      setMessages([]);
    }
  }, [selectedMatch]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedMatch) return;
    
    // Create new message
    const newMsg: Message = {
      id: `temp-${Date.now()}`,
      matchId: selectedMatch.id,
      senderId: currentUser.id,
      content: newMessage,
      timestamp: new Date(),
      read: false
    };
    
    // Add to UI immediately
    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
    
    // In a real app, we'd send to backend/socket here
    // For demo, we'll just simulate storing in our mock data
    mockMessages.push(newMsg);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container-lg py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Chat Sidebar */}
          <Card className="md:col-span-1 overflow-hidden">
            <CardHeader className="px-3 py-4">
              <h2 className="text-lg font-semibold">Conversations</h2>
            </CardHeader>
            <Separator />
            <div className="overflow-auto max-h-[calc(100vh-220px)]">
              {matchedUsers.length > 0 ? (
                matchedUsers.map(({ match, user }) => (
                  <button 
                    key={match.id}
                    onClick={() => {
                      setSelectedMatch(match);
                      setMatchedUser(user);
                    }}
                    className={`w-full text-left px-3 py-4 flex items-center gap-3 hover:bg-gray-100 transition-colors ${
                      selectedMatch?.id === match.id ? 'bg-primary/10' : ''
                    }`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {/* Show last message or match reason */}
                        {getMessagesForMatch(match.id).length > 0 
                          ? getMessagesForMatch(match.id).slice(-1)[0].content
                          : match.matchReason
                        }
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center">
                  <p className="text-muted-foreground">No conversations yet.</p>
                  <Button className="mt-4" asChild>
                    <a href="/matches">Find matches</a>
                  </Button>
                </div>
              )}
            </div>
          </Card>
          
          {/* Chat Main Area */}
          <Card className="md:col-span-3 flex flex-col h-[calc(100vh-220px)]">
            {selectedMatch && matchedUser ? (
              <>
                {/* Chat Header */}
                <CardHeader className="px-6 py-4 flex flex-row items-center gap-3 border-b">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={matchedUser.avatar} />
                    <AvatarFallback>{getInitials(matchedUser.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{matchedUser.name}</h2>
                    <p className="text-xs text-muted-foreground">
                      Match score: {Math.round(selectedMatch.matchScore * 100)}%
                    </p>
                  </div>
                </CardHeader>
                
                {/* Chat Messages */}
                <CardContent className="flex-1 overflow-y-auto px-6 py-4">
                  {messages.length > 0 ? (
                    <div className="space-y-4">
                      {messages.map((message, idx) => {
                        const isCurrentUser = message.senderId === currentUser.id;
                        const sender = isCurrentUser ? currentUser : matchedUser;
                        
                        // Check if we need to show date header
                        const showDateHeader = idx === 0 || 
                          formatDate(messages[idx-1].timestamp) !== formatDate(message.timestamp);
                        
                        return (
                          <div key={message.id}>
                            {showDateHeader && (
                              <div className="flex justify-center my-4">
                                <span className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-500">
                                  {formatDate(message.timestamp)}
                                </span>
                              </div>
                            )}
                            
                            <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                              <div className="flex gap-2 max-w-[80%]">
                                {!isCurrentUser && (
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={sender.avatar} />
                                    <AvatarFallback>{getInitials(sender.name)}</AvatarFallback>
                                  </Avatar>
                                )}
                                <div>
                                  <div
                                    className={`rounded-lg px-4 py-2 ${
                                      isCurrentUser
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-secondary'
                                    }`}
                                  >
                                    <p className="text-sm">{message.content}</p>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {formatTime(message.timestamp)}
                                  </p>
                                </div>
                                {isCurrentUser && (
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={sender.avatar} />
                                    <AvatarFallback>{getInitials(sender.name)}</AvatarFallback>
                                  </Avatar>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="font-medium mb-2">No messages yet</h3>
                        <p className="text-sm text-muted-foreground">
                          Send a message to start the conversation with {matchedUser.name}!
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
                
                {/* Chat Input */}
                <CardFooter className="border-t p-4">
                  <form onSubmit={sendMessage} className="flex w-full gap-2">
                    <Input
                      placeholder={`Message ${matchedUser.name}...`}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              </>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-6">
                  <h2 className="text-xl font-semibold mb-2">No conversation selected</h2>
                  <p className="text-muted-foreground mb-4">
                    Select a conversation from the sidebar or find new matches.
                  </p>
                  {matchedUsers.length === 0 && (
                    <Button asChild>
                      <a href="/matches">Find matches</a>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Chat;
