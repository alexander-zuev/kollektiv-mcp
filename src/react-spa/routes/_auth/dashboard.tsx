import { createFileRoute, Outlet } from '@tanstack/react-router';
import { SidebarInset, SidebarProvider } from '@/components/ui';
import { AppSidebar } from '@/features/dashboard/components';
import { DashboardLayout } from '@/components/layouts';

function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </SidebarInset>
    </SidebarProvider>
  );
}

export const Route = createFileRoute('/_auth/dashboard')({
  component: Dashboard,
});