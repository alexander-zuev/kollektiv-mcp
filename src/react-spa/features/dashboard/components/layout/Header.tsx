import { Logo } from '@/components/ui/atoms/brand';

import { UserAvatar } from '@/features/auth/components/UserAvatar.tsx';
import { useAuthStore } from '@/features/auth/store/AuthStore.tsx';
import { ROUTES } from '@/routing';
import React, { JSX } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components';
import { LoginModal } from '@/features/auth/components/LoginModal.tsx';
import { authService } from '@/features/auth/services/authService.ts';
import { User } from '@supabase/supabase-js';

const HeaderContainer = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <header>
      <div className="w-full page-header">
        <div className="content-container-fixed-width flex items-center justify-between">
          {children}
        </div>
      </div>
    </header>
  );
};

interface UserAvatarMenuProps {
  user: User | null;
}

const UserAvatarMenu = ({ user }: UserAvatarMenuProps) => {
  const { signOut } = authService();

  const handleLogOut = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserAvatar user={user} iconSize="md" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align={'end'}>
        <DropdownMenuItem variant={'destructive'} onSelect={handleLogOut}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

/**
 * Main application header.
 *
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  Logo (left)                               Avatar (right) ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 */
export const Header = (): JSX.Element => {
  const user = useAuthStore(useShallow(s => s.user));
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSignIn = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <HeaderContainer>
        <a
          href={ROUTES.HOME}
          className="flex items-center hover: text-foreground space-x-2 font-mono"
        >
          <Logo size="xl" variant="text" color="white" />
        </a>
        {user ? (
          <UserAvatarMenu user={user} />
        ) : (
          <Button variant={'link'} className={'text-foreground '} onClick={handleSignIn}>
            Sign in
          </Button>
          // <div aria-hidden className="size-8" /> // 32 × 32 px
        )}
      </HeaderContainer>
      <LoginModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default Header;