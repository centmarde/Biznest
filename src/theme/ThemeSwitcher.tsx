import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/theme/theme"

export function ThemeSwitcher() {
  const theme = useTheme();

  const handleLightMode = () => {
    if (theme.isDark) {
      theme.toggleTheme();
    }
  };

  const handleDarkMode = () => {
    if (!theme.isDark) {
      theme.toggleTheme();
    }
  };

  const handleSystemMode = () => {
    // For now, just toggle to system default (light mode)
    // You could implement actual system preference detection here
    if (theme.isDark) {
      theme.toggleTheme();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full relative hover:bg-opacity-10"
          style={{
            backgroundColor: 'transparent',
            color: theme?.colors?.text || '#000',
            border: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${theme?.colors?.tertiary || '#eee'}40`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {theme.isDark ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        style={{ 
          backgroundColor: theme?.colors?.background || '#fff',
          color: theme?.colors?.text || '#000',
          border: `1px solid ${theme?.colors?.tertiary || '#eee'}`
        }}
      >
        <DropdownMenuItem 
          onClick={handleLightMode}
          style={{
            color: theme?.colors?.text || '#000',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${theme?.colors?.tertiary || '#eee'}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light {!theme.isDark && '✓'}</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleDarkMode}
          style={{
            color: theme?.colors?.text || '#000',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${theme?.colors?.tertiary || '#eee'}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark {theme.isDark && '✓'}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleSystemMode}
          style={{
            color: theme?.colors?.text || '#000',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${theme?.colors?.tertiary || '#eee'}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
