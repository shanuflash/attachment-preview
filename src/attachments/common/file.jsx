import { useState, useEffect, useRef } from 'react';
import { Download } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../ui/tooltip';
import { Button } from '../ui/button';
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
      className="group flex gap-3 cursor-pointer transition-all h-12 w-[300px] border border-border bg-card/50 backdrop-blur-sm rounded-xl px-4 overflow-hidden hover:bg-card hover:shadow-lg hover:border-primary/30 items-center active:scale-[0.97]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        setOpen(attachment?.id);
      }}
    >
      <div className="shrink-0 h-7 w-7 rounded-full flex items-center justify-center">
        {getFileIcon(attachment, 28)}
      </div>

      <div className="flex flex-1 min-w-0 items-center gap-2 transition-all duration-200">
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <h4
              ref={fileNameRef}
              className="font-medium text-sm text-foreground whitespace-nowrap overflow-hidden text-ellipsis flex-1 transition-all duration-200"
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

        {isHovered && (
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0 active:scale-[0.97] rounded-full opacity-60 hover:opacity-100 transition-opacity duration-150 animate-in fade-in"
                onClick={(e) => {
                  e.stopPropagation();
                  if (handleDownload) {
                    handleDownload(attachment);
                  } else {
                    downloadSrcAsFile(attachment.name, attachment.url);
                  }
                }}
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download</TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default File;
