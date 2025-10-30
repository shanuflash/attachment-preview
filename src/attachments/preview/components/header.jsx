import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { X, Download } from 'lucide-react';
import { downloadSrcAsFile } from '../../common/helpers';
import { cn } from '@/lib/utils';

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
        'z-10 h-18 px-8 py-6 w-full absolute top-0 flex justify-between items-center',
        isPdf
          ? 'bg-neutral-800'
          : 'bg-gradient-to-b from-black/50 to-transparent'
      )}
    >
      <div className="flex gap-4 items-center">
        <div className="flex flex-col text-white">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h4 className="font-bold text-sm cursor-pointer hover:underline max-w-md truncate">
                  {currentData?.name}
                </h4>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs break-all">
                {currentData?.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p className="text-xs text-white/70">
            {currentData?.name?.split('.')?.pop().toUpperCase()}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        {showDownload && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                  onClick={() => {
                    if (handleDownload) {
                      handleDownload(currentData);
                    } else {
                      downloadSrcAsFile(currentData?.name, currentData?.url);
                    }
                  }}
                >
                  <Download className="h-5 w-5" />
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
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
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
