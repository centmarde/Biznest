import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/theme";

interface NoticeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
}

const NoticeDialog: React.FC<NoticeDialogProps> = ({
  isOpen,
  onClose,
  title = "Feature Coming Soon",
  description = "This feature is not yet available. We're working hard to bring you this functionality. Please check back later!",
  buttonText = "Understood",
}) => {
  const theme = useTheme();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-md"
        style={{ 
          backgroundColor: theme.colors.background
        }}
      >
        <DialogHeader>
          <DialogTitle 
            className="text-xl font-semibold text-center"
            style={{ color: theme.colors.primary }}
          >
            {title}
          </DialogTitle>
          <DialogDescription 
            className="text-center mt-4"
            style={{ color: theme.colors.mutedText }}
          >
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center mt-6">
          <Button
            onClick={onClose}
            className="px-8 py-2"
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.isDark ? "#FFFFFF" : "#FFFFFF",
            }}
          >
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NoticeDialog;
