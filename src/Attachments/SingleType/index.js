import { Flex, Chip } from '@sparrowengg/twigs-react';
import {
  Images, Videos, Audios, Others 
} from './Components';
import { MiniAttachmentIcons } from '../Common/Icons';

const SingleTypeAttachment = ({
  type,
  attachments,
  videos,
  setOpen,
  handleDownload,
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
        {attachments.map((item) => {
          const IconComponent = MiniAttachmentIcons[item?.type];
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
                setOpen(item?.id);
              }}
            >
              {item?.name}
            </Chip>
          );
        })}
      </Flex>
    );
  }

  switch (type) {
    case 'image':
      return <Images data={attachments} setOpen={setOpen} />;

    case 'video':
      return <Videos data={videos} setOpen={setOpen} />;

    case 'audio':
      return <Audios data={attachments} handleDownload={handleDownload} />;

    case 'other':
      return (
        <Others
          data={attachments}
          setOpen={setOpen}
          handleDownload={handleDownload}
        />
      );

    default:
      return null;
  }
};

export default SingleTypeAttachment;
