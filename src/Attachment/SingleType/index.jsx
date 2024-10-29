import { Flex, Chip } from '@sparrowengg/twigs-react';
import {
  Images, Videos, Audios, Others 
} from './Components';
import { MiniAttachmentIcons } from '../Common/Icons';

const SingleTypeAttachment = ({
  type,
  attachments,
  videoThumbnails,
  setCurrentData,
  setOpen,
  mini,
}) => {
  if (mini) {
    return (
      <Flex
        gap="$1"
        className="ss-scrollbar--hide"
        css={{
          overflow: 'scroll',
        }}
      >
        {Object.keys(attachments).map((key) => {
          const IconComponent = MiniAttachmentIcons[key];
          return attachments[key].map((item) => {
            return (
              <Chip
                rounded="full"
                leftElement={<IconComponent />}
                color="primary"
                css={{
                  cursor: 'pointer',
                  backgroundColorOpacity: ['$primary500', 0.1],
                  color: '$secondary800',
                }}
                onMouseDown={() => {
                  setCurrentData(item);
                  let itemType = 'unsupported';
                  if (item.type.includes('image')) {
                    itemType = 'image';
                  } else if (item.type.includes('video')) {
                    itemType = 'video';
                  } else if (item.type.includes('audio')) {
                    itemType = 'audio';
                  } else if (item.type === 'application/pdf') {
                    itemType = 'pdf';
                  }
                  setOpen((prev) => ({ ...prev, [itemType]: true }));
                }}
              >
                {item?.name}
              </Chip>
            );
          });
        })}
      </Flex>
    );
  }

  switch (type) {
    case 'images':
      return (
        <Images data={attachments?.images} {...{ setCurrentData, setOpen }} />
      );

    case 'videos':
      return (
        <Videos
          data={attachments?.videos}
          thumbnails={videoThumbnails}
          {...{
            setCurrentData,
            setOpen,
          }}
        />
      );

    case 'audios':
      return (
        <Audios
          data={attachments?.audios}
          {...{
            setCurrentData,
            setOpen,
          }}
        />
      );

    case 'others':
      return (
        <Others
          data={attachments?.others}
          {...{
            setCurrentData,
            setOpen,
          }}
        />
      );

    default:
      return null;
  }
};

export default SingleTypeAttachment;
