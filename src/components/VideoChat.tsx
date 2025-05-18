
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  video, 
  mic, 
  micOff, 
  videoOff, 
  phoneOff, 
  messageSquare,
  userPlus,
  screenShare,
  settings
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface VideoChatProps {
  matchId?: string;
  userName?: string;
  userAvatar?: string;
}

const VideoChat = ({ 
  matchId,
  userName = "Learning Partner",
  userAvatar
}: VideoChatProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  
  const startCall = () => {
    // In a real app, this would initialize WebRTC connection
    setIsConnected(true);
    toast.success("Video call started");
  };
  
  const endCall = () => {
    setIsConnected(false);
    toast.info("Call ended");
  };
  
  const toggleMic = () => {
    setIsMicMuted(!isMicMuted);
    toast.success(isMicMuted ? "Microphone unmuted" : "Microphone muted");
  };
  
  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    toast.success(isVideoOff ? "Camera turned on" : "Camera turned off");
  };
  
  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast.success(isScreenSharing ? "Stopped sharing screen" : "Started sharing screen");
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <video className="h-5 w-5" />
          Video Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {!isConnected ? (
          <div className="p-6">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src={userAvatar} />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">Call with {userName}</h3>
                <p className="text-sm text-muted-foreground">Start a video session with your learning partner</p>
              </div>
            </div>
            
            <Button onClick={startCall} className="w-full">
              <video className="h-4 w-4 mr-2" /> Start Video Call
            </Button>
          </div>
        ) : (
          <div>
            {/* Video area */}
            <div className="relative bg-gray-900 h-[300px] flex items-center justify-center">
              {!isVideoOff ? (
                <div className="text-white">
                  {/* In a real app, this would be a video element */}
                  <p className="text-center">Video feed would appear here</p>
                  <p className="text-sm text-center mt-2 text-gray-400">
                    Using WebRTC for peer-to-peer communication
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-white mt-2">{userName}</p>
                  <p className="text-xs text-gray-400">Camera off</p>
                </div>
              )}
              
              {/* Screen sharing indicator */}
              {isScreenSharing && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md flex items-center">
                  <screenShare className="h-3 w-3 mr-1" />
                  Sharing screen
                </div>
              )}
            </div>
            
            {/* Controls */}
            <div className="py-4 px-6 bg-muted/20">
              <div className="flex justify-center items-center space-x-2">
                <Button 
                  variant={isMicMuted ? "outline" : "default"}
                  size="icon" 
                  onClick={toggleMic}
                >
                  {isMicMuted ? (
                    <micOff className="h-4 w-4" />
                  ) : (
                    <mic className="h-4 w-4" />
                  )}
                </Button>
                
                <Button 
                  variant={isVideoOff ? "outline" : "default"}
                  size="icon" 
                  onClick={toggleVideo}
                >
                  {isVideoOff ? (
                    <videoOff className="h-4 w-4" />
                  ) : (
                    <video className="h-4 w-4" />
                  )}
                </Button>
                
                <Button 
                  variant="destructive"
                  size="icon" 
                  onClick={endCall}
                >
                  <phoneOff className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant={isScreenSharing ? "default" : "outline"}
                  size="icon" 
                  onClick={toggleScreenShare}
                >
                  <screenShare className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="icon"
                >
                  <messageSquare className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="icon"
                >
                  <userPlus className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="icon"
                >
                  <settings className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-3">
                Call duration: 00:12:34
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoChat;
