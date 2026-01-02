import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AuthDebug = () => {
  const { user, loading, token } = useAuth();
  
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-xs z-50">
      <div className="font-bold mb-2">Auth Debug</div>
      <div>Loading: {loading ? 'Yes' : 'No'}</div>
      <div>Token: {token ? 'Present' : 'None'}</div>
      <div>User: {user ? user.email : 'None'}</div>
      <div>Role: {user?.role || 'None'}</div>
    </div>
  );
};

export default AuthDebug;
