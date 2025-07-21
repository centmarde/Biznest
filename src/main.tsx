import { StrictMode, Suspense, lazy, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Loader from './components/loader'
import { ThemeProvider, useTheme } from './theme/theme'

// Lazy load the App component
const App = lazy(() => import('./App.tsx'))

// Component that applies theme background to document body
function ThemedApp() {
  const theme = useTheme();

  useEffect(() => {
    // Apply theme background to document body so it covers the entire viewport
    document.body.style.backgroundColor = theme.colors.background;
    document.body.style.transition = 'background-color 0.3s ease';
    document.body.style.minHeight = '100vh';
    
    // Also apply to the root element to ensure complete coverage
    const rootElement = document.documentElement;
    rootElement.style.backgroundColor = theme.colors.background;
    rootElement.style.transition = 'background-color 0.3s ease';
    
    console.log('Main.tsx - Theme background applied:', theme.colors.background, 'Dark mode:', theme.isDark);
  }, [theme.colors.background, theme.isDark]);

  return (
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  </StrictMode>,
)
