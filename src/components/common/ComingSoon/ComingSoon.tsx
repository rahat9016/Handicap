"use client";

import { useEffect, useState } from "react";

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-10-02T23:59:59").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen  text-dashboard-primary px-4">
      <h1 className="text-5xl md:text-7xl font-bold mb-6">🚀 Coming Soon</h1>
      <p className="text-lg md:text-xl mb-10 text-gray-300">
        We’re working hard to launch something amazing. Stay tuned!
      </p>

      {/* Countdown */}
      <div className="flex gap-6 text-center mb-10">
        {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
          const value = Object.values(timeLeft)[i];
          return (
            <div key={label}>
              <p className="text-4xl md:text-5xl font-bold">{value}</p>
              <p className="text-sm uppercase text-gray-400">{label}</p>
            </div>
          );
        })}
      </div>
      <footer className="mt-12 text-gray-500 text-sm">
        © {new Date().getFullYear()} Disability Inclusion
Resource Hub. All rights reserved.
      </footer>
    </main>
  );
}
