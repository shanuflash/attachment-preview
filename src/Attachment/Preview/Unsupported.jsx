import {
  Button,
  Dialog,
  DialogContent,
  Flex,
  Text,
} from '@sparrowengg/twigs-react';
import Header from './Components/Header';
import { DownloadIcon } from '@sparrowengg/twigs-react-icons';

const Unsupported = ({ data = {}, open = false, onClose = () => {} }) => {
  return (
    <Dialog open={open}>
      <DialogContent
        onEscapeKeyDown={onClose}
        onOpenAutoFocus={(e) => e.preventDefault()}
        css={{
          backgroundColor: '$black900',
          padding: 0,
          width: '100%',
          height: '100%',
          borderRadius: '$2xl',
          overflow: 'hidden',
        }}
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          css={{
            height: '100%',
            width: '100%',
            position: 'relative',
            backgroundImage: `url(https://ss-staging-public.s3.us-east-1.amazonaws.com/static/ticket-management/unsupported-file.webp)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Header {...{ currentData: data, onClose }} />
          <Flex
            flexDirection="column"
            alignItems="center"
            css={{
              width: '50%',
            }}
          >
            <Text
              as="h2"
              weight="bold"
              css={{
                color: '$white900',
                fontSize: '$2xl',
                lineHeight: '$2xl',
              }}
            >
              {data?.name}
            </Text>
            <Text
              as="h2"
              size="md"
              weight="bold"
              css={{
                color: '$white800',
                textAlign: 'center',
                marginTop: '$4',
              }}
            >
              Unfortunately, this file format is not supported for direct
              preview. Please download and use a compatible application to view
              its content.
            </Text>
            <Button
              size="xl"
              leftIcon={<DownloadIcon size={20} strokeWidth={2.5} />}
              css={{
                marginTop: '$12',
                fontSize: '$md',
                '& .twigs-button__icon-container > *': {
                  height: '20px',
                  width: '20px',
                },
              }}
            >
              Download File
            </Button>
          </Flex>
        </Flex>
      </DialogContent>
    </Dialog>
  );
};

export default Unsupported;
