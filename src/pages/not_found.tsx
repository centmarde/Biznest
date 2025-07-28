

import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search } from "lucide-react"
import { useTheme } from "@/theme/theme"

export default function NotFound() {
  const theme = useTheme();
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.colors.background,
        color: theme.colors.text,
        transition: 'background-color 0.3s ease',
      }}
    >
      <div style={{
        maxWidth: 400,
        margin: '0 auto',
        textAlign: 'center',
        padding: '0 1rem',
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '7rem', fontWeight: 'bold', color: theme.colors.primary + '33' }}>404</h1>
          <div style={{ position: 'relative', marginTop: '-2rem' }}>
            <h2 style={{ ...theme.components.text.heading, marginBottom: '0.5rem', color: theme.colors.text }}>Page Not Found</h2>
            <p style={{ ...theme.components.text.body, color: theme.colors.mutedText, marginBottom: '2rem' }}>
              {"Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL."}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', justifyContent: 'center' }}>
          <Button
            style={theme.components.button.primary.base}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = typeof theme.components.button.primary.hover?.backgroundColor === 'string' ? theme.components.button.primary.hover.backgroundColor : ''}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = typeof theme.components.button.primary.base.backgroundColor === 'string' ? theme.components.button.primary.base.backgroundColor : ''}
          >
            <a href="/" className="flex items-center" style={{ color: theme.components.button.primary.base.color, textDecoration: 'none' }}>
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </a>
          </Button>

          <Button
            variant="outline"
            style={theme.components.button.secondary.base}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = typeof theme.components.button.secondary.hover?.backgroundColor === 'string' ? theme.components.button.secondary.hover.backgroundColor : ''}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = typeof theme.components.button.secondary.base.backgroundColor === 'string' ? theme.components.button.secondary.base.backgroundColor : ''}
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>

          <Button
            variant="outline"
            style={theme.components.button.secondary.base}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = typeof theme.components.button.secondary.hover?.backgroundColor === 'string' ? theme.components.button.secondary.hover.backgroundColor : ''}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = typeof theme.components.button.secondary.base.backgroundColor === 'string' ? theme.components.button.secondary.base.backgroundColor : ''}
          >
            <a href="/search" className="flex items-center" style={{ color: theme.components.button.secondary.base.color, textDecoration: 'none' }}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </a>
          </Button>
        </div>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: `1px solid ${theme.colors.tertiary}` }}>
          <p style={{ ...theme.components.text.small, color: theme.colors.mutedText }}>
            Need help?{' '}
            <a href="/contact" style={{ color: theme.colors.primary, textDecoration: 'underline' }}>
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
