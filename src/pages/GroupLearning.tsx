
import NavBar from '@/components/NavBar';
import GroupLearning from '@/components/GroupLearning';

const GroupLearningPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Group Learning</h1>
          <p className="text-muted-foreground mt-2">
            Join virtual study groups and collaborate with peers to accelerate your learning
          </p>
        </div>
        
        <GroupLearning />
      </main>
    </div>
  );
};

export default GroupLearningPage;
