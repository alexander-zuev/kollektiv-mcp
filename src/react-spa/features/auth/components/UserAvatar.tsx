import { cn } from '@/shared/utils/utils.ts';
import { User } from '@supabase/supabase-js';
import React, { JSX, useMemo } from 'react';

export interface UserAvatarProps {
  user?: User | null;
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  textSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showStatus?: boolean;
  statusColor?: 'online' | 'offline' | 'away' | 'busy';
}

/**
 * UserAvatar - Displays a user's profile picture from social providers or a fallback
 *
 * Features:
 * - Displays profile pictures from GitHub and Google
 * - Falls back to user initials for email users
 * - Provides a default avatar for anonymous users
 * - Supports different sizes and customization
 */
export const UserAvatar = React.forwardRef<HTMLButtonElement, UserAvatarProps>(
  (
    {
      user,
      iconSize = 'md',
      className,
      showStatus = false,
      statusColor = 'online',
      ...buttonProps /* pass-through props such as onClick, aria-* */
    },
    ref
  ): JSX.Element => {
    // Size mapping
    const sizeClasses = {
      xs: 'size-4 text-xs',
      sm: 'size-6 text-sm',
      md: 'size-7 text-base',
      lg: 'size-8 text-lg',
      xl: 'size-9 text-xl',
    };

    // Status color mapping
    const statusColorClasses = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      away: 'bg-yellow-500',
      busy: 'bg-red-500',
    };

    // Get user profile image from metadata
    const profileImage = useMemo(() => {
      if (!user) return null;

      // Check for avatar in user_metadata
      if (user.user_metadata?.avatar_url) {
        return user.user_metadata.avatar_url;
      }

      // Check for Google picture
      if (user.user_metadata?.picture) {
        return user.user_metadata.picture;
      }

      return null;
    }, [user]);

    // Generate initials from user data
    const initials = useMemo(() => {
      if (!user) return '?';

      // Try to get name from metadata
      const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email;

      if (!name) return '?';

      // If it's an email, use first letter
      if (name.includes('@')) {
        return name.charAt(0).toUpperCase();
      }

      // Otherwise get initials from name (first letter of first and last name)
      const parts = name.split(' ');
      if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }, [user]);

    // Generate a consistent background color based on user id or email
    const backgroundColor = useMemo(() => {
      if (!user) return 'bg-blue-100';

      // Simple hash function for consistent color
      const str = user.id || user.email || '';
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }

      // List of pleasant background colors
      const colors = [
        'bg-blue-100',
        'bg-green-100',
        'bg-purple-100',
        'bg-yellow-100',
        'bg-pink-100',
        'bg-indigo-100',
        'bg-red-100',
        'bg-teal-100',
        'bg-orange-100',
      ];

      return colors[Math.abs(hash) % colors.length];
    }, [user]);

    return (
      <button
        ref={ref}
        type="button"
        tabIndex={0}
        className={cn('relative inline-block cursor-pointer', className)}
        {...buttonProps}
      >
        {profileImage ? (
          <img
            src={profileImage}
            alt={`${user?.email || 'User'}'s avatar`}
            className={cn('rounded-full object-cover', sizeClasses[iconSize])}
          />
        ) : (
          <div
            className={cn(
              'rounded-full flex items-center justify-center text-gray-700',
              backgroundColor,
              sizeClasses[iconSize]
            )}
            aria-label={`${user?.email || 'User'}'s avatar`}
          >
            {initials}
          </div>
        )}

        {showStatus && (
          <span
            className={cn(
              'absolute bottom-0 right-0 rounded-full border-2 border-white',
              statusColorClasses[statusColor],
              sizeClasses[iconSize]
            )}
          />
        )}
      </button>
    );
  }
);

UserAvatar.displayName = 'UserAvatar'; // Required when using forwardRef