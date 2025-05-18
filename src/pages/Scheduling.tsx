
import NavBar from '@/components/NavBar';
import SmartScheduler from '@/components/SmartScheduler';

const SchedulingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Smart Scheduling</h1>
          <p className="text-muted-foreground mt-2">
            Efficiently schedule learning sessions with your peers
          </p>
        </div>
        
        <SmartScheduler />
      </main>
    </div>
  );
};

export default SchedulingPage;
