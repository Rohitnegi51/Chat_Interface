import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({ onSend, disabled = false }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  // Auto-grow textarea dynamically up to 200px
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to recalculate shrinking, then set to scrollHeight
      textarea.style.height = 'auto'; 
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; 
    }
  }, [text]);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    const trimmed = text.trim();
    
    if (trimmed && !disabled) {
      onSend(trimmed);
      setText('');
      
      // Ensure focus remains on the textarea after sending
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      });
    }
  };

  const handleKeyDown = (e) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
    // Shift + Enter naturally adds a new line since we don't preventDefault
  };

  const hasContent = text.trim().length > 0;

  return (
    <footer className="flex-none bg-white border-t border-neutral-200 p-4 md:p-6 pb-6 md:pb-8">
      <div className="max-w-3xl mx-auto flex gap-2 items-end relative">
        
        {/* Screen Reader Instructions */}
        <div className="sr-only" id="chat-input-description">
          Press Enter to send the message. Press Shift + Enter to add a new line.
        </div>
        
        <div className="flex-1 bg-neutral-100 rounded-2xl border border-neutral-200 focus-within:ring-2 focus-within:ring-neutral-400 transition-shadow">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Message Chat Assistant..."
            className="w-full bg-transparent resize-none py-3 px-4 max-h-[200px] outline-none text-[15px] text-neutral-800 placeholder:text-neutral-500 overflow-y-auto block"
            rows={1}
            aria-label="Chat message input"
            aria-describedby="chat-input-description"
          />
        </div>
        
        <button 
          onClick={handleSend}
          disabled={!hasContent || disabled}
          className={`flex-none w-[48px] h-[48px] mb-[1px] flex items-center justify-center rounded-xl transition-all
            ${hasContent && !disabled 
              ? 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm' 
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2
          `}
          aria-label="Send message"
        >
          {/* Subtle translate on X to center the Send icon visually */}
          <Send size={18} className={hasContent ? 'translate-x-[1px] translate-y-[-1px]' : ''} />
        </button>
      </div>
    </footer>
  );
}
