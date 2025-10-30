import { useState, useEffect, useRef } from 'react';
import { Download } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { AttachmentIcons } from './icons';
import ImageLoader from './imageloader';
import { fileTypes } from './constants';
import { downloadSrcAsFile } from './helpers';

export const getFileIcon = (attachment, size = 40) => {
  const iconProps = { size, className: 'flex-shrink-0' };

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
  const fileNameRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const text = fileNameRef.current;

    if (text) {
      setIsOverflow(text.scrollWidth > text.clientWidth);
    }
  }, [attachment.id]);

  return (
    <div
      className="group flex gap-4 cursor-pointer transition-all h-[58px] w-[320px] border border-border bg-card rounded-xl px-4 overflow-hidden hover:border-primary hover:shadow-md items-center"
      onClick={() => {
        setOpen(attachment?.id);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="shrink-0 h-10 w-10 rounded-lg flex items-center justify-center">
        {getFileIcon(attachment)}
      </div>

      <div className="flex flex-1 items-center min-w-0">
        <Tooltip delayDuration={300}>
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
      </div>

      <div className="flex items-center">
        {isHovered && (
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 shrink-0"
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
            <TooltipContent>Download file</TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default File;
