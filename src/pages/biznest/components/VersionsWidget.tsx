import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/theme/theme';
import axios from 'axios';
import { X, CheckCircle, Info } from 'lucide-react';

interface VersionLog {
  version: string;
  versionName: string;
  description: string;
  changelog: string[];
}

interface VersionsWidgetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VersionsWidget: React.FC<VersionsWidgetProps> = ({ open, onOpenChange }) => {
  const theme = useTheme();
  const [versionLog, setVersionLog] = useState<VersionLog | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVersionData = async () => {
      if (!open) return; // Only fetch when dialog is open
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axios.get<VersionLog>('/data/version.json');
        setVersionLog(response.data);
      } catch (err) {
        console.error('Failed to fetch version data:', err);
        setError('Failed to load version information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVersionData();
  }, [open]);

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl max-h-[80vh] overflow-y-auto"
        style={{ 
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.tertiary
        }}
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info 
                className="w-6 h-6" 
                style={{ color: theme.colors.primary }}
              />
              <DialogTitle 
                className="text-xl font-semibold"
                style={{ 
                  ...theme.components.text.heading,
                  fontSize: '1.25rem'
                }}
              >
                Welcome to Biznest!
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-6 w-6 p-0"
              style={{
                color: theme.colors.mutedText,
                backgroundColor: 'transparent'
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <DialogDescription style={{ color: theme.colors.mutedText }}>
            Here's what's new in the latest version
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div 
              className="animate-spin rounded-full h-8 w-8 border-b-2"
              style={{ borderBottomColor: theme.colors.primary }}
            ></div>
            <span 
              className="ml-2 text-sm"
              style={{ color: theme.colors.mutedText }}
            >
              Loading version information...
            </span>
          </div>
        ) : error ? (
          <Card 
            className="border-red-200"
            style={{
              ...theme.components.card,
              borderColor: '#fca5a5',
              backgroundColor: theme.colors.card
            }}
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-2" style={{ color: '#dc2626' }}>
                <X className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        ) : versionLog ? (
          <div className="space-y-4">
            {/* Version Header */}
            <Card style={theme.components.card}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle 
                    className="text-lg"
                    style={{ 
                      ...theme.components.text.heading,
                      fontSize: '1.125rem'
                    }}
                  >
                    Current Version
                  </CardTitle>
                  <Badge 
                    variant="default" 
                    className="bg-green-100 text-green-700 border-green-300"
                    style={{
                      backgroundColor: theme.colors.tertiary,
                      color: theme.colors.primary,
                      borderColor: theme.colors.secondary
                    }}
                  >
                    v{versionLog.version}
                  </Badge>
                </div>
                <p 
                  className="text-sm font-medium"
                  style={{ color: theme.colors.text }}
                >
                  {versionLog.versionName}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <p 
                  className="text-sm"
                  style={{ color: theme.colors.mutedText }}
                >
                  {versionLog.description}
                </p>
              </CardContent>
            </Card>

            {/* Changelog */}
            <Card style={theme.components.card}>
              <CardHeader className="pb-3">
                <CardTitle 
                  className="text-lg flex items-center gap-2"
                  style={{ 
                    ...theme.components.text.heading,
                    fontSize: '1.125rem'
                  }}
                >
                  <CheckCircle 
                    className="w-5 h-5" 
                    style={{ color: theme.colors.secondary }}
                  />
                  What's New
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {versionLog.changelog.map((change, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div 
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: theme.colors.primary }}
                      ></div>
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ color: theme.colors.text }}
                      >
                        {change}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Separator style={{ backgroundColor: theme.colors.tertiary }} />

            {/* Action Button */}
            <div className="flex justify-end pt-2">
              <Button 
                onClick={handleClose} 
                className="px-6"
                style={{
                  ...theme.components.button.primary.base,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, theme.components.button.primary.hover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, theme.components.button.primary.base);
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default VersionsWidget;
