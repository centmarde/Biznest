import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/theme/theme';

// Define message type
interface ChatMessage {
  text: string;
  sender: 'user' | 'system';
  timestamp: Date;
}

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const theme = useTheme(); // kuhaa ang theme colors para sa consistent styling

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSend = () => {
    if (message.trim()) {
      // Add user message to chat
      const userMessage: ChatMessage = {
        text: message.trim(),
        sender: 'user',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, userMessage]);
      setMessage('');
      
      // Simulate reply after a short delay - todo: mag integrate sa actual AI response
      setTimeout(() => {
        const systemReply: ChatMessage = {
          text: "Thank you for your message. We've sent you an email with further information. Our team will get back to you shortly.",
          sender: 'system',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, systemReply]);
      }, 800);
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat interface - transition effects using Tailwind */}
      <div className={cn(
        "absolute bottom-16 right-0 w-80 h-96 transition-all duration-300 ease-in-out",
        isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
      )}>
        <Card className="h-full flex flex-col shadow-lg border border-border">
          {/* Chat header - gamit ang theme primary color */}
          <CardHeader 
            className="text-white p-4 flex flex-row justify-between items-center rounded-t-lg"
            style={{ backgroundColor: theme.colors.primary }}
          >
            <CardTitle className="text-lg font-semibold">Message Us</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0 text-white hover:bg-white/20 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          {/* Chat messages area - gamit ang theme background */}
          <CardContent 
            className="flex-1 p-4 overflow-y-auto"
            style={{ backgroundColor: theme.colors.background }}
          >
            <p 
              className="text-sm mb-4"
              style={{ color: theme.colors.mutedText }}
            >
              How can we help you today?
            </p>
            
            {/* Messages display - theme colors para sa message bubbles */}
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={cn(
                  "mb-2 flex",
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div 
                  className="max-w-[80%] p-2 rounded-lg text-sm"
                  style={{
                    backgroundColor: msg.sender === 'user' ? theme.colors.primary : theme.colors.tertiary,
                    color: msg.sender === 'user' ? theme.colors.background : theme.colors.text
                  }}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>
          
          {/* Message input area - theme colors para sa input ug button */}
          <div 
            className="p-4 border-t flex gap-2"
            style={{ 
              backgroundColor: theme.colors.background,
              borderTopColor: theme.colors.tertiary 
            }}
          >
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border-2 focus:ring-2 transition-all duration-200"
              style={{ 
                borderColor: theme.colors.tertiary,
                backgroundColor: 'white',
                color: theme.colors.text
              }}
            />
            <Button 
              size="sm"
              onClick={handleSend} 
              disabled={!message.trim()}
              className="h-10 w-10 p-0 transition-all duration-200 disabled:opacity-50"
              style={{
                backgroundColor: message.trim() ? theme.colors.secondary : theme.colors.mutedText,
                color: theme.colors.background
              }}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Chat button - perfect circle gamit ang theme primary color */}
      <Button
        size="lg"
        onClick={isOpen ? handleClose : handleOpen}
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center p-0"
        style={{
          backgroundColor: theme.colors.primary,
          color: theme.colors.background,
          borderRadius: '50%',
          minWidth: '56px',
          minHeight: '56px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = theme.colors.secondary;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = theme.colors.primary;
        }}
        title="Message Us"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  );
};

export default ChatButton;