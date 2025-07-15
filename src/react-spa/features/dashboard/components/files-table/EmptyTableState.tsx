import { Button, Card, CardContent } from '@/components';
import { CloudArrowUpIcon } from '@phosphor-icons/react';

interface EmptyFileTableProps {
  /**
   * Fired when the user clicks “select from computer”.
   */
  onSelectClick: () => void;
}

export const EmptyTableState = ({ onSelectClick }: EmptyFileTableProps) => {
  return (
    <div className="shadow-none rounded-none py-10 transition-colors border-0">
      <div className="flex flex-col md:flex-row items-center justify-center text-center gap-4 px-4 sm:px-6">
        {' '}
        <div className="flex items-center justify-center">
          <CloudArrowUpIcon
            size={96}
            weight={'bold'}
            className="text-muted-foreground flex-shrink-0"
          />
        </div>
        <div className="flex flex-col gap-1 text-center md:text-left w-full">
          <h3> Add files to get started</h3>
          <p className="text-sm text-muted-foreground">
            {' '}
            Drag and drop or{' '}
            <Button variant={'link'} size={'sm'} className={'px-0'} onClick={onSelectClick}>
              select from computer
            </Button>
          </p>
          <p className="text-sm text-muted-foreground ">
            10Mb per file. Only text files (docs, pdfs, txt, etc). Scanned files not supported yet.
            Compress larger files if necessary.
          </p>
        </div>
      </div>
    </div>
  );
  //
  // return (
  //   <Card className="shadow-none rounded-none py-10 transition-colors border-0">
  //     <CardContent className="flex flex-col md:flex-row items-center justify-center text-center gap-4 px-4 sm:px-6">
  //       {' '}
  //       <div className="flex items-center justify-center">
  //         <CloudArrowUpIcon
  //           size={96}
  //           weight={'bold'}
  //           className="text-muted-foreground flex-shrink-0"
  //         />
  //       </div>
  //       <div className="flex flex-col gap-1 text-center md:text-left w-full">
  //         <h3> Add files to get started</h3>
  //         <p className="text-sm text-muted-foreground">
  //           {' '}
  //           Drag and drop or{' '}
  //           <Button variant={'link'} size={'sm'} className={'px-0'} onClick={onSelectClick}>
  //             select from computer
  //           </Button>
  //         </p>
  //         <p className="text-sm text-muted-foreground ">
  //           10Mb per file. Only text files (docs, pdfs, txt, etc). Scanned files not supported yet.
  //           Compress larger files if necessary.
  //         </p>
  //       </div>
  //     </CardContent>
  //   </Card>
  // );
};