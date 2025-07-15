import React, { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}

/**
 * Layout for authenticated application pages
 * Optionally includes header and footer
 */
export const AppLayout = ({ children, header, footer }: AppLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {header}
      <main className="flex-1 flex justify-center items-center content-container-fixed-width">
        {children}
      </main>
      {footer}
    </div>
  );
};