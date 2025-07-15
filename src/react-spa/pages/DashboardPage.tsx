import { DashboardContainer } from '@/features/dashboard/components/DashboardContainer.tsx';
import { AppLayout } from '@/components/layouts/AppLayout.tsx';
import { Header } from '@/features/dashboard';
import { Footer } from '@/features/dashboard';

const AppDashboard = () => {
  return (
    <AppLayout header={<Header />} footer={<Footer />}>
      <DashboardContainer />
    </AppLayout>
  );
};

export default AppDashboard;