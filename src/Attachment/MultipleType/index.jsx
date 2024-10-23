import { Flex } from '@sparrowengg/twigs-react';
import { File, Videos } from '../SingleType/Components';

const MultipleTypeAttachment = ({
  attachments,
  videoThumbnails,
  setCurrentData,
  setOpen,
}) => {
  return (
    <Flex className="sparrow-attachments-multiple" gap="$4" wrap="wrap">
      <Videos
        data={attachments?.videos}
        thumbnails={videoThumbnails}
        {...{ setCurrentData, setOpen }}
      />

      <Flex
        className="sparrow-attachments-rest"
        gap="$4"
        wrap="wrap"
        css={{ paddingBlock: '$4' }}
      >
        {Object.keys(attachments).map((key) => {
          if (key !== 'videos') {
            return attachments[key].map((item) => {
              return (
                <File
                  attachment={item}
                  {...{
                    setCurrentData,
                    setOpen,
                  }}
                />
              );
            });
          }
          return null;
        })}
      </Flex>
    </Flex>
  );
};

export default MultipleTypeAttachment;
