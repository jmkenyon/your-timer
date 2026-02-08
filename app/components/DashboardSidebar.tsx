"use client";

import { Hourglass, LogOut, Settings, CreditCard } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

const TimerItems = [
  {
    title: "Timer Display",
    url: "/dashboard/timer-display",
    icon: Hourglass,
  },
  {
    title: "Timer Settings",
    url: "/dashboard/timer-settings",
    icon: Settings,
  },
];

// const accountItems = [
//   {
//     title: "Billing",
//     url: "/dashboard/billing",
//     icon: CreditCard,
//   },
// ];

export const DashboardSidebar = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  return (
    <Sidebar
      className="group"
      aria-label="Dashboard Sidebar"
      collapsible="icon"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className=" font-medium group-data-[collapsible=icon]:hidden! ml-2 cursor-pointer">
              <Link href="/dashboard">
                {session?.user?.name || "YourTimer.io"}
              </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* TIMER */}
        <SidebarGroup>
          <SidebarGroupLabel>Timer</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {TimerItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "hover:bg-neutral-100 hover:text-black!",
                      isActive(item.url) &&
                        "bg-linear-to-b from-black text-sidebar-primary-foreground! to-black! hover:text-white!"
                    )}
                    tooltip={item.title}
                    isActive={isActive(item.url)}
                  >
                    <Link href={item.url}>
                      <item.icon className="size-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Billing */}
        {/* <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "hover:bg-neutral-100 hover:text-black!",
                      isActive(item.url) &&
                        "bg-linear-to-b from-black text-sidebar-primary-foreground! to-black! hover:text-white!"
                    )}
                    tooltip={item.title}
                    isActive={isActive(item.url)}
                  >
                    <Link href={item.url}>
                      <item.icon className="size-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>*/}
      </SidebarContent> 

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {" "}
            <SidebarMenuButton
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/login"); // redirect to login page
                    },
                  },
                })
              }
              tooltip="Sign out"
              className="cursor-pointer"
            >
              <LogOut size={5} />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};
