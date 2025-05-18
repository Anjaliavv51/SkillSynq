
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { initSessionTimeout } from "@/utils/session-timeout";
import NetworkStatus from "@/components/NetworkStatus";

// Login form validation schema
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  // Initialize form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Set up session timeout when user logs in
  useEffect(() => {
    const cleanup = initSessionTimeout();
    return () => cleanup();
  }, []);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      await login(data.email, data.password);
      
      toast({
        title: "Welcome back!",
        description: "You've been successfully logged in.",
        variant: "default",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      const errorMessage = error?.message || "Invalid credentials. Please try again.";
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-primary p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900" id="login-heading">
            Sign in to SkillSync
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Connect with peers and grow your skills together
          </p>
        </div>

        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="mt-8 space-y-6"
            aria-labelledby="login-heading"
          >
            <div className="space-y-4 rounded-md">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="you@example.com"
                        aria-required="true"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        aria-required="true"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={field.value}
                      onChange={field.onChange}
                      aria-describedby="remember-me-description"
                    />
                    <label 
                      htmlFor="remember-me" 
                      className="ml-2 block text-sm text-gray-900"
                      id="remember-me-description"
                    >
                      Remember me
                    </label>
                  </div>
                )}
              />

              <div className="text-sm">
                <Link 
                  to="/forgot-password" 
                  className="text-primary hover:text-primary/80"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </div>
          </form>
        </Form>

        <div className="text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:text-primary/80 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      
      <NetworkStatus />
    </div>
  );
};

export default Login;
