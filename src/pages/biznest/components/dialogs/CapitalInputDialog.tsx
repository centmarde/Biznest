import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/theme/theme";

interface CapitalInputDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCapitalConfirm: (capital: string) => void;
  currentCapital?: string;
}

interface CapitalRange {
  id: string;
  label: string;
  range: string;
  image: string;
  description: string;
  minValue: number;
  maxValue: number;
}

const capitalRanges: CapitalRange[] = [
  {
    id: "small",
    label: "Small Business",
    range: "₱50,000 - ₱500,000",
    image: "/images/1.jpg", // Small retail/food cart
    description: "Perfect for food carts, small retail, or service businesses",
    minValue: 50000,
    maxValue: 500000
  },
  {
    id: "medium",
    label: "Medium Business", 
    range: "₱500,000 - ₱2,000,000",
    image: "/images/2.jpg", // Restaurant/shop
    description: "Ideal for restaurants, shops, or light manufacturing",
    minValue: 500000,
    maxValue: 2000000
  },
  {
    id: "large",
    label: "Large Business",
    range: "₱2,000,000 - ₱10,000,000", 
    image: "/images/3.jpg", // Warehouse/factory
    description: "Great for warehouses, factories, or franchise operations",
    minValue: 2000000,
    maxValue: 10000000
  },
  {
    id: "enterprise",
    label: "Enterprise",
    range: "₱10,000,000+",
    image: "/images/4.jpg", // Large facility
    description: "For major developments, large manufacturing, or retail chains",
    minValue: 10000000,
    maxValue: 100000000
  }
];

const CapitalInputDialog: React.FC<CapitalInputDialogProps> = ({ 
  isOpen, 
  onClose, 
  onCapitalConfirm, 
  currentCapital = "" 
}) => {
  const theme = useTheme();
  const [selectedRange, setSelectedRange] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>(currentCapital);
  const [isCustomInput, setIsCustomInput] = useState<boolean>(false);

  const handleRangeSelect = (range: CapitalRange) => {
    setSelectedRange(range.id);
    setCustomAmount(range.minValue.toString());
    setIsCustomInput(false);
  };

  const handleCustomInput = () => {
    setSelectedRange("");
    setIsCustomInput(true);
  };

  const handleConfirm = () => {
    if (customAmount && parseInt(customAmount) > 0) {
      onCapitalConfirm(customAmount);
      onClose();
    } else {
      alert("Please enter a valid capital amount");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0
    }).format(amount);
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
            Investment Capital 💰
          </DialogTitle>
          <DialogDescription 
            className="text-sm mb-4"
            style={{ color: theme.colors.mutedText }}
          >
            Select your available capital range or enter a custom amount. This helps us recommend the most suitable business types for your budget.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Capital Range Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capitalRanges.map((range) => (
              <div
                key={range.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedRange === range.id ? 'ring-2' : ''
                }`}
                style={{
                  borderColor: selectedRange === range.id ? theme.colors.primary : theme.colors.tertiary,
                  backgroundColor: theme.colors.background
                }}
                onClick={() => handleRangeSelect(range)}
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={range.image}
                      alt={range.label}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/landing.png'; // Fallback image
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1" style={{ color: theme.colors.text }}>
                      {range.label}
                    </h3>
                    <p className="text-sm font-medium mb-2" style={{ color: theme.colors.primary }}>
                      {range.range}
                    </p>
                    <p className="text-xs" style={{ color: theme.colors.mutedText }}>
                      {range.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
                <span className="text-2xl">✏️</span>
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: theme.colors.text }}>
                    Custom Amount
                  </h3>
                  <p className="text-xs" style={{ color: theme.colors.mutedText }}>
                    Enter your specific capital amount
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: theme.colors.text }}>
              Capital Amount (PHP)
            </label>
            <Input
              type="number"
              placeholder="Enter amount in PHP"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="text-lg"
              min="1000"
            />
            {customAmount && parseInt(customAmount) > 0 && (
              <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                Formatted: {formatCurrency(parseInt(customAmount))}
              </p>
            )}
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
              disabled={!customAmount || parseInt(customAmount) <= 0}
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.isDark ? theme.colors.background : theme.colors.text,
              }}
            >
              Confirm Capital
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CapitalInputDialog;
