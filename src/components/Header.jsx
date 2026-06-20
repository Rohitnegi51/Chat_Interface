import React from 'react';
import { Bot, Trash2 } from 'lucide-react';

export default function Header({ isTyping, onClear }) {
  return (
    <header className="flex-none h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 md:px-6 shadow-sm z-10">
      <div className="flex items-center gap-3">
        {/* Bot Avatar */}
        <div className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600">
          <Bot size={22} aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-neutral-800 leading-tight">Chat Assistant</h1>
          <p className="text-sm text-neutral-500 leading-none transition-colors">
            {isTyping ? (
              <span className="text-neutral-800 animate-pulse font-medium">Typing...</span>
            ) : (
              "Online"
            )}
          </p>
        </div>
      </div>

      {/* Clear Chat Button */}
      {onClear && (
        <button 
          onClick={onClear}
          className="text-neutral-500 hover:text-red-600 hover:bg-red-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-lg p-2"
          aria-label="Clear chat history"
          title="Clear chat history"
        >
          <Trash2 size={18} aria-hidden="true" />
        </button>
      )}
    </header>
  );
}
