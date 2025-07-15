import { createFileRoute } from '@tanstack/react-router';
import { ProductTrackingPage } from '@/features/products';

export const Route = createFileRoute('/_auth/dashboard/')({
  component: ProductTrackingPage,
});