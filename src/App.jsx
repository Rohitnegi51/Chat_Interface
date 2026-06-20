import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
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

  const updateMessageStatus = useCallback((id, status) => {
    setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, status } : msg));
  }, [setMessages]);

  const triggerBotResponse = useCallback(() => {
    setIsTyping(true);
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

  const processMessageDelivery = useCallback((messageId) => {
    // Simulate network delay for the user's message
    setTimeout(() => {
      // 20% chance the message fails to send
      const isSuccess = Math.random() > 0.20; 
      
      if (isSuccess) {
        updateMessageStatus(messageId, 'sent');
        triggerBotResponse();
      } else {
        updateMessageStatus(messageId, 'failed');
      }
    }, 600); // 600ms simulated delivery delay
  }, [updateMessageStatus, triggerBotResponse]);

  const handleSendMessage = useCallback((text) => {
    // 1. Add user message initially as 'sending'
    const messageId = addMessage(text, 'user', 'sending');
    // 2. Process simulated delivery
    processMessageDelivery(messageId);
  }, [addMessage, processMessageDelivery]);

  const handleRetryMessage = useCallback((messageId) => {
    // 1. Revert status back to sending (no duplicate message)
    updateMessageStatus(messageId, 'sending');
    // 2. Retry delivery simulation
    processMessageDelivery(messageId);
  }, [updateMessageStatus, processMessageDelivery]);

  const clearChat = useCallback(() => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages([]);
    }
  }, [setMessages]);

  return (
    <div className="flex flex-col h-full w-full bg-neutral-50 text-neutral-900 overflow-hidden">
      <Header isTyping={isTyping} onClear={clearChat} />
      
      <ChatArea 
        messages={messages} 
        isTyping={isTyping} 
        onRetry={handleRetryMessage} 
      />
      
      <ChatInput onSend={handleSendMessage} disabled={isTyping} />
    </div>
  );
}
