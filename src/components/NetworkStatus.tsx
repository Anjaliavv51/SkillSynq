
import { useEffect, useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Wifi, WifiOff, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineAlert, setShowOfflineAlert] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineAlert(false);
      toast.success("You're back online");
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineAlert(true);
      toast.error("You're offline. Some features may be unavailable", {
        duration: 0, // Persist until online again
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline && !showOfflineAlert) return null;

  return (
    <Alert 
      variant="destructive" 
      className="fixed bottom-4 right-4 w-auto max-w-sm z-50 animate-fade-in"
      aria-live="assertive"
    >
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-2">
        <WifiOff className="h-4 w-4" /> You're offline
      </AlertTitle>
      <AlertDescription>
        Check your connection and try again. Your changes won't be saved until you're back online.
      </AlertDescription>
    </Alert>
  );
}

export default NetworkStatus;
