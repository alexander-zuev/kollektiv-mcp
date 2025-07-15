import {Link,} from '@tanstack/react-router';
import {FaGithub} from 'react-icons/fa';

export const Footer = (): React.ReactNode => {
    return (
        <footer className="mb-4 mt-4">
            <div
                className="text-xs content-container-fixed-width flex flex-row justify-center gap-4 text-center text-muted-foreground">
                <a
                    href="https://github.com/alexander-zuev/kollektiv-mcp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors"
                >
                    <FaGithub className="w-4 h-4"/>
                    <span>GitHub</span>
                </a>
                <Link
                    to={'/legal/terms'}
                    className="text-xs text-foreground/60 hover:text-foreground/80 transition-colors"
                >
                    Terms
                </Link>
                <Link
                    to={'/legal/privacy'}
                    className="text-xs text-foreground/60 hover:text-foreground/80 transition-colors"
                >
                    Privacy
                </Link>
            </div>
        </footer>
    );
};