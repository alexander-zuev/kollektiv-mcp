import {ChevronLeft} from 'lucide-react';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import {Link} from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import {AppLayout} from '@/components/layouts/AppLayout.tsx';
import {Button} from '@/components/ui/atoms';
import termsPriacy from '@/content/privacy.md?raw';
import {ROUTES} from '@/routing/config';

const TermsPage: React.FC = () => {
    return (
        <AppLayout>
            <div className="mb-8">
                <Link to={ROUTES.HOME} className={'no-underline'}>
                    <Button variant="link" className="flex flex-row gap-2 text-foreground">
                        <ChevronLeft className="h-4 w-4"/>
                        Back to Home
                    </Button>
                </Link>
                {/*<TermsContent />*/}
                <div className="prose space-y-6 text-foreground/80">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{termsPriacy}</ReactMarkdown>
                </div>
            </div>
        </AppLayout>
    );
};

export default TermsPage;