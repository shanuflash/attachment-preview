import React, {
  useEffect, useMemo, useRef, useState 
} from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Header from './Components/Header';

import Image from './Image';
import Video from './Video';
import Pdf from './Pdf';
import Unsupported from './Unsupported';
import { getAttachmentType } from '../Common/helpers';
import { previewTypes } from '../Common/constants';
import { cn } from '@/lib/utils';

const Preview = ({
  data = [],
  activeId = 0,
  onClose = () => {},
  handleDownload,
}) => {
  const containerRef = useRef(null);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    setCurrentData(data.find((data) => data.id === activeId));
  }, [activeId, data]);

  const {
    prevFileExists, nextFileExists, prevFileIndex, nextFileIndex 
  } =
    useMemo(() => {
      const currentIndex = data.findIndex(
        (data) => data?.id === currentData?.id
      );
      const prevIndex = currentIndex - 1;
      const nextIndex = currentIndex + 1;
      return {
        prevFileExists: prevIndex >= 0,
        nextFileExists: nextIndex < data.length,
        prevFileIndex: prevIndex,
        nextFileIndex: nextIndex,
      };
    }, [currentData?.id, data]);

  const fileType = useMemo(() => {
    if (currentData?.type) {
      return getAttachmentType(currentData?.type);
    }
    return null;
  }, [currentData?.type]);

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={cn(
          "max-w-[90vw] min-h-[90vh] h-[90vh] p-0 rounded-2xl overflow-hidden border-none",
          fileType === previewTypes.pdf ? "bg-gray-500" : "bg-black"
        )}
        onEscapeKeyDown={onClose}
        onPointerDownOutside={onClose}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div
          className="h-full w-full relative flex justify-center items-center"
          ref={containerRef}
        >
          <Header
            {...{
              currentData,
              onClose,
              handleDownload,
              isPdf: fileType === previewTypes.pdf,
              showDownload: fileType !== previewTypes.unsupported,
            }}
          />
          <>
            {fileType === previewTypes.image && <Image data={currentData} />}
            {fileType === previewTypes.video && <Video data={currentData} />}
            {fileType === previewTypes.pdf && <Pdf data={currentData} />}
            {fileType === previewTypes.unsupported && (
              <Unsupported data={currentData} handleDownload={handleDownload} />
            )}
          </>
          <>
            {prevFileExists && (
              <div className="z-10 absolute left-12">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        className="h-12 w-12 rounded-full bg-white hover:bg-white/90 text-foreground shadow-lg"
                        onClick={() => {
                          setCurrentData(data[prevFileIndex]);
                        }}
                      >
                        <ChevronLeft className="h-8 w-8" strokeWidth={1.8} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Previous
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
            {nextFileExists && (
              <div className="z-10 absolute right-12">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        className="h-12 w-12 rounded-full bg-white hover:bg-white/90 text-foreground shadow-lg"
                        onClick={() => {
                          setCurrentData(data[nextFileIndex]);
                        }}
                      >
                        <ChevronRight className="h-8 w-8" strokeWidth={1.8} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Next
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Preview;
