import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Avatar,
  Tooltip,
  Text,
} from '@sparrowengg/twigs-react';

import moment from 'moment';
import ReactTimeAgo from 'react-time-ago';

import Attachment from './Attachment';

const testImages = [
  {
    id: 'image-1',
    name: 'free-photo-of-blue-and-white-lighthouse.jpeg',
    type: 'image/png',
    url: 'https://images.pexels.com/photos/27095526/pexels-photo-27095526/free-photo-of-blue-and-white-lighthouse.jpeg',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 123456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
  {
    id: 'image-2',
    name: 'Screenshot-2024-09-19-at-12-16-02-PM.png',
    type: 'image/png',
    url: 'https://i.ibb.co/W5BFS4h/Screenshot-2024-09-19-at-12-16-02-PM.png',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 123456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
  {
    id: 'image-3',
    name: 'free-photo-of-green-big-leaves-of-plant.jpeg',
    type: 'image/jpg',
    url: 'https://images.pexels.com/photos/27745133/pexels-photo-27745133/free-photo-of-green-big-leaves-of-plant.jpeg',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 123456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
  {
    id: 'image-4',
    name: 'free-photo-of-silhouette-shadow-on-vibrant-green-leaf.jpeg',
    type: 'image/jpg',
    url: 'https://images.pexels.com/photos/28398729/pexels-photo-28398729/free-photo-of-silhouette-shadow-on-vibrant-green-leaf.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 123456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
  {
    id: 'image-5',
    name: 'free-photo-of-green-big-leaves-of-plant.jpeg',
    type: 'image/png',
    url: 'https://images.pexels.com/photos/27745133/pexels-photo-27745133/free-photo-of-green-big-leaves-of-plant.jpeg',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 123456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
];

const testVideos = [
  {
    id: 'video-1',
    name: 'sample-mp4.mp4',
    type: 'video/mp4',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-mp4.mp4',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 12456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
  // {
  //   id: 'video-2',
  //   name: 'sample-mp4-1.mp4',
  //   type: 'video/mp4',
  //   url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-mp4-1.mp4',
  //   created_at: '2024-09-20T06:03:42.986Z',
  //   properties: { size: 12456 },
  //   uploadedBy: { name: 'Michael Clark', image: '' },
  // },
  {
    id: 'video-3',
    name: 'sample-mp4-2.mp4',
    type: 'video/mp4',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-mp4-2.mp4',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 12456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
  {
    id: 'video-4',
    name: 'sample-mov.mov',
    type: 'video/quicktime',
    url: 'https://s3-figma-videos-production-sig.figma.com/video/869838795205329595/TEAM/ebf4/434e/-4380-471f-9798-8bfcfcd5349c?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eHztiQYKxVfCKp1T~~FjaLIyWI8F5N27MXutA7wxnWfxqqAzXQpl2UQAx7R9EGphnxe3euU2AFcyAKvkukkb5bY8B3GqUFK2njdeeNrSYn9tpg32lQxXU7m08JdgMvw3ww6GnRIKmu3x6TuTFVQkdT4Uf8LN5s2HyzlVrYdtQvLN4th9b3DsNX8WbOqYo42fa-KMMXXGdcv56HdN5YXIrrlGXUltDj11bz~xsp3FTgabMhDN~418iX~s5j9KpkyV0moNn7cEVvc7GUJq-nubWItBw~pADrSF50OFm75EQ0DYBnIMNN73SolVKtkHbghk4MNEb0Xtyxez1US43eSaCQ__',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 12456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
];

const testAudios = [
  {
    id: 'audio-1',
    name: 'sample-mp3.mp3',
    type: 'audio/mp3',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-mp3.mp3',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 12456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
  {
    id: 'audio-2',
    name: 'sample-mp3.mp3',
    type: 'audio/mp3',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-mp3.mp3',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 12456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
];

const otherFiles = [
  {
    id: 'other-1',
    name: 'Sample-pdf.pdf',
    type: 'application/pdf',
    url: 'https://ss-staging-public.s3.amazonaws.com/temp-pdfs/ilovepdf_merged.pdf',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 12456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
  {
    id: 'other-2',
    name: 'Sample-pdf+Password.pdf',
    type: 'application/pdf',
    url: 'https://ss-staging-public.s3.amazonaws.com/temp-pdfs/Sample-pdf+Password.pdf',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 12456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
  {
    id: 'other-3',
    name: 'sample-docx.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-docx.docx',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 12456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
  {
    id: 'other-4',
    name: 'sample-json.json',
    type: 'application/json',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-json.json',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 12456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
  {
    id: 'other-5',
    name: 'sample-zip.zip',
    type: 'application/zip',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-zip.zip',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 12456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
  {
    id: 'other-6',
    name: 'sample-doc.doc',
    type: 'application/msword',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-doc.doc',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 12456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
  {
    id: 'other-7',
    name: 'sample-html.html',
    type: 'text/html',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-html.html',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 12456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
  {
    id: 'other-8',
    name: 'sample-csv.csv',
    type: 'text/csv',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-csv.csv',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 12456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
  {
    id: 'other-9',
    name: 'sample-xlsx.xlsx',
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-xlsx.xlsx',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 12456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
  {
    id: 'other-10',
    name: 'sample-xls.xls',
    type: 'application/vnd.ms-excel',
    url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-xls.xls',
    created_at: '2024-09-20T06:03:42.986Z',
    properties: { size: 12456 },
    uploadedBy: { name: 'Michael Clark', image: '' },
  },
];

const testAttachments = [
  // {
  //   id: 'video-1',
  //   name: 'sample-mp4.mp4',
  //   type: 'video/mp4',
  //   url: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/sample-mp4.mp4',
  //   created_at: '2024-09-20T06:03:42.986Z',
  //   properties: { size: 12456 },
  //   uploadedBy: { name: 'Michael Clark', image: '' },
  // },
  ...testImages,
  ...testVideos,
  ...testAudios,
  ...otherFiles,
];

function App() {
  const [attachments, setAttachments] = useState([]);

  return (
    <Flex
      flexDirection="column"
      gap="$10"
      css={{
        padding: '$10',
      }}
    >
      <Flex
        flexDirection="column"
        css={{
          padding: '$10',
          background: '$white900',
        }}
      >
        {/* Reply */}
        <Flex css={{ position: 'relative' }}>
          <Flex
            gap="8px"
            css={{
              position: 'relative',
              zIndex: 2,
              overflow: 'hidden',
              padding: '0 $4 0 $8',
              marginBottom: '$16',
              ...(false && {
                //isInternalNote
                '&:hover .edit-button': {
                  visibility: 'visible',
                },
                padding: '$8 $4 $8 $8',
                backgroundColor: '#F9F8FF',
                border: '1px dashed $accent200',
                borderRadius: '10px',
              }),
            }}
          >
            <Avatar
              src={''}
              name={'John Doe'?.split('')?.[0]}
              size="sm"
              css={{
                '& span': {
                  color: '$white900',
                  backgroundColor: '$secondary500',
                },
              }}
            />

            <Flex
              flexDirection="column"
              css={{
                transition: 'max-width 0.3s',
              }}
            >
              <Flex alignItems="baseline" gap="$2" css={{ height: '$5' }}>
                <Text as="h4" weight="bold" css={{ color: '$neutral900' }}>
                  John Doe
                </Text>
                <Text
                  as="h5"
                  size="xs"
                  css={{
                    color: '$neutral400',
                  }}
                >
                  •
                </Text>
                <Box>
                  <Text
                    as="h5"
                    size="xs"
                    css={{
                      cursor: 'pointer',
                      color: '$neutral400',
                      textTransform: 'lowercase',
                    }}
                  >
                    <ReactTimeAgo
                      date={moment().subtract('day', 1)}
                      locale="en-US"
                    />
                  </Text>
                </Box>
              </Flex>

              <Text
                as="h5"
                dangerouslySetInnerHTML={{
                  __html:
                    "We apologise for any inconvenience you've experienced with our payment system. We understand the importance of a smooth transaction process.",
                }}
                css={{
                  color: '$neutral800',
                  overflow: 'scroll',
                  '&, & *': {
                    wordBreak: 'break-word',
                  },

                  '& > p': {
                    marginBottom: 0,
                  },
                }}
              />
              <Box css={{ marginTop: '$6' }}>
                <Attachment files={testAttachments} collapsible />
              </Box>
            </Flex>
          </Flex>
          <Box
            css={{
              zIndex: 1,
              height: '100%',
              borderRight: '1px solid $neutral200',
              position: 'absolute',
              top: 0,
              left: '$14',
            }}
          />
        </Flex>

        {/* InternalNote */}
        <Flex css={{ position: 'relative' }}>
          <Flex
            gap="8px"
            css={{
              width: '100%',
              position: 'relative',
              zIndex: 2,
              overflow: 'hidden',
              padding: '0 $4 0 $8',
              marginBottom: '$16',
              ...(true && {
                '&:hover .edit-button': {
                  visibility: 'visible',
                },
                padding: '$8 $4 $8 $8',
                backgroundColor: '#F9F8FF',
                border: '1px dashed $accent200',
                borderRadius: '10px',
              }),
            }}
          >
            <Avatar
              src={''}
              name={'John Doe'?.split('')?.[0]}
              size="sm"
              css={{
                '& span': {
                  color: '$white900',
                  backgroundColor: '$secondary500',
                },
              }}
            />

            <Flex
              flexDirection="column"
              css={{
                transition: 'max-width 0.3s',
              }}
            >
              <Flex alignItems="baseline" gap="$2" css={{ height: '$5' }}>
                <Text as="h4" weight="bold" css={{ color: '$neutral900' }}>
                  John Doe
                </Text>
                <Text
                  as="h5"
                  size="xs"
                  css={{
                    color: '$neutral400',
                  }}
                >
                  •
                </Text>
                <Box>
                  <Text
                    as="h5"
                    size="xs"
                    css={{
                      cursor: 'pointer',
                      color: '$neutral400',
                      textTransform: 'lowercase',
                    }}
                  >
                    <ReactTimeAgo
                      date={moment().subtract('day', 1)}
                      locale="en-US"
                    />
                  </Text>
                </Box>
              </Flex>

              <Text
                as="h5"
                dangerouslySetInnerHTML={{
                  __html:
                    "We apologise for any inconvenience you've experienced with our payment system. We understand the importance of a smooth transaction process.",
                }}
                css={{
                  color: '$neutral800',
                  overflow: 'scroll',
                  '&, & *': {
                    wordBreak: 'break-word',
                  },

                  '& > p': {
                    marginBottom: 0,
                  },
                  // p: {
                  //   ...(isRtl && { textAlign: 'end' }),
                  // },
                }}
              />

              {attachments?.length > 0 &&
                attachments.map((attachment) => {
                  return (
                    <div className="fx-row" key={attachment?.id}>
                      <a
                        target="_blank"
                        href={`/api/internal/attachment/${attachment.id}`}
                        download
                        className="attachment-pill mr--sm fx-row ss-color--black"
                      >
                        {attachment.name?.length > 15
                          ? attachment.name.substring(0, 14) + '...'
                          : attachment.name}
                      </a>
                    </div>
                  );
                })}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
