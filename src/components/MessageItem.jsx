import React, { useMemo } from 'react';
import { Bot, AlertCircle, RefreshCw } from 'lucide-react';
import { formatTimeShort, formatTimeFull } from '../utils/dateHelpers';

export const MessageBubble = ({ isUser, children, status, onRetry, shortTime, fullTime }) => {
  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} w-full mb-4`}>
      <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar for Bot */}
        {!isUser && (
          <div 
            className="flex-none w-8 h-8 flex items-center justify-center rounded-md bg-white border border-neutral-200 text-neutral-600 shadow-sm mt-1"
            aria-hidden="true"
          >
            <Bot size={18} />
          </div>
        )}

        {/* Message Content & Meta */}
        <div className="flex flex-col gap-1 w-full max-w-full">
          <div
            className={`px-4 py-3 text-[15px] leading-relaxed shadow-sm break-words
              ${isUser 
                ? 'bg-neutral-800 text-white rounded-2xl rounded-tr-sm' 
                : 'bg-white text-neutral-800 border border-neutral-200 rounded-2xl rounded-tl-sm'
              }
              ${status === 'failed' ? 'border-red-300 bg-red-50 text-red-900' : ''}
              ${status === 'sending' ? 'opacity-70' : ''}
            `}
          >
            {children}
          </div>

          {/* Meta Info: Timestamp & Status */}
          <div className={`flex items-center gap-2 text-[11px] text-neutral-400 ${isUser ? 'justify-end' : 'justify-start'} mt-0.5 px-1`}>
            {status === 'sending' && <span>Sending...</span>}
            
            {status === 'failed' && isUser && (
              <div className="flex items-center gap-1 text-red-500 font-medium">
                <AlertCircle size={13} />
                <span>Failed</span>
                <button 
                  onClick={onRetry}
                  className="flex items-center gap-1 text-neutral-500 hover:text-neutral-800 transition-colors ml-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded px-1"
                  aria-label="Retry sending message"
                >
                  <RefreshCw size={11} />
                  <span>Retry</span>
                </button>
              </div>
            )}

            {/* Timestamp (short default, full on hover via title) */}
            {status !== 'sending' && shortTime && (
              <time dateTime={fullTime} title={fullTime} className="cursor-help select-none hover:text-neutral-500 transition-colors">
                {shortTime}
              </time>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const MessageItem = React.memo(({ message, onRetry }) => {
  const isUser = message.sender === 'user';
  
  const { shortTime, fullTime } = useMemo(() => {
    if (!message?.timestamp) return { shortTime: '', fullTime: '' };
    return {
      shortTime: formatTimeShort(message.timestamp),
      fullTime: formatTimeFull(message.timestamp),
    };
  }, [message?.timestamp]);

  if (!message) return null;

  return (
    <article 
      className="w-full"
      role="log" 
      aria-label={`${isUser ? 'Your' : 'Bot'} message at ${fullTime || 'unknown time'}`}
    >
      <MessageBubble 
        isUser={isUser} 
        status={message.status} 
        onRetry={() => onRetry?.(message.id)}
        shortTime={shortTime}
        fullTime={fullTime}
      >
        <div className="whitespace-pre-wrap">{message.text}</div>
      </MessageBubble>
    </article>
  );
});

MessageItem.displayName = 'MessageItem';
export default MessageItem;
