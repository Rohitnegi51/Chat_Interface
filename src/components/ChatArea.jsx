import React, { useRef, useEffect, useState, useCallback } from 'react';
import MessageItem from './MessageItem';
import TypingIndicator from './TypingIndicator';
import { ArrowDown } from 'lucide-react';

export default function ChatArea({ messages = [], isTyping = false, onRetry }) {
  const scrollRef = useRef(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false);

  const scrollToBottom = useCallback((smooth = true) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto'
      });
      setIsScrolledUp(false);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    
    // Consider "scrolled up" if user is more than 100px away from the bottom
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    setIsScrolledUp(distanceToBottom > 100);
  }, []);

  // Intelligent auto-scroll on new messages or typing indicator
  useEffect(() => {
    if (!isScrolledUp && (messages.length > 0 || isTyping)) {
      // requestAnimationFrame ensures the DOM has updated with the new message
      requestAnimationFrame(() => {
        scrollToBottom(true);
      });
    }
  }, [messages, isTyping, isScrolledUp, scrollToBottom]);

  return (
    <main 
      ref={scrollRef}
      onScroll={handleScroll}
      tabIndex={0}
      className="flex-1 overflow-y-auto bg-neutral-50 p-4 md:p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-400"
    >
      <div 
        className="max-w-3xl mx-auto flex flex-col pb-4 relative"
        role="log"
        aria-live="polite"
        aria-atomic="false"
      >
        {messages.length === 0 && !isTyping ? (
          <div className="text-center text-neutral-500 text-sm mt-8">
            Send a message to start the conversation.
          </div>
        ) : (
          messages.map(msg => (
            <MessageItem key={msg.id} message={msg} onRetry={onRetry} />
          ))
        )}

        {isTyping && <TypingIndicator />}
      </div>

      {/* Floating Scroll Down Button */}
      {isScrolledUp && (
        <button
          onClick={() => scrollToBottom(true)}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white border border-neutral-200 shadow-md text-neutral-600 rounded-full py-2 px-3 hover:bg-neutral-50 hover:text-neutral-900 transition-colors z-20 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          aria-label="Scroll to newest messages"
        >
          <ArrowDown size={16} />
          <span className="text-sm font-medium pr-1">New messages</span>
        </button>
      )}
    </main>
  );
}
