import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X, Send, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/theme/theme';
import { Response, formatAIResponse } from './response';
import { useIsMobile } from '@/utils/mobile';

// Define message type
interface ChatMessage {
  text: string;
  sender: 'user' | 'system';
  timestamp: Date;
}

const ChatButton = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const theme = useTheme(); // kuhaa ang theme colors para sa consistent styling
  const responseHandler = Response(); // Initialize the AI response handler

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSend = async () => {
    if (message.trim()) {
      // Add user message to chat
      const userMessage: ChatMessage = {
        text: message.trim(),
        sender: 'user',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, userMessage]);
      const userQuery = message.trim();
      setMessage('');
      setIsLoading(true);
      
      try {
        // Get AI response for business zoning questions
        const aiResponse = await responseHandler.getResponse(userQuery);
        
        const systemReply: ChatMessage = {
          text: aiResponse || "I apologize, but I couldn't process your request at the moment. Please try again or contact our support team for assistance with your business zoning inquiry.",
          sender: 'system',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, systemReply]);
      } catch (error) {
        console.error('Error getting AI response:', error);
        const errorReply: ChatMessage = {
          text: "I'm sorry, there was an error processing your request. Please try again later or contact our support team for help with your business zoning questions.",
          sender: 'system',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorReply]);
      } finally {
        setIsLoading(false);
      }
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

  // Responsive bottom position: 20px for mobile, Tailwind bottom-5 for md and up
  return (
    <div
      className={isMobile ? "fixed right-5" : "fixed right-5 bottom-5"}
      style={isMobile ? { bottom: '80px', zIndex: 99999 } : { zIndex: 99999 }}
    >
      {/* Chat interface - transition effects using Tailwind */}
      <div className={cn(
        "absolute transition-all duration-300 ease-in-out",
        isExpanded 
          ? "bottom-5 right-5 w-[500px] h-[700px] md:w-[600px] md:h-[750px] lg:w-[700px] lg:h-[800px] max-w-[90vw] max-h-[90vh]" 
          : "bottom-16 right-0 w-80 h-96",
        isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
      )}>
        <Card className="h-full flex flex-col shadow-lg border border-border">
          {/* Chat header - gamit ang theme primary color */}
          <CardHeader 
            className="text-white p-4 flex flex-row justify-between items-center rounded-t-lg"
            style={{ backgroundColor: theme.colors.primary }}
          >
            <CardTitle className="text-lg font-semibold">Zoning Assistant</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpand}
                className="h-8 w-8 p-0 text-white hover:bg-white/20 transition-colors duration-200"
                title={isExpanded ? "Minimize" : "Expand"}
              >
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-8 w-8 p-0 text-white hover:bg-white/20 transition-colors duration-200"
                title="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
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
              Ask me about business zoning regulations, permits, and guidelines for Butuan City!
            </p>
            
            {/* Messages display - theme colors para sa message bubbles */}
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={cn(
                  "mb-3 flex",
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div 
                  className={cn(
                    "max-w-[85%] rounded-lg",
                    isExpanded ? "p-4 text-base" : "p-2 text-sm"
                  )}
                  style={{
                    backgroundColor: msg.sender === 'user' ? theme.colors.primary : theme.colors.tertiary,
                    color: msg.sender === 'user' ? theme.colors.background : theme.colors.text
                  }}
                >
                  <p dangerouslySetInnerHTML={{ 
                    __html: msg.sender === 'system' ? formatAIResponse(msg.text) : msg.text 
                  }} />
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div 
                  className={cn(
                    "max-w-[85%] rounded-lg",
                    isExpanded ? "p-4 text-base" : "p-2 text-sm"
                  )}
                  style={{
                    backgroundColor: theme.colors.tertiary,
                    color: theme.colors.text
                  }}
                >
                  <p>Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          
          {/* Message input area - theme colors para sa input ug button */}
          <div 
            className={cn(
              "border-t flex gap-2",
              isExpanded ? "p-6" : "p-4"
            )}
            style={{ 
              backgroundColor: theme.colors.background,
              borderTopColor: theme.colors.tertiary 
            }}
          >
            <Input
              placeholder={isExpanded ? "Ask detailed questions about business permits, zoning laws, and regulations in Butuan City..." : "Ask about business zoning in Butuan City..."}
              value={message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className={cn(
                "flex-1 border-2 focus:ring-2 transition-all duration-200",
                isExpanded ? "h-12 text-base" : "h-10 text-sm"
              )}
              style={{ 
                borderColor: theme.colors.tertiary,
                backgroundColor: theme.colors.background,
                color: theme.colors.text
              }}
            />
            <Button 
              size="sm"
              onClick={handleSend} 
              disabled={!message.trim() || isLoading}
              className={cn(
                "p-0 transition-all duration-200 disabled:opacity-50",
                isExpanded ? "h-12 w-12" : "h-10 w-10"
              )}
              style={{
                backgroundColor: (message.trim() && !isLoading) ? theme.colors.secondary : theme.colors.mutedText,
                color: theme.colors.background
              }}
            >
              <Send className={isExpanded ? "h-5 w-5" : "h-4 w-4"} />
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