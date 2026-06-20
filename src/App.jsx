import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';

export default function App() {
  const [messages, setMessages] = useState([]);

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
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-neutral-50 text-neutral-900 overflow-hidden">
      <Header />
      
      {/* Pass the messages array to the chat container */}
      <ChatArea messages={messages} />
      
      <ChatInput onSend={(text) => addMessage(text, 'user')} />
    </div>
  );
}
