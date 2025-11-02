import { Button } from '../ui/button';
import { FileQuestion, Download } from 'lucide-react';
import { downloadSrcAsFile } from '../common/helpers';

const Unsupported = ({ data = {}, handleDownload }) => {
  return (
    <div className="flex justify-center items-center h-full w-full bg-gray-800">
      <div className="flex flex-col items-center max-w-md px-6">
        <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6">
          <FileQuestion className="h-8 w-8 text-white/90" />
        </div>
        <h2 className="text-white text-xl font-semibold text-center">
          Preview Not Available
        </h2>
        <p className="text-white/60 text-sm text-center mt-3">
          This file type cannot be previewed. Download to view.
        </p>
        <Button
          size="lg"
          className="mt-8 h-11 bg-white text-neutral-900 hover:bg-white/90 transition-all active:scale-[0.97]"
          onClick={() => {
            if (handleDownload) {
              handleDownload(data);
            } else {
              downloadSrcAsFile(data?.name, data?.url);
            }
          }}
        >
          <Download className="h-4 w-4 mr-2" />
          Download File
        </Button>
      </div>
    </div>
  );
};

export default Unsupported;
