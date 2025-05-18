
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fileText, save, copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SessionSummaryProps {
  sessionText?: string;
}

const SessionSummary = ({ sessionText }: SessionSummaryProps) => {
  const [summary, setSummary] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedSummaries, setSavedSummaries] = useState<{title: string, content: string}[]>([
    {
      title: "React Hooks Discussion",
      content: "Key learnings: useState should be used for component state, useEffect for side effects. Custom hooks can extract reusable logic. Discussed common patterns for data fetching and form handling with hooks."
    },
    {
      title: "Database Design Session",
      content: "Covered normalization principles, indexing strategies, and query optimization. Practical examples of one-to-many and many-to-many relationships. Takeaway: always consider query patterns when designing schemas."
    }
  ]);

  // Demo session text if none provided
  const demoSessionText = sessionText || `
    User1: Hey, can you help me understand how React's virtual DOM works?
    User2: Sure! React maintains a virtual representation of the UI in memory, and when state changes, it compares the new virtual DOM with the previous one.
    User1: So it doesn't update the actual DOM directly?
    User2: Exactly. It first calculates the minimal set of changes needed by comparing virtual DOMs, then applies only those changes to the real DOM.
    User1: That sounds much more efficient than redrawing everything!
    User2: It is! This process is called "reconciliation" and it's one of React's key performance optimizations.
    User1: Are there any downsides to this approach?
    User2: The virtual DOM does add some memory overhead, and there are some cases where direct DOM manipulation might actually be faster for very specific optimizations.
    User1: Makes sense. So when would I want to use something other than React?
    User2: If your app is very simple with minimal UI updates, the virtual DOM might be overkill. Or for very performance-critical applications like games, you might need more direct control.
    User1: That's really helpful, thanks for explaining!
  `;

  const generateSummary = () => {
    setIsGenerating(true);
    
    // In a real app, this would call an API using OpenAI or similar
    // For demo purposes, we'll simulate an API call with a timeout
    setTimeout(() => {
      const generatedSummary = `
        Key points from this discussion:
        - React uses a virtual DOM to optimize UI updates
        - The virtual DOM is compared with the previous state to find minimal changes
        - Reconciliation is the process of determining what needs to be updated
        - Virtual DOM adds efficiency but has some memory overhead
        - React may not be ideal for extremely simple apps or performance-critical applications like games
      `;
      
      setSummary(generatedSummary.trim());
      setIsGenerating(false);
      toast.success("Summary generated successfully");
    }, 1500);
  };

  const saveSummary = () => {
    if (!summary) return;
    
    const newSummary = {
      title: `Session Summary ${new Date().toLocaleDateString()}`,
      content: summary
    };
    
    setSavedSummaries([newSummary, ...savedSummaries]);
    toast.success("Summary saved successfully");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    toast.success("Summary copied to clipboard");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <fileText className="h-5 w-5" /> AI Session Summaries
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Session text */}
          <div className="space-y-2">
            <label htmlFor="session-text" className="text-sm font-medium">Session Content</label>
            <Textarea 
              id="session-text" 
              defaultValue={demoSessionText}
              rows={6}
              className="font-mono text-sm"
            />
          </div>
          
          {/* Generate button */}
          <Button 
            onClick={generateSummary} 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? "Generating..." : "Generate Summary"}
          </Button>
          
          {/* Generated summary */}
          {summary && (
            <div className="space-y-2 border rounded-md p-4 bg-muted/30">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Generated Summary</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <copy className="h-4 w-4 mr-1" /> Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={saveSummary}>
                    <save className="h-4 w-4 mr-1" /> Save
                  </Button>
                </div>
              </div>
              <div className="whitespace-pre-line">
                {summary}
              </div>
            </div>
          )}
          
          {/* Saved summaries */}
          {savedSummaries.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Saved Summaries</h3>
              <div className="space-y-3">
                {savedSummaries.map((item, index) => (
                  <Card key={index}>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="py-3 text-sm">
                      {item.content}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionSummary;
