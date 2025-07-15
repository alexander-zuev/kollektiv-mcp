import { LoadingSpinner } from '@/components';
import AuthLayout from '@/components/layouts/AuthLayout';
import { authService } from '@/features/auth/services/authService';
import { ROUTES } from '@/routing/config';
import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignOutPage = (): ReactElement => {
  const { signOut } = authService();
  const navigate = useNavigate();
  useEffect(() => {
    signOut();
    navigate(ROUTES.HOME);
  }, [signOut, navigate]);

  return (
    <AuthLayout>
      <LoadingSpinner text="Signing out..." />
    </AuthLayout>
  );
};

export default SignOutPage;