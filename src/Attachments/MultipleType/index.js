import { Flex } from '@sparrowengg/twigs-react';
import { Videos } from '../SingleType/Components';
import File from '../Common/File';
import Audio from '../Preview/Audio';
import { previewTypes } from '../Common/constants';

const MultipleTypeAttachment = ({
  attachments,
  videos,
  setOpen,
  handleDownload,
}) => {
  return (
    <Flex
      className="sparrow-attachments-multiple"
      gap="$4"
      wrap="wrap"
      css={{ overflowX: 'auto' }}
    >
      <Videos data={videos} setOpen={setOpen} />
      <Flex
        className="sparrow-attachments-files"
        gap="$4"
        wrap="wrap"
        css={{ paddingBlock: '$4' }}
      >
        {attachments.map((item) => {
          const type = item?.type.split('/')[0];
          if (type === previewTypes.audio) {
            return (
              <Audio
                key={item.id}
                data={item}
                handleDownload={handleDownload}
                small={true}
              />
            );
          }
          if (type !== previewTypes.video) {
            return (
              <File
                attachment={item}
                setOpen={setOpen}
                handleDownload={handleDownload}
              />
            );
          }
        })}
      </Flex>
    </Flex>
  );
};

export default MultipleTypeAttachment;
