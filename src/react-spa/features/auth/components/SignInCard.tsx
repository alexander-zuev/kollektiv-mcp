import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from '@/components/ui/layout/containers/card';
import { Divider } from '@/components/ui/layout/dividers/divider';
import { cn } from '@/shared/utils/tailwind-utils';
import React from 'react';
import { Link } from 'react-router-dom';
import { OAuthButtons } from './OAuthButtons';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/atoms/buttons';

interface SignInCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  onGitHubSignIn: () => void;
  onGoogleSignIn: () => void;
  isLoading: boolean;
  onClose?: () => void;
}

export const SignInCard = ({
  title,
  description,
  children,
  className,
  onGitHubSignIn,
  onGoogleSignIn,
  isLoading,
  onClose,
}: SignInCardProps) => {
  return (
    <div className="component-width-card w-full">
      <Card className={cn('px-6 py-8 sm:px-8 relative', className)}>
        {onClose && (
          <CardAction className="absolute right-4 top-4 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors cursor-pointer">
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close dialog">
              <X className="h-4 w-4" />
            </Button>
          </CardAction>
        )}
        <CardHeader className={'flex flex-col items-center'}>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <OAuthButtons
            onGitHubSignIn={onGitHubSignIn}
            onGoogleSignIn={onGoogleSignIn}
            isLoading={isLoading}
          />
          <Divider text="Or continue with email" />
          {children}
          <CardFooter className="flex flex-col mt-0">
            <small className="text-center text-muted-foreground">
              By signing in, you agree to our{' '}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </small>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};