
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Session timeout duration in milliseconds (default: 30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000;

let timeoutId: ReturnType<typeof setTimeout> | null = null;
let warningId: ReturnType<typeof setTimeout> | null = null;

/**
 * Reset the session timeout timer
 */
const resetTimer = () => {
  if (timeoutId) clearTimeout(timeoutId);
  if (warningId) clearTimeout(warningId);
  
  // Set warning timer to 2 minutes before timeout
  warningId = setTimeout(() => {
    toast.warning("Your session will expire soon due to inactivity. Please continue using the app to stay logged in.", {
      duration: 10000,
    });
  }, SESSION_TIMEOUT - 2 * 60 * 1000);
  
  // Set timeout for automatic logout
  timeoutId = setTimeout(async () => {
    try {
      await supabase.auth.signOut();
      toast.info("You've been logged out due to inactivity", {
        duration: 5000,
      });
      window.location.href = '/login';
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }, SESSION_TIMEOUT);
};

/**
 * Initialize the session timeout handler
 */
export const initSessionTimeout = () => {
  // User activity events to track
  const events = [
    'mousedown', 'mousemove', 'keypress', 
    'scroll', 'touchstart', 'click', 'keydown'
  ];
  
  // Reset timer on user activity
  const activityHandler = () => {
    resetTimer();
  };
  
  // Add event listeners
  events.forEach(event => {
    document.addEventListener(event, activityHandler, {
      passive: true
    });
  });
  
  // Initial timer setup
  resetTimer();
  
  // Clean up function
  return () => {
    if (timeoutId) clearTimeout(timeoutId);
    if (warningId) clearTimeout(warningId);
    
    events.forEach(event => {
      document.removeEventListener(event, activityHandler);
    });
  };
};

// Utility function to format remaining time
export const formatRemainingTime = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  
  return `${minutes}m ${seconds}s`;
};
