import React, { lazy } from 'react';

// Lazy load page components
const NotFound = lazy(() => import('@/pages/common/NotFound'));
const PrivacyPage = lazy(() => import('@/pages/legal/PrivacyPage'));
const TermsPage = lazy(() => import('@/pages/legal/TermsPage'));
const OTPConfirmation = lazy(() => import('@/pages/auth/OTPConfirmation.tsx'));
const SignOutPage = lazy(() => import('@/pages/auth/SignOutPage'));
const AppDashboard = lazy(() => import('@/pages/DashboardPage'));

// Define path constants for type safety and centralized management
export const ROUTES = {
  HOME: '/',
  LEGAL: {
    PRIVACY: '/privacy',
    TERMS: '/terms',
    REFUND: '/refund',
  },
  AUTH: {
    // CALLBACK: '/callback',
    SIGNIN: '/signin',
    CONFIRM: '/auth/confirm',
    OTP: '/otp',
    SIGNOUT: '/signout',
  },
  APP: {
    ROOT: '/app',
    DOCS: '/app/docs',
    PLANS: '/app/plans',
    KEYS: '/app/api-keys',
    SUPPORT: '/app/support',
    FEEDBACK: '/app/feedback',
  },
} as const;

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  requiresAuth: boolean;
  children?: RouteConfig[]; // For nested routes
  title?: string; // Optional for document title/breadcrumbs
}

// Public routes
export const publicRoutes: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    component: AppDashboard,
    requiresAuth: false,
    title: 'Dashboard',
  },
  {
    path: ROUTES.LEGAL.PRIVACY,
    component: PrivacyPage,
    requiresAuth: false,
    title: 'Privacy Policy',
  },
  {
    path: ROUTES.LEGAL.TERMS,
    component: TermsPage,
    requiresAuth: false,
    title: 'Terms of Service',
  },
  // {
  //   path: ROUTES.LEGAL.REFUND,
  //   component: RefundPage,
  //   requiresAuth: false,
  //   title: 'Refund Policy',
  // },
  // {
  //   path: ROUTES.AUTH.SIGNIN,
  //   component: SignInPage,
  //   requiresAuth: false,
  //   title: 'Sign In',
  // },

  // {
  //   path: ROUTES.AUTH.OTP,
  //   component: OtpPage,
  //   requiresAuth: false,
  //   title: 'Sign In',
  // },
  {
    path: ROUTES.AUTH.SIGNOUT,
    component: SignOutPage,
    requiresAuth: false,
    title: 'Sign Out',
  },
  {
    path: ROUTES.AUTH.CONFIRM,
    component: OTPConfirmation,
    requiresAuth: false,
    title: 'OTP Confirmation',
  },
  {
    path: '*',
    component: NotFound,
    requiresAuth: false,
    title: 'Page Not Found',
  },
];

// Protected routes
export const protectedRoutes: RouteConfig[] = [
  // {
  //   path: ROUTES.APP.ROOT,
  //   component: AppDashboard,
  //   requiresAuth: true,
  //   title: 'Dashboard',
  // },
  // {
  //   path: ROUTES.APP.PLANS,
  //   component: AppDashboard,
  //   requiresAuth: true,
  //   title: 'Plans',
  // },
  // {
  //   path: ROUTES.APP.KEYS,
  //   component: AppDashboard,
  //   requiresAuth: true,
  //   title: 'API Keys',
  // },
  // {
  //   path: ROUTES.APP.DOCS,
  //   component: AppDashboard,
  //   requiresAuth: true,
  //   title: 'Docs',
  // },
  // {
  //   path: ROUTES.APP.SUPPORT,
  //   component: AppDashboard,
  //   requiresAuth: true,
  //   title: 'Support',
  // },
  // {
  //   path: ROUTES.APP.FEEDBACK,
  //   component: AppDashboard,
  //   requiresAuth: true,
  //   title: 'Feedback',
  // },
];

// Combine all routes
export const routes: RouteConfig[] = [...publicRoutes, ...protectedRoutes];