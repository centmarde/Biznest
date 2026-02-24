import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/theme/theme";

interface OperatingHoursDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onHoursConfirm: (hours: string) => void;
  currentHours?: string;
}

interface HoursPreset {
  id: string;
  label: string;
  hours: string;
  icon: string;
  description: string;
  color: string;
}

const hoursPresets: HoursPreset[] = [
  {
    id: "morning",
    label: "Morning Hours",
    hours: "6:00 AM - 12:00 PM",
    icon: "🌅",
    description: "Perfect for breakfast places, coffee shops, fresh market vendors",
    color: "#F59E0B"
  },
  {
    id: "business",
    label: "Business Hours", 
    hours: "9:00 AM - 5:00 PM",
    icon: "💼",
    description: "Standard business hours for offices, professional services, retail",
    color: "#3B82F6"
  },
  {
    id: "extended",
    label: "Extended Hours",
    hours: "8:00 AM - 8:00 PM",
    icon: "🏪",
    description: "Great for retail stores, restaurants, service businesses",
    color: "#10B981"
  },
  {
    id: "evening",
    label: "Evening Focus",
    hours: "2:00 PM - 10:00 PM", 
    icon: "🌆",
    description: "Ideal for restaurants, entertainment, nightlife businesses",
    color: "#8B5CF6"
  },
  {
    id: "fullday",
    label: "Full Day",
    hours: "6:00 AM - 10:00 PM",
    icon: "⏰",
    description: "Comprehensive hours for convenience stores, gas stations",
    color: "#EF4444"
  },
  {
    id: "24hours",
    label: "24/7 Operation",
    hours: "24 Hours",
    icon: "🌙",
    description: "Round-the-clock service for convenience stores, security, healthcare",
    color: "#6366F1"
  }
];

const daysOptions = [
  { id: "weekdays", label: "Monday - Friday", days: "Mon-Fri" },
  { id: "weekend", label: "Weekends Only", days: "Sat-Sun" },
  { id: "fullweek", label: "7 Days a Week", days: "Mon-Sun" },
  { id: "sixdays", label: "6 Days (Mon-Sat)", days: "Mon-Sat" }
];

const OperatingHoursDialog: React.FC<OperatingHoursDialogProps> = ({ 
  isOpen, 
  onClose, 
  onHoursConfirm, 
  currentHours = "" 
}) => {
  const theme = useTheme();
  const [selectedPreset, setSelectedPreset] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<string>("fullweek");
  const [customHours, setCustomHours] = useState<string>(currentHours);
  const [isCustomInput, setIsCustomInput] = useState<boolean>(false);

  const handlePresetSelect = (preset: HoursPreset) => {
    setSelectedPreset(preset.id);
    setCustomHours(`${preset.hours} (${daysOptions.find(d => d.id === selectedDays)?.days})`);
    setIsCustomInput(false);
  };

  const handleDaysChange = (daysId: string) => {
    setSelectedDays(daysId);
    if (selectedPreset) {
      const preset = hoursPresets.find(p => p.id === selectedPreset);
      if (preset) {
        const days = daysOptions.find(d => d.id === daysId);
        setCustomHours(`${preset.hours} (${days?.days})`);
      }
    }
  };

  const handleCustomInput = () => {
    setSelectedPreset("");
    setIsCustomInput(true);
  };

  const handleConfirm = () => {
    if (customHours.trim()) {
      onHoursConfirm(customHours.trim());
      onClose();
    } else {
      alert("Please select operating hours or enter custom hours");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-4xl max-h-[90vh] overflow-y-auto"
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
            Operating Hours ⏰
          </DialogTitle>
          <DialogDescription 
            className="text-sm mb-4"
            style={{ color: theme.colors.mutedText }}
          >
            Define when your business will be open. Choose from common schedules or create a custom schedule that fits your business model.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Days Selection */}
          <div>
            <h3 className="text-sm font-semibold mb-3" style={{ color: theme.colors.text }}>
              Operating Days
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {daysOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleDaysChange(option.id)}
                  className={`p-3 text-sm rounded-lg border transition-all ${
                    selectedDays === option.id ? 'ring-2' : ''
                  }`}
                  style={{
                    borderColor: selectedDays === option.id ? theme.colors.primary : theme.colors.tertiary,
                    backgroundColor: selectedDays === option.id ? `${theme.colors.primary}20` : theme.colors.background,
                    color: theme.colors.text
                  }}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs mt-1" style={{ color: theme.colors.mutedText }}>
                    {option.days}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Hours Presets */}
          <div>
            <h3 className="text-sm font-semibold mb-3" style={{ color: theme.colors.text }}>
              Operating Hours
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {hoursPresets.map((preset) => (
                <div
                  key={preset.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedPreset === preset.id ? 'ring-2' : ''
                  }`}
                  style={{
                    borderColor: selectedPreset === preset.id ? theme.colors.primary : theme.colors.tertiary,
                    backgroundColor: theme.colors.background
                  }}
                  onClick={() => handlePresetSelect(preset)}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="text-2xl p-2 rounded-lg"
                      style={{ backgroundColor: `${preset.color}20` }}
                    >
                      {preset.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1" style={{ color: theme.colors.text }}>
                        {preset.label}
                      </h4>
                      <p className="text-sm font-medium mb-2" style={{ color: preset.color }}>
                        {preset.hours}
                      </p>
                      <p className="text-xs" style={{ color: theme.colors.mutedText }}>
                        {preset.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Input Option */}
          <div className="border-t pt-4" style={{ borderColor: theme.colors.tertiary }}>
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                isCustomInput ? 'ring-2' : ''
              }`}
              style={{
                borderColor: isCustomInput ? theme.colors.primary : theme.colors.tertiary,
                backgroundColor: theme.colors.background
              }}
              onClick={handleCustomInput}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="text-2xl p-2 rounded-lg"
                  style={{ backgroundColor: `${theme.colors.primary}20` }}
                >
                  ✏️
                </div>
                <div>
                  <h4 className="font-semibold text-sm" style={{ color: theme.colors.text }}>
                    Custom Schedule
                  </h4>
                  <p className="text-xs" style={{ color: theme.colors.mutedText }}>
                    Define your own operating hours and days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hours Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: theme.colors.text }}>
              Operating Hours Schedule
            </label>
            <Input
              type="text"
              placeholder="e.g., 9:00 AM - 5:00 PM (Mon-Fri)"
              value={customHours}
              onChange={(e) => setCustomHours(e.target.value)}
              className="text-sm"
            />
            <p className="text-xs" style={{ color: theme.colors.mutedText }}>
              Include both time range and days (e.g., "8:00 AM - 6:00 PM (Monday-Saturday)")
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              style={{
                borderColor: theme.colors.tertiary,
                color: theme.colors.mutedText
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!customHours.trim()}
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.isDark ? theme.colors.background : theme.colors.text,
              }}
            >
              Confirm Hours
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OperatingHoursDialog;
