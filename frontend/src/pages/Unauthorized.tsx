
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Lock } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();
  
  const handleGoHome = () => {
    if (userRole === 'customer') {
      navigate('/');
    } else if (userRole === 'delivery') {
      navigate('/delivery');
    } else if (userRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Lock className="mx-auto h-16 w-16 text-brand-orange mb-6" />
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-xl text-gray-600 mb-8">
          You don't have permission to access this page.
        </p>
        <Button onClick={handleGoHome}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
