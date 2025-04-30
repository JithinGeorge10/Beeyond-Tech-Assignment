
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { UserRole } from '@/types';
import { Package } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password, role);
      
      // Redirect based on role
      if (role === 'customer') {
        navigate('/');
      } else if (role === 'delivery') {
        navigate('/delivery');
      } else if (role === 'admin') {
        navigate('/admin');
      }
      
      toast({
        title: "Logged in successfully",
        description: "Welcome back!",
      });
      
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <Package className="text-brand-purple h-8 w-8" />
            <span className="font-bold text-2xl">QuickTrack</span>
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="customer" onValueChange={(value) => setRole(value as UserRole)}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="delivery">Delivery</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            
            {['customer', 'delivery', 'admin'].map((userRole) => (
              <TabsContent key={userRole} value={userRole}>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${userRole}-email`}>Email</Label>
                      <Input 
                        id={`${userRole}-email`}
                        type="email" 
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        // Demo credentials for easy testing
                        defaultValue={`${userRole}@example.com`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${userRole}-password`}>Password</Label>
                      <Input 
                        id={`${userRole}-password`}
                        type="password" 
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        // Demo password
                        defaultValue="password"
                      />
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex flex-col">
                    <Button
                      className="w-full bg-brand-purple hover:bg-brand-purple-dark"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Logging in...
                        </span>
                      ) : (
                        'Log in'
                      )}
                    </Button>
                    <div className="text-center mt-4">
                      <span className="text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-brand-purple hover:underline">
                          Register
                        </Link>
                      </span>
                    </div>
                  </CardFooter>
                </form>
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Login;
