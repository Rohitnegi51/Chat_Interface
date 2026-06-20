import React from 'react';
import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex flex-col items-start w-full mb-4" aria-live="polite" aria-atomic="true">
      <div className="flex gap-3 flex-row max-w-[85%] md:max-w-[75%]">
        
        {/* Avatar for Bot */}
        <div 
          className="flex-none w-8 h-8 flex items-center justify-center rounded-md bg-white border border-neutral-200 text-neutral-600 shadow-sm mt-1"
          aria-hidden="true"
        >
          <Bot size={18} />
        </div>

        {/* Typing Bubble */}
        <div className="flex flex-col gap-1 max-w-full">
          <div className="px-4 py-4 bg-white border border-neutral-200 rounded-2xl rounded-tl-sm shadow-sm flex items-center h-[46px]">
            {/* 3 bouncing dots */}
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce"></div>
            </div>
          </div>
          <span className="sr-only">Bot is typing...</span>
        </div>
      </div>
    </div>
  );
}
