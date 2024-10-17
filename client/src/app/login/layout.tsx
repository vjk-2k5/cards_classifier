
import React from 'react';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: 'url("/image.jpg")', 
      }}
    >
        {children}
      </div>
  );
};

export default LoginLayout;
