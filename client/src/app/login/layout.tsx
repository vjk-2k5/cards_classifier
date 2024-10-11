// src/app/login/layout.tsx
import React from 'react';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded p-8">
        {children}
      </div>
    </div>
  );
};

export default LoginLayout;
