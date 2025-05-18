
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calendar, clock, calendarPlus, calendarCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Sample data for available times
const availableTimes = {
  morning: ["09:00", "10:00", "11:00"],
  afternoon: ["13:00", "14:00", "15:00", "16:00"],
  evening: ["18:00", "19:00", "20:00"]
};

// Sample suggested meeting slots based on "AI"
const suggestedSlots = [
  { date: new Date(2025, 4, 20), time: "10:00", participants: ["Alex", "You"], matchScore: 0.95 },
  { date: new Date(2025, 4, 21), time: "14:00", participants: ["Sarah", "You"], matchScore: 0.88 },
  { date: new Date(2025, 4, 22), time: "18:00", participants: ["David", "Emma", "You"], matchScore: 0.82 },
];

const SmartScheduler = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [scheduledMeetings, setScheduledMeetings] = useState([
    {
      id: "1",
      title: "JavaScript Basics",
      date: new Date(2025, 4, 19),
      time: "15:00",
      participants: ["Alex Johnson"]
    },
    {
      id: "2",
      title: "React Hooks Workshop",
      date: new Date(2025, 4, 24),
      time: "11:00",
      participants: ["Sarah Miller", "David Chen"]
    }
  ]);
  
  const handleScheduleMeeting = () => {
    if (!date || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }
    
    const newMeeting = {
      id: Date.now().toString(),
      title: "Learning Session",
      date: date,
      time: selectedTime,
      participants: ["Learning Partner"]
    };
    
    setScheduledMeetings([...scheduledMeetings, newMeeting]);
    toast.success("Meeting scheduled successfully");
    setSelectedTime("");
  };
  
  const handleAcceptSuggestion = (suggestion: typeof suggestedSlots[0]) => {
    const newMeeting = {
      id: Date.now().toString(),
      title: "AI Suggested Session",
      date: suggestion.date,
      time: suggestion.time,
      participants: suggestion.participants.filter(p => p !== "You")
    };
    
    setScheduledMeetings([...scheduledMeetings, newMeeting]);
    toast.success("Suggested meeting accepted");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <calendar className="h-5 w-5" /> 
          Smart Scheduling Assistant
        </CardTitle>
        <CardDescription>
          Schedule learning sessions and get AI-powered scheduling suggestions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="schedule">
          <TabsList className="mb-4">
            <TabsTrigger value="schedule">
              <calendarPlus className="h-4 w-4 mr-2" /> Schedule Session
            </TabsTrigger>
            <TabsTrigger value="suggestions">
              <calendarCheck className="h-4 w-4 mr-2" /> AI Suggestions
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              <clock className="h-4 w-4 mr-2" /> Upcoming
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="schedule" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label className="mb-2 block">Select Date</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="border rounded-md"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Select Time</Label>
                  <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (1PM - 5PM)</SelectItem>
                      <SelectItem value="evening">Evening (6PM - 9PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedTimeSlot && (
                  <div>
                    <Label className="mb-2 block">Available Times</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimes[selectedTimeSlot as keyof typeof availableTimes]?.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={handleScheduleMeeting} 
                  disabled={!date || !selectedTime}
                  className="w-full mt-4"
                >
                  Schedule Meeting
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="suggestions">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Based on your availability and learning goals, we recommend these sessions:
              </p>
              
              {suggestedSlots.map((slot, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          {slot.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {slot.time}
                        </p>
                        <div className="flex items-center mt-1">
                          <p className="text-sm text-muted-foreground">
                            With {slot.participants.filter(p => p !== "You").join(", ")}
                          </p>
                          <span className="ml-2 px-1.5 py-0.5 bg-primary/10 rounded text-primary text-xs">
                            {Math.round(slot.matchScore * 100)}% match
                          </span>
                        </div>
                      </div>
                      <Button size="sm" onClick={() => handleAcceptSuggestion(slot)}>
                        Accept
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming">
            <div className="space-y-4">
              {scheduledMeetings.length > 0 ? (
                scheduledMeetings.map(meeting => (
                  <Card key={meeting.id}>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{meeting.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {meeting.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {meeting.time}
                        </p>
                        <p className="text-sm mt-1">
                          With {meeting.participants.join(", ")}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Reschedule</Button>
                        <Button size="sm" variant="default">Join</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <calendar className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No upcoming meetings</p>
                  <Button variant="outline" className="mt-4">Schedule a Session</Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SmartScheduler;
