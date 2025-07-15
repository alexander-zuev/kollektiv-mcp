import {Link, type LinkProps} from '@tanstack/react-router';
import {Button} from '@/components/ui/atoms/buttons'
import {Logo} from '@/components/ui/atoms/icons';

const Footer = (): React.ReactNode => {
    const currentYear = new Date().getFullYear();
    const LinkButton = ({
                            children,
                            ...linkProps
                        }: LinkProps & {
        children: React.ReactNode;
    }) => (
        <Button asChild variant="link" className={'text-muted-foreground'}>
            <Link {...linkProps}>{children}</Link>
        </Button>
    );

    return (
        <footer className="border-t border-border page-footer">
            <div className="content-container-full-width pt-4 md:pt-8">
                {/* Mobile layout (stacked) */}d
                <div className="flex flex-col items-center gap-4 md:gap-0 md:hidden">
                    <div className="gap-4 flex flex-row mt-4">
                        <Link to={'/'}
                              className="flex items-center justify-center space-x-2 ">
                            <Logo size="md" color="primary"/>
                        </Link>
                        <p className="text-white/50 text-xs text-center">&copy; {currentYear} Kollektiv
                            LLC</p>
                    </div>

                    <div className="flex space-x-4 text-xs">
                        <LinkButton to={'/legal/privacy'}>Terms</LinkButton>
                        <LinkButton to={'/legal/terms'}>Terms</LinkButton>
                        <LinkButton to={'/legal/refund'}>Terms</LinkButton>
                    </div>
                </div>
                {/* Desktop layout (centered row with divider) */}
                <div className="hidden md:flex justify-center items-center space-x-6">
                    <div className="flex items-center">
                        <Link to={'/'} className="flex items-center space-x-2">
                            <Logo variant="text" color="primary" size="md"/>
                        </Link>
                        <span className="text-white/50 ml-4 text-xs">&copy; {currentYear} Kollektiv LLC</span>
                    </div>

                    <div className="text-white/30 mx-4">|</div>

                    <div className="flex items-center space-x-6 text-xs">
                        <LinkButton to={'/legal/privacy'}>Terms</LinkButton>
                        <LinkButton to={'/legal/terms'}>Terms</LinkButton>
                        <LinkButton to={'/legal/refund'}>Terms</LinkButton>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;