
import NavBar from '@/components/NavBar';
import SessionSummary from '@/components/SessionSummary';

const AIToolsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">AI Learning Tools</h1>
          <p className="text-muted-foreground mt-2">
            Leverage AI to enhance your learning experience
          </p>
        </div>
        
        <SessionSummary />
      </main>
    </div>
  );
};

export default AIToolsPage;
