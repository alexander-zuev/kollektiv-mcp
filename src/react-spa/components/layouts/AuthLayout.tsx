import React from 'react';

/**
 * Layout for authentication pages (login, signup, etc.)
 * Features a centered design that adapts to mobile and desktop
 */
const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-[100dvh] flex-center">
      <div className="content-container-fixed-width flex-center-col py-8 md:py-12">{children}</div>
    </div>
  );
};

export default AuthLayout;
