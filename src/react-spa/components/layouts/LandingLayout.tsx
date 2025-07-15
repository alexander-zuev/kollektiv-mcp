import React from 'react';

interface LandingLayoutProps {
  noHeader?: boolean;
  children: React.ReactNode;
}

/**
 * Layout for marketing/public pages (landing, pricing, about, etc.)
 * Includes marketing-focused header.
 */
export const LandingLayout: React.FC<LandingLayoutProps> = ({ children, noHeader = false }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {!noHeader && <div />}
      <main className="flex-1">{children}</main>
    </div>
  );
};
