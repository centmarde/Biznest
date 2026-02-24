import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/theme";

interface WelcomeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: () => void;
}

const WelcomeDialog: React.FC<WelcomeDialogProps> = ({ isOpen, onClose, onGetStarted }) => {
  const theme = useTheme();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-md"
        style={{
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.tertiary,
          color: theme.colors.text
        }}
      >
        <DialogHeader>
          <DialogTitle 
            className="text-xl font-bold mb-2"
            style={{ color: theme.colors.primary }}
          >
            Welcome to Lot Analysis! 🏗️
          </DialogTitle>
          <DialogDescription 
            className="text-sm space-y-3"
            style={{ color: theme.colors.mutedText }}
          >
            <div className="space-y-3">
              <p>
                <strong style={{ color: theme.colors.text }}>Step 1:</strong> We'll gather essential data about your lot for better AI analysis.
              </p>
              <p>
                This includes your lot location, size, available capital, and operating preferences to provide you with the most accurate business recommendations.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm">
                  <span className="font-semibold" style={{ color: theme.colors.primary }}>💡 Pro Tip:</span>
                  <span style={{ color: theme.colors.text }}> Use the map to draw your exact lot boundaries for the most precise analysis!</span>
                </p>
              </div>
              <p>
                Our AI will analyze factors like location demographics, nearby businesses, foot traffic patterns, and market opportunities to suggest the best business type for your specific lot.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center pt-4">
          <Button
            onClick={() => {
              onClose();
              onGetStarted();
            }}
            className="px-6 py-2"
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.isDark ? theme.colors.background : theme.colors.text,
            }}
          >
            Let's Get Started! 🚀
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
