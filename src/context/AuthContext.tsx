
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { getCurrentUser } from '@/utils/mockData';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading the user on init
  useEffect(() => {
    const loadUser = async () => {
      try {
        // In a real app, we'd check for an auth token and load the user
        // For now, let's just simulate with a timeout and our mock data
        setTimeout(() => {
          const loggedInUser = getCurrentUser();
          setUser(loggedInUser);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to load user", error);
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we'd validate credentials and get a token
      // For now, just set the mock user
      const loggedInUser = getCurrentUser();
      setUser(loggedInUser);
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we'd register the user and get a token
      // For now, just set the mock user
      const loggedInUser = getCurrentUser();
      setUser(loggedInUser);
    } catch (error) {
      console.error("Signup failed", error);
      throw new Error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // In a real app, we'd clear tokens
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
