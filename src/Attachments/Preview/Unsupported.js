import { Button, Flex, Text } from '@sparrowengg/twigs-react';
import { DownloadIcon } from '@sparrowengg/twigs-react-icons';
import { I18n } from 'react-redux-i18n';
import { downloadSrcAsFile } from '../Common/helpers';

const Unsupported = ({ data = {}, handleDownload }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      css={{
        height: '100%',
        width: '100%',
        position: 'relative',
        backgroundImage:
          'url(https://ss-staging-public.s3.us-east-1.amazonaws.com/static/ticket-management/unsupported-file.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
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
            textAlign: 'center',
            fontSize: '$2xl',
            lineHeight: '$2xl',
          }}
        >
          {data?.name}
        </Text>
        <Text
          as="h2"
          size="md"
          weight="medium"
          css={{
            color: '$white800',
            textAlign: 'center',
            marginTop: '$4',
          }}
          dangerouslySetInnerHTML={{
            __html: I18n.t('attachments.unsupported.description'),
          }}
        />
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
          onClick={() => {
            if (handleDownload) {
              handleDownload(data);
            } else {
              downloadSrcAsFile(data?.name, data?.url);
            }
          }}
        >
          {I18n.t('attachments.downloadFile')}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Unsupported;
