
import { SidebarProvider} from "@/components/ui/sidebar"
import { DashboardSidebar } from "../components/DashboardSidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main>

        {children}
      </main>
    </SidebarProvider>
  )
}