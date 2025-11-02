import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from './lib/utils';
import File from './common/file';
import Preview from './preview';

/**
 * Attachments component for displaying file attachments
 *
 * @param {Object[]} files - [REQUIRED] Array of attachment objects
 * @param {string} files[].id - Unique identifier for the attachment
 * @param {string} files[].name - Name of the file
 * @param {string} files[].type - MIME type of the file (e.g. 'video/mp4', 'image/jpeg')
 * @param {string} files[].url - URL to access the file
 * @param {boolean} [collapsible=false] - [OPTIONAL] Whether attachments section can be collapsed, defaults to false
 * @param {Function} handleDownload - [OPTIONAL] download handler, defaults to downloading from url
 * @returns {React.ReactElement} - React component
 */

const Attachments = ({
  files = [],
  collapsible = false,
  handleDownload = null,
}) => {
  const [activeId, setActiveId] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  if (!files.length) return null;

  return (
    <div className="attachment-preview">
      {collapsible && (
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="flex items-center gap-2 mb-2 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <span>
            {files.length === 1
              ? isCollapsed
                ? files[0]?.name
                : files[0]?.name?.split('.')?.pop()?.toUpperCase()
              : `${files?.length} files`}
          </span>
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              !isCollapsed ? 'rotate-0' : '-rotate-90'
            )}
          />
        </button>
      )}

      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[3300px] opacity-100'
        )}
      >
        {!isCollapsed && (
          <div className="flex gap-2 flex-wrap">
            {files.map((item) => (
              <File
                key={item.id}
                attachment={item}
                setOpen={(id) => {
                  setActiveId(id);
                  setOpen(true);
                }}
                handleDownload={handleDownload}
              />
            ))}
          </div>
        )}
      </div>

      {open && (
        <Preview
          data={files}
          activeId={activeId}
          onClose={() => {
            setOpen(false);
            setActiveId(0);
          }}
          handleDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default Attachments;
