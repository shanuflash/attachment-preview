import React from 'react';
import { Button, Flex } from '@sparrowengg/twigs-react';
import Image from './Image';
import PDF from './Pdf';
import Video from './Video';

function App() {
  const [open, setOpen] = React.useState({
    image: false,
    pdf: false,
    video: false,
  });
  return (
    <>
      <Flex gap="$10" css={{ padding: '$10' }}>
        <Button onClick={() => setOpen((prev) => ({ ...prev, image: true }))}>
          Open image
        </Button>
        <Button onClick={() => setOpen((prev) => ({ ...prev, pdf: true }))}>
          Open PDF
        </Button>
        <Button onClick={() => setOpen((prev) => ({ ...prev, video: true }))}>
          Open Video
        </Button>
      </Flex>
      <Image
        data={[
          {
            uploadedBy: { name: 'Michael Clark', image: '' },
            uploadedAt: '2024-09-20T06:03:42.986Z',
            name: 'free-photo-of-blue-and-white-lighthouse.jpeg',
            src: 'https://images.pexels.com/photos/27095526/pexels-photo-27095526/free-photo-of-blue-and-white-lighthouse.jpeg',
            // src: 'https://s3.amazonaws.com/attachment.surveysparrow.com/development/mailer/application/caseManagement/development/100000007/61c40f02b2551a7af9010454610f7bb501fe32e6fd925b941ad55f3c40f3.jpeg',
            size: 123456,
          },
          {
            uploadedBy: { name: 'Michael Clark', image: '' },
            uploadedAt: '2024-09-20T06:03:42.986Z',
            name: 'Screenshot-2024-09-19-at-12-16-02-PM.png',
            src: 'https://i.ibb.co/W5BFS4h/Screenshot-2024-09-19-at-12-16-02-PM.png',
            size: 123456,
          },
          {
            uploadedBy: { name: 'Michael Clark', image: '' },
            uploadedAt: '2024-09-20T06:03:42.986Z',
            name: 'free-photo-of-green-big-leaves-of-plant.jpeg',
            src: 'https://images.pexels.com/photos/27745133/pexels-photo-27745133/free-photo-of-green-big-leaves-of-plant.jpeg',
            size: 123456,
          },
          {
            uploadedBy: { name: 'Michael Clark', image: '' },
            uploadedAt: '2024-09-20T06:03:42.986Z',
            name: 'free-photo-of-silhouette-shadow-on-vibrant-green-leaf.jpeg',
            src: 'https://images.pexels.com/photos/28398729/pexels-photo-28398729/free-photo-of-silhouette-shadow-on-vibrant-green-leaf.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            size: 123456,
          },
          {
            uploadedBy: { name: 'Michael Clark', image: '' },
            uploadedAt: '2024-09-20T06:03:42.986Z',
            name: 'free-photo-of-zona-sul-sao-paulo-brasil.jpeg',
            src: 'https://images.pexels.com/photos/28105278/pexels-photo-28105278/free-photo-of-zona-sul-sao-paulo-brasil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            size: 123456,
          },
        ]}
        open={open.image}
        onClose={() => setOpen((prev) => ({ ...prev, image: false }))}
      />
      <PDF
        data={{
          uploadedBy: { name: 'Michael Clark', image: '' },
          uploadedAt: '2024-09-20T06:03:42.986Z',
          name: 'Sample-pdf.pdf',
          // src: 'https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf',
          // src: 'https://ss-staging-public.s3.amazonaws.com/temp-pdfs/Sample-pdf+Password.pdf',
          src: 'https://ss-staging-public.s3.amazonaws.com/temp-pdfs/ilovepdf_merged.pdf',
          size: 12456,
        }}
        open={open.pdf}
        onClose={() => setOpen((prev) => ({ ...prev, pdf: false }))}
      />
      <Video
        data={{
          uploadedBy: { name: 'Michael Clark', image: '' },
          uploadedAt: '2024-09-20T06:03:42.986Z',
          name: 'sample video.mp4',
          // src: 'https://vaibhav1663.github.io/Youtube-Ambient-Mode/demo-video.mp4',
          src: 'https://s3-figma-videos-production-sig.figma.com/video/869838795205329595/TEAM/ebf4/434e/-4380-471f-9798-8bfcfcd5349c?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MMeaWZQiwkQ-c-qPRlwNZKHqZ35wNYh1sR8ymFK6uJK7f8~RwL1-U-nQAAsRVWJdTNkrve4mkvFTRG-qO8udozZgEWGZOL4MqvlftRMgRuh-hGO2NaZvezKC8Q9wRiaKC9PMuM6L3QQHUUE5~YvJxxlU1pGZWnEvoUgc98ecmzV7kwTFamO6AMt-vGBBMwDhHttbQ4RcszoSYGWVd5~d8bDID7~WNu6y2D4oXBJy256qntsSKAoFcYDO7ShTZSURvAZNNtV00bc~WXiGVn6Dsg2IZkl3rKhbndarncbKgIZ2P57RpkdG912oPt-qQtHDGJTSCFPwYeE29NmHxQjNMw__',
          // src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
          // src: 'https://www.youtube.com/watch?v=wDchsz8nmbo',
          // src: 'https://ss-staging-public.s3.amazonaws.com/ss-attachment-test/4678261-hd_1080_1920_25fps.mp4',
          size: 12456,
        }}
        open={open.video}
        onClose={() => setOpen((prev) => ({ ...prev, video: false }))}
      />
    </>
  );
}

export default App;
