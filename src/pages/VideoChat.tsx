
import NavBar from '@/components/NavBar';
import VideoChatComponent from '@/components/VideoChat';
import { useParams } from 'react-router-dom';
import { getUserById, getCurrentUser } from '@/utils/mockData';

const VideoChatPage = () => {
  const { userId } = useParams();
  const currentUser = getCurrentUser();
  
  // If a userId is provided, get that user's name, otherwise use a default
  const peerName = userId ? getUserById(userId)?.name || "Learning Partner" : "Learning Partner";
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Video Learning Session</h1>
          <p className="text-muted-foreground mt-2">
            Connect face-to-face with your learning partners
          </p>
        </div>
        
        <VideoChatComponent userName={peerName} />
      </main>
    </div>
  );
};

export default VideoChatPage;
