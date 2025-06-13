'use client';

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LayoutDashboard,
  LogIn,
  LogOut,
  LogOutIcon,
  Send,
  Settings,
  Sparkles,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useCurrentUser } from '@/hooks/use-current-user';
import Link from 'next/link';
import { ModeToggle } from './layout/mode-toggle';
import { signOut } from 'next-auth/react';

export function NavUser() {
  const { isMobile } = useSidebar();
  const user = useCurrentUser();

  return (
    <SidebarMenu>
      {user ? (
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              {user && (
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <LayoutDashboard />
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings />
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Send />
                    <Link href="/submit">Submit</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <div className="flex justify-between">
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={(event) => {
                        event.preventDefault();
                        signOut({
                          callbackUrl: `${window.location.origin}/`,
                          redirect: true,
                        });
                      }}
                    >
                      <div className="flex items-center space-x-2.5">
                        <LogOutIcon className="size-4" />
                        <p className="text-sm">Log out</p>
                      </div>
                    </DropdownMenuItem>
                    <ModeToggle />
                  </div>
                </DropdownMenuGroup>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      ) : (
        <div className="p-4 flex space-x-2">
          <LogIn />{' '}
          <Link href="/auth/login">
            <span>Login</span>
          </Link>
        </div>
      )}
    </SidebarMenu>
  );
}
