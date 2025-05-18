
import NavBar from '@/components/NavBar';
import GamificationHub from '@/components/GamificationHub';

const GamificationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Gamification Hub</h1>
          <p className="text-muted-foreground mt-2">
            Track your achievements, earn badges, and stay motivated in your learning journey
          </p>
        </div>
        
        <GamificationHub />
      </main>
    </div>
  );
};

export default GamificationPage;
