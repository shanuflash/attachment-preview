import React from 'react';
import { Button } from '../../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui/tooltip';
import { X, Download } from 'lucide-react';
import { downloadSrcAsFile } from '../../common/helpers';
import { cn } from '../../lib/utils';

const Header = ({
  currentData = {},
  onClose = () => {},
  showDownload = true,
  handleDownload,
  isPdf = false,
}) => {
  return (
    <div
      className={cn(
        'z-100 px-6 py-4 w-full absolute top-0 flex justify-between items-center',
        isPdf
          ? 'bg-neutral-900/95'
          : 'bg-linear-to-b from-black/70 via-black/40 to-transparent'
      )}
    >
      <div className="flex gap-4 items-center min-w-0">
        <div className="flex flex-col text-white min-w-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h4 className="font-normal text-sm cursor-pointer hover:text-white/70 transition-colors max-w-md truncate">
                  {currentData?.name}
                </h4>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs break-all">
                {currentData?.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p className="text-[11px] text-white/50 mt-0.5">
            {currentData?.name?.split('.')?.pop().toUpperCase()}
          </p>
        </div>
      </div>

      <div className="flex gap-2 shrink-0">
        {showDownload && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="h-9 w-9 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white/90 hover:text-white transition-all active:scale-[0.97]"
                  onClick={() => {
                    if (handleDownload) {
                      handleDownload(currentData);
                    } else {
                      downloadSrcAsFile(currentData?.name, currentData?.url);
                    }
                  }}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="h-9 w-9 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white/90 hover:text-white transition-all active:scale-[0.97]"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Close</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Header;
