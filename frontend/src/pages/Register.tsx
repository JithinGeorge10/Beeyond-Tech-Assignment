
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

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const userData = {
        name,
        email,
        role,
        phone,
        address: role === 'customer' ? address : undefined
      };
      
      await register(userData, password);
      
      // Redirect based on role
      if (role === 'customer') {
        navigate('/');
      } else if (role === 'delivery') {
        navigate('/delivery');
      } else if (role === 'admin') {
        navigate('/admin');
      }
      
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
      
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was a problem creating your account.",
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
            <CardTitle className="text-2xl text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Sign up to get started with QuickTrack
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
                      <Label htmlFor={`${userRole}-name`}>Full Name</Label>
                      <Input 
                        id={`${userRole}-name`}
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${userRole}-email`}>Email</Label>
                      <Input 
                        id={`${userRole}-email`}
                        type="email" 
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${userRole}-password`}>Password</Label>
                      <Input 
                        id={`${userRole}-password`}
                        type="password" 
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${userRole}-phone`}>Phone Number</Label>
                      <Input 
                        id={`${userRole}-phone`}
                        placeholder="Your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    
                    {userRole === 'customer' && (
                      <div className="space-y-2">
                        <Label htmlFor="customer-address">Delivery Address</Label>
                        <Input 
                          id="customer-address"
                          placeholder="Your address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                      </div>
                    )}
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
                          Creating account...
                        </span>
                      ) : (
                        'Create account'
                      )}
                    </Button>
                    <div className="text-center mt-4">
                      <span className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link to="/login" className="text-brand-purple hover:underline">
                          Log in
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

export default Register;
