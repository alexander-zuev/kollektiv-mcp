import { JSX } from 'react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routing/config.ts';

export const Footer = (): JSX.Element => {
  return (
    <footer className="mb-4 mt-4">
      <div className="text-xs content-container-fixed-width flex flex-row justify-center gap-4 text-center text-muted-foreground">
        <a
          href="https://github.com/alexander-zuev/kollektiv-mcp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors"
        >
          <FaGithub className="w-4 h-4" />
          <span>GitHub</span>
        </a>
        <Link
          to={ROUTES.LEGAL.TERMS}
          className="text-xs text-foreground/60 hover:text-foreground/80 transition-colors"
        >
          Terms
        </Link>
        <Link
          to={ROUTES.LEGAL.PRIVACY}
          className="text-xs text-foreground/60 hover:text-foreground/80 transition-colors"
        >
          Privacy
        </Link>
      </div>
    </footer>
  );
};