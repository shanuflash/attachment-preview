import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { downloadSrcAsFile } from '../Common/helpers';

const Unsupported = ({ data = {}, handleDownload }) => {
  return (
    <div
      className="flex justify-center items-center h-full w-full relative bg-cover bg-center"
      style={{
        backgroundImage:
          'url(https://ss-staging-public.s3.us-east-1.amazonaws.com/static/ticket-management/unsupported-file.webp)',
      }}
    >
      <div className="flex flex-col items-center w-1/2">
        <h2 className="text-white text-2xl font-bold text-center leading-tight">
          {data?.name}
        </h2>
        <p className="text-white/80 text-base font-medium text-center mt-4">
          This file type is not supported for preview. Please download to view.
        </p>
        <Button
          size="lg"
          className="mt-12 text-base"
          onClick={() => {
            if (handleDownload) {
              handleDownload(data);
            } else {
              downloadSrcAsFile(data?.name, data?.url);
            }
          }}
        >
          <Download className="h-5 w-5 mr-2" />
          Download File
        </Button>
      </div>
    </div>
  );
};

export default Unsupported;
