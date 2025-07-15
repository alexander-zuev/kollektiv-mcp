import { Button } from '@/components/ui/atoms/buttons';
import { FaGoogle } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa6';

interface OAuthButtonsProps {
  className?: string;
  onGitHubSignIn?: () => void;
  onGoogleSignIn?: () => void;
  isLoading?: boolean;
}

export function OAuthButtons({
  className,
  onGitHubSignIn,
  onGoogleSignIn,
  isLoading = false,
}: OAuthButtonsProps) {
  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="outline"
        className="w-full flex bg-surface items-center justify-left"
        onClick={onGitHubSignIn}
        disabled={isLoading}
      >
        <FaGithub className="h-5 w-5 text-white" />
        Continue with GitHub
      </Button>
      <Button
        variant="outline"
        className="w-full flex bg-surface items-center justify-left"
        onClick={onGoogleSignIn}
        disabled={isLoading}
      >
        <FaGoogle className="h-5 w-5 text-white" />
        Continue with Google
      </Button>
    </div>
  );
}
