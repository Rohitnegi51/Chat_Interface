import React from 'react';

export default function Header() {
  return (
    <header className="flex-none h-16 bg-white border-b border-neutral-200 flex items-center px-4 md:px-6 shadow-sm z-10">
      <div className="flex items-center gap-3">
        {/* Placeholder for Bot Avatar */}
        <div className="w-10 h-10 rounded-full bg-neutral-200 animate-pulse"></div>
        <div>
          <h1 className="text-lg font-semibold text-neutral-800 leading-tight">Chat Assistant</h1>
          <p className="text-sm text-neutral-500 leading-none">Online</p>
        </div>
      </div>
    </header>
  );
}
