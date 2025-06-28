"use client";

export const MainContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main id="main-content" className="min-h-screen focus:outline-none">
      {children}
    </main>
  );
};
