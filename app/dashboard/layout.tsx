
import { SidebarProvider} from "@/components/ui/sidebar"
import { DashboardSidebar } from "../components/DashboardSidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-1 min-h-screen justify-center items-center">

        {children}
      </main>
    </SidebarProvider>
  )
}