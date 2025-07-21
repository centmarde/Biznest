import { User, Moon, Sun, Monitor, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "@/theme/theme"
import styled from "styled-components"

// Don't use theme directly in styled-components, use regular styling
const NavbarContainer = styled.nav`
  margin: 1rem;
  border-radius: 8px;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavbarContent = styled.div`
  display: flex;
  height: 4rem;
  align-items: center;
  padding: 0 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export function Navbar() {
  const theme = useTheme();

  return (
    <NavbarContainer style={{ 
      backgroundColor: theme?.colors?.background || '#fff',
      border: `1px solid ${theme?.colors?.tertiary || '#eee'}`
    }}>
      <NavbarContent>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Theme Toggler */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full relative">
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" style={{ 
              backgroundColor: theme?.colors?.background || '#fff',
              color: theme?.colors?.text || '#000',
              border: `1px solid ${theme?.colors?.tertiary || '#eee'}`
            }}>
              <DropdownMenuItem>
                <Sun className="mr-2 h-4 w-4" />
                <span style={{ color: theme?.colors?.text || '#000' }}>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Moon className="mr-2 h-4 w-4" />
                <span style={{ color: theme?.colors?.text || '#000' }}>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Monitor className="mr-2 h-4 w-4" />
                <span style={{ color: theme?.colors?.text || '#000' }}>System</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Logo or brand could go here */}
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" style={{ 
              backgroundColor: theme?.colors?.background || '#fff',
              color: theme?.colors?.text || '#000',
              border: `1px solid ${theme?.colors?.tertiary || '#eee'}`
            }}>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <a href="/account" className="w-full" >
                  My Account
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <a href="/settings" className="w-full">
                  Settings
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <button className="w-full text-left" >Logout</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </NavbarContent>
    </NavbarContainer>
  )
}
