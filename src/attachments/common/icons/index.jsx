import { 
  FileText, 
  FileSpreadsheet, 
  File as FileIcon,
  FileCode,
  Music,
  Video,
  Image,
  FileType
} from 'lucide-react';

const IconWrapper = ({ children, color = "#6366f1", size = 40 }) => (
  <div 
    className="flex items-center justify-center rounded-lg"
    style={{ 
      width: size, 
      height: size,
      backgroundColor: `${color}15`
    }}
  >
    {children}
  </div>
);

const AttachmentIcons = {
  CSV: ({ size = 40, ...props }) => (
    <IconWrapper color="#10b981" size={size}>
      <FileSpreadsheet className="text-emerald-600" size={size * 0.5} {...props} />
    </IconWrapper>
  ),
  XLS: ({ size = 40, ...props }) => (
    <IconWrapper color="#10b981" size={size}>
      <FileSpreadsheet className="text-emerald-600" size={size * 0.5} {...props} />
    </IconWrapper>
  ),
  DOC: ({ size = 40, ...props }) => (
    <IconWrapper color="#3b82f6" size={size}>
      <FileText className="text-blue-600" size={size * 0.5} {...props} />
    </IconWrapper>
  ),
  PDF: ({ size = 40, ...props }) => (
    <IconWrapper color="#ef4444" size={size}>
      <FileType className="text-red-600" size={size * 0.5} {...props} />
    </IconWrapper>
  ),
  HTML: ({ size = 40, ...props }) => (
    <IconWrapper color="#f97316" size={size}>
      <FileCode className="text-orange-600" size={size * 0.5} {...props} />
    </IconWrapper>
  ),
  AUDIO: ({ size = 40, ...props }) => (
    <IconWrapper color="#8b5cf6" size={size}>
      <Music className="text-violet-600" size={size * 0.5} {...props} />
    </IconWrapper>
  ),
  VIDEO: ({ size = 40, ...props }) => (
    <IconWrapper color="#ec4899" size={size}>
      <Video className="text-pink-600" size={size * 0.5} {...props} />
    </IconWrapper>
  ),
  FILE: ({ size = 40, ...props }) => (
    <IconWrapper color="#64748b" size={size}>
      <FileIcon className="text-slate-600" size={size * 0.5} {...props} />
    </IconWrapper>
  ),
};

const MiniAttachmentIcons = {
  audios: ({ className }) => <Music className={className || "h-4 w-4"} />,
  videos: ({ className }) => <Video className={className || "h-4 w-4"} />,
  others: ({ className }) => <FileIcon className={className || "h-4 w-4"} />,
  images: ({ className }) => <Image className={className || "h-4 w-4"} />,
};

export { AttachmentIcons, MiniAttachmentIcons };
