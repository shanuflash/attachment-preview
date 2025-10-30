import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import React, {
  useState, useEffect, useCallback, useRef 
} from 'react';
import { AttachmentIcons } from './Icons';
import ImageLoader from './ImageLoader';
import { downloadSrcAsFile } from './helpers';
import { fileTypes } from './constants';

export const getFileIcon = (attachment, size = 40) => {
  const iconProps = { size, className: "flex-shrink-0" };
  
  switch (attachment?.type) {
    case fileTypes.csv:
      return <AttachmentIcons.CSV {...iconProps} />;
    case fileTypes.xlsx:
    case fileTypes.xls:
      return <AttachmentIcons.XLS {...iconProps} />;
    case fileTypes.docx:
    case fileTypes.doc:
      return <AttachmentIcons.DOC {...iconProps} />;
    case fileTypes.html:
      return <AttachmentIcons.HTML {...iconProps} />;
    case fileTypes.pdf:
      return <AttachmentIcons.PDF {...iconProps} />;
    default:
      if (attachment?.type?.includes(fileTypes.image)) {
        return <ImageLoader src={attachment?.url} className="w-full h-full" />;
      } else if (attachment?.type?.includes(fileTypes.audio)) {
        return <AttachmentIcons.AUDIO {...iconProps} />;
      } else if (attachment?.type?.includes(fileTypes.video)) {
        return <AttachmentIcons.VIDEO {...iconProps} />;
      } else {
        return <AttachmentIcons.FILE {...iconProps} />;
      }
  }
};

const File = ({ attachment, setOpen, handleDownload }) => {
  const formatBytes = useCallback(
    (bytes, decimals = 2) => {
      if (!+bytes) return '0 Bytes';

      const k = 1000;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    },
    [attachment]
  );

  const fileNameRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const text = fileNameRef.current;

    if (text) {
      setIsOverflow(text.scrollWidth > text.clientWidth);
    }
  }, [attachment.id]);

  const fileExtension = attachment.name?.split('.')?.pop().toUpperCase();

  return (
    <div
      className="group flex gap-4 cursor-pointer transition-all h-[58px] w-[320px] border border-border bg-card rounded-xl p-4 overflow-hidden hover:border-primary hover:shadow-md"
      onClick={() => {
        setOpen(attachment?.id);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center">
        {getFileIcon(attachment)}
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <h4
                ref={fileNameRef}
                className="font-bold text-foreground whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {attachment.name}
              </h4>
            </TooltipTrigger>
            {isOverflow && (
              <TooltipContent className="max-w-xs break-all">
                {attachment.name}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        
        <div className="text-xs text-muted-foreground relative">
          <span
            className={`absolute top-0 left-0 transition-opacity duration-200 ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {fileExtension}
          </span>
          <span
            className={`absolute top-0 left-0 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Click to view {fileExtension}
          </span>
        </div>
      </div>
      
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  if (handleDownload) {
                    handleDownload(attachment);
                  } else {
                    downloadSrcAsFile(attachment.name, attachment.url);
                  }
                }}
              >
                <Download className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Download file
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default File;
