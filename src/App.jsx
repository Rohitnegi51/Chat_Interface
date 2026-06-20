import React from 'react';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';

export default function App() {
  return (
    <div className="flex flex-col h-full w-full bg-neutral-50 text-neutral-900 overflow-hidden">
      {/* Fixed header */}
      <Header />
      
      {/* Scrollable chat area taking remaining space */}
      <ChatArea />
      
      {/* Fixed input area at the bottom */}
      <ChatInput />
    </div>
  );
}
