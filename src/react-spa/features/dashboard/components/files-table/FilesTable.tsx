import {
    ArrowDownIcon,
    CheckCircleIcon,
    CircleNotchIcon,
    WarningCircleIcon,
    XCircleIcon,
} from '@phosphor-icons/react';
import {UserFile} from '@/api-client/types/documents.ts';
import {Button} from '@/components/ui/atoms/buttons';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/data/tables';
import {Skeleton} from '@/components/ui/feedback/progress';
import {FileRowActions} from '@/features/dashboard/components/files-table/FileRowActions';
import {formatFileSize, formatLongDate} from '@/shared/utils';
import {cn} from '@/shared/utils/utils.ts';
import {EmptyTableState} from './EmptyTableState';

interface UserFilesTableProps {
    documents: UserFile[];
    isLoading: boolean;
    isError: boolean;
    onRefreshRequest: () => void;
    onUploadAttempt: () => void;
    isDragging: boolean;
}

export const UserFilesTable = ({
                                   documents,
                                   isLoading,
                                   isError,
                                   onRefreshRequest,
                                   onUploadAttempt,
                                   isDragging,
                               }: UserFilesTableProps) => {
    const StatusIcon = ({status}: { status: UserFile['status'] }) => {
        switch (status) {
            case 'processing':
                return <CircleNotchIcon size={18} className="animate-spin text-muted-foreground"/>;
            case 'available':
                return <CheckCircleIcon size={18} className="text-emerald-500"/>;
            case 'failed':
                return <XCircleIcon size={18} className="text-destructive"/>;
            default:
                return null;
        }
    };
    /* --------------------------- table render helpers --------------------- */
    const renderTableContent = () => {
        // Check if it's loading
        if (isLoading) {
            // render skeleton rows
            return Array.from({length: 4}).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                    <TableCell colSpan={5}>
                        <Skeleton className="h-4 w-full"/>
                    </TableCell>
                </TableRow>
            ));
        }

        // Check for error
        if (isError) {
            return (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        <div className="flex flex-col items-center gap-2 text-destructive">
                            <div className={'flex flex-row gap-2 items-center'}>
                                <WarningCircleIcon size={20}/>
                                <span>Couldn't load files</span>
                            </div>
                            <Button variant="outline" size="sm" onClick={onRefreshRequest}>
                                Retry
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            );
        }
        // Render empty state if no documents
        if (documents.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={5} className="p-0 whitespace-normal">
                        <EmptyTableState onSelectClick={onUploadAttempt}/>
                    </TableCell>
                </TableRow>
            );
        }

        // 2. Data rows
        return documents.map(doc => (
            <TableRow key={doc.id}>
                <TableCell className="truncate">
                    <code className="font-mono">{doc.filename}</code>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-1">
                        <StatusIcon status={doc.status}/>
                        <span className="capitalize">{doc.status}</span>
                    </div>
                </TableCell>
                <TableCell>{formatFileSize(doc.filesize)}</TableCell>
                <TableCell className="text-right">{formatLongDate(doc.uploadedAt)}</TableCell>

                <TableCell className="text-right">
                    <FileRowActions documentId={doc.id} status={doc.status}/>
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <>
            <div
                className={cn(
                    'flex-center bg-card w-full rounded-sm border-dashed border transition-all duration-300 origin-top',
                    isDragging
                        ? 'opacity-100 p-2 mb-4 gap-2'
                        : 'h-0 opacity-0 pointer-events-none overflow-hidden'
                )}
            >
                <p>Drop files to upload them</p>
                <ArrowDownIcon size={18}/>
            </div>
            <Table
                className={cn(
                    'table-fixed w-full transition-colors',
                    isDragging ? 'border-dashed border-primary border-1' : ''
                )}
            >
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[40%]">Name</TableHead>
                        <TableHead className="w-[15%]">Status</TableHead>
                        <TableHead className="w-[15%]">Size</TableHead>
                        <TableHead className="w-[15%] text-right">Uploaded</TableHead>
                        <TableHead className="w-[15%] text-right"></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>{renderTableContent()}</TableBody>

                {!isLoading && !isError && documents.length === 0 && <TableFooter/>}
            </Table>
        </>
    );
};