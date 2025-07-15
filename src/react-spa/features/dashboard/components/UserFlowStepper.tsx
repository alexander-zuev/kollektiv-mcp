import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/overlays';
import { useUserStats } from '@/features/dashboard/hooks/useUserStats.ts';
import React from 'react';
import { CheckIcon } from '@phosphor-icons/react';
import { cn } from '@/shared/utils/utils.ts';

interface MiniStepProps {
  label: string;
  status: 'completed' | 'current' | 'pending';
}

const UploadTip = () => {
  return (
    <small>
      Each file can be up to 10 MB. Compress large files before upload if necessary. Only text
      formats are supported at the moment (docx, pdf, txt).{' '}
    </small>
  );
};

const ConnectTip = ({ onViewInstructions }: { onViewInstructions: () => {} }) => {
  return (
    <div className={'gap-1'}>
      <small>Connect to the MCP server from your editor / client. </small>
      <a
        href="https://github.com/alexander-zuev/kollektiv-mcp?tab=readme-ov-file#-connection"
        target="_blank"
        rel="noreferrer"
        onClick={() => {
          localStorage.setItem('mcp-instructions-viewed', 'true');
          onViewInstructions;
        }}
        className="inline-block mt-3 text-xs text-primary hover:underline"
      >
        View instructions
      </a>
    </div>
  );
};

const ChatTip = () => {
  return (
    <div>
      <small>
        Chat with your files by asking <code>use Kollektiv MCP</code> in your editor
      </small>
    </div>
  );
};

const MiniStep = ({ label, status }: MiniStepProps) => {
  const dotClass = {
    completed: 'bg-primary border border-primary-border',
    current: 'border-1 border-primary',
    pending: 'border border-border',
  }[status];

  const labelClass =
    status === 'pending'
      ? 'text-muted-foreground'
      : status === 'current'
        ? 'text-foreground'
        : 'text-accent-foreground';

  return (
    <div className="flex items-center gap-2 transition-all duration-300 ease-in-out">
      <div className={`w-2.5 h-2.5 rounded-full ${dotClass} items-center justify-center`}></div>
      <span className={`text-sm ${labelClass} underline-offset-4 hover:underline cursor-pointer`}>
        {label}
      </span>
    </div>
  );
};

function getActiveStep(documentsUploaded: boolean, queries: number, linkClicked: boolean): number {
  if (queries > 0) {
    return 3;
  }
  if (!documentsUploaded) {
    return 0;
  }
  if (!linkClicked) {
    return 1;
  }
  return 2;
}

interface UserFlowStepperProps {
  userId?: string;
  documentsUploaded: boolean;
}

export const UserFlowStepper = ({ documentsUploaded, userId }: UserFlowStepperProps) => {
  const steps = ['Upload', 'Connect', 'Chat'] as const;
  type StepLabel = (typeof steps)[number];
  const { data } = useUserStats({ userId, documentsUploaded });
  const queries = data?.queries || 0;
  const [instructionsViewed, setInstructionsViewed] = React.useState(
    () => localStorage.getItem('mcp-instructions-viewed') === 'true'
  );
  const tips = [
    UploadTip,
    () => <ConnectTip onViewInstructions={() => setInstructionsViewed(true)} />,
    ChatTip,
  ] as const;

  const activeIndex = getActiveStep(documentsUploaded, queries, instructionsViewed);

  return (
    <div className="flex items-center justify-center gap-2 text-sm">
      {steps.map((label: StepLabel, idx) => {
        let status: MiniStepProps['status'];
        if (idx < activeIndex) status = 'completed';
        else if (idx === activeIndex) status = 'current';
        else status = 'pending';
        const chevronColor = status === 'completed' ? 'text-primary' : 'text-muted-foreground';

        return (
          <div key={label}>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger>
                  <MiniStep label={label} status={status} />
                </PopoverTrigger>
                <PopoverContent>{React.createElement(tips[idx])}</PopoverContent>
              </Popover>
              {idx < steps.length - 1 && (
                <span
                  className={`text-xs transition-colors duration-300 ease-in-out ${chevronColor}`}
                >
                  {'>'}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};