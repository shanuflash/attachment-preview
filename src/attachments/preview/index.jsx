import { useEffect, useMemo, useRef, useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from './components/header';

import Image from './image';
import Video from './video';
import Pdf from './pdf';
import Unsupported from './unsupported';
import { getAttachmentType } from '../common/helpers';
import { previewTypes } from '../common/constants';
import { cn } from '../lib/utils';

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

  const { prevFileExists, nextFileExists, prevFileIndex, nextFileIndex } =
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
          'w-[90vw]! h-[90vh]! max-w-[90vw]! p-0 rounded-2xl overflow-hidden border-none outline-none',
          fileType === previewTypes.pdf ? 'bg-gray-800' : 'bg-black'
        )}
        onEscapeKeyDown={onClose}
        onPointerDownOutside={onClose}
        onOpenAutoFocus={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <div
          className="h-full w-full relative flex justify-center items-center overflow-hidden"
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
              <div className="z-10 absolute left-6">
                <Button
                  size="icon"
                  className="h-10 w-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white/90 hover:text-white transition-all active:scale-[0.97]"
                  onClick={() => {
                    setCurrentData(data[prevFileIndex]);
                  }}
                >
                  <ChevronLeft className="h-6 w-6" strokeWidth={2} />
                </Button>
              </div>
            )}
            {nextFileExists && (
              <div className="z-10 absolute right-6">
                <Button
                  size="icon"
                  className="h-10 w-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white/90 hover:text-white transition-all active:scale-[0.97]"
                  onClick={() => {
                    setCurrentData(data[nextFileIndex]);
                  }}
                >
                  <ChevronRight className="h-6 w-6" strokeWidth={2} />
                </Button>
              </div>
            )}
          </>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Preview;
