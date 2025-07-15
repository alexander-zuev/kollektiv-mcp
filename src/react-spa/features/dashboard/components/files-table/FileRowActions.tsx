import { UserFile } from '@/api-client/types/documents.ts';
import { Button } from '@/components/ui/atoms/buttons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/overlays';
import { useAuthStore } from '@/features/auth';
import { useFileDelete } from '@/features/documents';
import { toast } from 'sonner';
import { MoreHorizontal } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/overlays';
import { useState } from 'react';

export interface FileRowActionsProps {
  documentId: string;
  status: UserFile['status'];
}

export const FileRowActions = ({ documentId, status }: FileRowActionsProps) => {
  const userId = useAuthStore(useShallow(state => state.user?.id));
  const { mutate, isPending } = useFileDelete({ userId, documentId });
  const isDisabled = isPending || status === 'processing';
  const [open, setOpen] = useState(false);

  /* ❷ optional confirm helper */
  const handleDelete = async () => {
    if (isDisabled) return;
    setOpen(false);

    mutate(undefined, {
      onSuccess: () => {
        toast.success('File deleted successfully');
      },
      onError: () => {
        toast.error('File deletion failed');
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} size={'icon'}>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={'end'}>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem variant={'destructive'} disabled={isDisabled}>
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm you want to delete the file?</AlertDialogTitle>
          <AlertDialogDescription>
            This will delete the file from the server and make it unavailable for querying.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};