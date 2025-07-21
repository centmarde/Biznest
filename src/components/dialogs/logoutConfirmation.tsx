import React from "react";
import theme from "@/theme/theme";
import { Button } from "@/components/ui/button";

interface LogoutConfirmationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutConfirmation: React.FC<LogoutConfirmationProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm" 
        onClick={onCancel}
      />
      
      {/* Dialog box */}
      <div 
        className="relative w-full max-w-md rounded-lg p-6 shadow-xl"
        style={{ 
          backgroundColor: theme.colors.background,
          border: `1px solid ${theme.colors.tertiary}`,
        }}
      >
        <h3 
          className="text-xl font-bold mb-4"
          style={{ color: theme.colors.text }}
        >
          Confirm Logout
        </h3>
        
        <p 
          className="mb-6" 
          style={{ color: theme.colors.text }}
        >
          Are you sure you want to log out of your account?
        </p>
        
        <div className="flex justify-end gap-4">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="border-2 hover:bg-transparent"
            style={{ 
              color: theme.colors.text,
              borderColor: theme.colors.secondary
            }}
          >
            Cancel
          </Button>
          
          <Button 
            onClick={onConfirm}
            className="text-white"
            style={{ backgroundColor: theme.colors.primary }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
