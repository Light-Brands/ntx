import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1">
          <div className="container py-6 px-4">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

