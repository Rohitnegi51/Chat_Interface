import React from 'react';

export default function ChatInput() {
  return (
    <footer className="flex-none bg-white border-t border-neutral-200 p-4 md:p-6 pb-6 md:pb-8">
      <div className="max-w-3xl mx-auto flex gap-2 items-end">
        {/* Placeholder for multi-line textarea */}
        <div className="flex-1 bg-neutral-100 rounded-2xl border border-neutral-200 p-3 min-h-[52px]">
          <span className="text-neutral-400 select-none">Message Chat Assistant...</span>
        </div>
        
        {/* Placeholder for send button */}
        <button className="flex-none w-12 h-[52px] flex items-center justify-center rounded-xl bg-neutral-900 text-white transition-colors hover:bg-neutral-800">
          <span className="sr-only">Send Message</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13"></path>
            <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
          </svg>
        </button>
      </div>
    </footer>
  );
}
