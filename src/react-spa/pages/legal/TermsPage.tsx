import { Button } from '@/components/ui/atoms';
import { ROUTES } from '@/routing/config';
import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import termsMarkdown from '@/content/terms.md?raw';
import { AppLayout } from '@/components/layouts/';

const TermsPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="mb-8">
        <Link to={ROUTES.HOME} className={'no-underline'}>
          <Button variant="link" className="flex flex-row gap-2 text-foreground">
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        {/*<TermsContent />*/}
        <div className="prose space-y-6 text-foreground/80">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{termsMarkdown}</ReactMarkdown>
        </div>
      </div>
    </AppLayout>
  );
};

export default TermsPage;