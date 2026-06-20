import React from 'react';

export default function ChatArea() {
  return (
    <main className="flex-1 overflow-y-auto bg-neutral-50 p-4 md:p-6 scroll-smooth">
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {/* Placeholder for messages */}
        <div className="text-center text-neutral-400 text-sm mt-8">
          Chat Area Layout placeholder
        </div>
        
        {/* Dummy message bubbles to demonstrate scrollable layout */}
        <div className="self-end max-w-[85%] md:max-w-[75%] bg-neutral-900 text-white rounded-2xl rounded-tr-sm px-4 py-3">
          User message placeholder
        </div>
        <div className="self-start max-w-[85%] md:max-w-[75%] bg-white border border-neutral-200 text-neutral-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
          Bot message placeholder
        </div>
        <div className="self-end max-w-[85%] md:max-w-[75%] bg-neutral-900 text-white rounded-2xl rounded-tr-sm px-4 py-3">
          Another user message placeholder to show flex column flow.
        </div>
      </div>
    </main>
  );
}
