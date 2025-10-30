import { useCallback } from 'react';
import { format } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const FileTooltip = ({ children, currentData }) => {
  const formatBytes = useCallback(
    (bytes, decimals = 2) => {
      if (!+bytes) return '0 Bytes';

      const k = 1000;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    },
    [currentData]
  );
  
  const getFormattedDate = (date) => {
    return format(new Date(date), "MMMM d, yyyy 'at' h:mm a");
  };

  return (

      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="start"
          sideOffset={4}
          className="dm-sans bg-white shadow-[0px_4px_25px_0px_#00000026] rounded-xl border border-neutral-100 p-4 text-neutral-900 min-w-[264px] max-w-[264px]"
        >
          <div className="flex flex-col gap-2">
            <h4 className="font-medium text-black truncate">
              {currentData?.name}
            </h4>
            <div className="flex gap-2">
              {currentData?.properties?.size && (
                <h4 className="text-xs font-medium text-neutral-700 truncate">
                  {formatBytes(currentData.properties.size)} •
                </h4>
              )}
              {currentData?.created_at && (
                <h4 className="text-xs text-neutral-700 truncate">
                  {getFormattedDate(currentData.created_at)}
                </h4>
              )}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>

  );
};

export default FileTooltip;
