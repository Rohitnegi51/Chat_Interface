import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  // Persist messages in localStorage securely
  const [messages, setMessages] = useLocalStorage('chat_assistant_messages', []);
  const [isTyping, setIsTyping] = useState(false);

  // Helper function to add new messages with unique IDs
  const addMessage = useCallback((text, sender = 'user', status = 'sent') => {
    const newMessage = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      text,
      sender,
      timestamp: new Date().toISOString(),
      status
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  }, [setMessages]);

  const handleSendMessage = useCallback((text) => {
    // 1. Immediately add user message
    addMessage(text, 'user', 'sent');
    
    // 2. Show typing indicator
    setIsTyping(true);

    // 3. Simulate network/bot delay (1.5 seconds)
    setTimeout(() => {
      setIsTyping(false);
      
      const botResponses = [
        "That's an interesting point. Tell me more!",
        "I completely understand.",
        "Could you clarify what you mean by that?",
        "I'm here to help. What else is on your mind?",
        "I can certainly assist you with that."
      ];
      const response = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      addMessage(response, 'bot', 'sent');
    }, 1500);

  }, [addMessage]);

  const clearChat = useCallback(() => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages([]);
    }
  }, [setMessages]);

  return (
    <div className="flex flex-col h-full w-full bg-neutral-50 text-neutral-900 overflow-hidden">
      <Header isTyping={isTyping} onClear={clearChat} />
      
      <ChatArea messages={messages} isTyping={isTyping} />
      
      <ChatInput onSend={handleSendMessage} disabled={isTyping} />
    </div>
  );
}
