import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/theme/theme";
import { businessCategories, searchBusinessTypes } from "../helpers/businessTypes";

interface BusinessTypeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onBusinessTypeConfirm: (businessType: string) => void;
  currentBusinessType?: string;
}

const BusinessTypeDialog: React.FC<BusinessTypeDialogProps> = ({ 
  isOpen, 
  onClose, 
  onBusinessTypeConfirm, 
  currentBusinessType = "" 
}) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedExample, setSelectedExample] = useState<string>("");
  const [customBusinessType, setCustomBusinessType] = useState<string>(currentBusinessType);
  const [isCustomInput, setIsCustomInput] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update suggestions when input changes
  useEffect(() => {
    if (customBusinessType.trim().length > 0) {
      const newSuggestions = searchBusinessTypes(customBusinessType);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [customBusinessType]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedInput = inputRef.current && inputRef.current.contains(target);
      const clickedDropdown = dropdownRef.current && dropdownRef.current.contains(target);
      
      if (!clickedInput && !clickedDropdown) {
        setShowSuggestions(false);
      }
    };

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSuggestions]);

  const handleCategorySelect = (category: typeof businessCategories[0]) => {
    setSelectedCategory(category.id);
    setSelectedExample("");
    setIsCustomInput(false);
    setShowSuggestions(false);
  };

  const handleExampleSelect = (example: string) => {
    setSelectedExample(example);
    setCustomBusinessType(example);
    setIsCustomInput(false);
    setShowSuggestions(false);
  };

  const handleCustomInput = () => {
    setSelectedCategory("");
    setSelectedExample("");
    setIsCustomInput(true);
    setShowSuggestions(false);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    console.log('Suggestion selected:', suggestion); // Debug log
    setCustomBusinessType(suggestion);
    setShowSuggestions(false);
    setSelectedCategory("");
    setSelectedExample("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomBusinessType(e.target.value);
    setSelectedCategory("");
    setSelectedExample("");
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleConfirm = () => {
    if (customBusinessType.trim()) {
      setShowSuggestions(false);
      onBusinessTypeConfirm(customBusinessType.trim());
      onClose();
    } else {
      alert("Please select a business type or enter a custom business type");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-6xl max-h-[90vh] overflow-y-auto"
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
            Business Type 🏢
          </DialogTitle>
          <DialogDescription 
            className="text-sm mb-4"
            style={{ color: theme.colors.mutedText }}
          >
            What type of business are you planning? Choose from popular categories or enter your specific business type.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Business Categories */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: theme.colors.text }}>
              Business Categories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {businessCategories.map((category) => (
                <div
                  key={category.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                    selectedCategory === category.id ? 'ring-2' : ''
                  }`}
                  style={{
                    borderColor: selectedCategory === category.id ? theme.colors.primary : theme.colors.tertiary,
                    backgroundColor: selectedCategory === category.id ? `${category.color}10` : theme.colors.background
                  }}
                  onClick={() => handleCategorySelect(category)}
                >
                  <div className="text-center">
                    <div 
                      className="text-3xl mb-2 p-2 rounded-lg mx-auto w-fit"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      {category.icon}
                    </div>
                    <h4 className="font-semibold text-sm mb-1" style={{ color: theme.colors.text }}>
                      {category.label}
                    </h4>
                    <p className="text-xs" style={{ color: theme.colors.mutedText }}>
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Examples from Selected Category */}
          {selectedCategory && (
            <div>
              <h3 className="text-sm font-semibold mb-3" style={{ color: theme.colors.text }}>
                Popular {businessCategories.find(c => c.id === selectedCategory)?.label} Businesses
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {businessCategories
                  .find(c => c.id === selectedCategory)
                  ?.examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleSelect(example)}
                      className={`p-3 text-sm rounded-lg border transition-all hover:shadow-sm ${
                        selectedExample === example ? 'ring-2' : ''
                      }`}
                      style={{
                        borderColor: selectedExample === example ? theme.colors.primary : theme.colors.tertiary,
                        backgroundColor: selectedExample === example ? `${theme.colors.primary}20` : theme.colors.background,
                        color: theme.colors.text
                      }}
                    >
                      {example}
                    </button>
                  ))}
              </div>
            </div>
          )}

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
                    Custom Business Type
                  </h4>
                  <p className="text-xs" style={{ color: theme.colors.mutedText }}>
                    Enter your specific business type if not listed above
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Type Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: theme.colors.text }}>
              Business Type
            </label>
            <div className="relative">
              <Input
                ref={inputRef}
                type="text"
                placeholder="e.g., Coffee Shop, Retail Store, Restaurant"
                value={customBusinessType}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="text-sm"
              />
              
              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div 
                  ref={dropdownRef}
                  className="absolute z-10 w-full mt-1 border rounded-lg shadow-lg max-h-48 overflow-y-auto"
                  style={{ 
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.tertiary
                  }}
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 cursor-pointer text-sm hover:bg-opacity-80 border-b last:border-b-0"
                      style={{
                        color: theme.colors.text,
                        backgroundColor: theme.colors.background,
                        borderBottomColor: theme.colors.tertiary
                      }}
                      onMouseDown={() => handleSuggestionSelect(suggestion)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${theme.colors.primary}15`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = theme.colors.background;
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs" style={{ color: theme.colors.mutedText }}>
              Start typing to see suggestions, or be specific about your business type (e.g., "Italian Restaurant")
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
              disabled={!customBusinessType.trim()}
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.isDark ? theme.colors.background : theme.colors.text,
              }}
            >
              Confirm Business Type
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessTypeDialog;
