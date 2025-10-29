import { Flex } from '@sparrowengg/twigs-react';
import Audio from '../../Preview/Audio';

const Audios = ({ data = [], handleDownload }) => {
  return (
    <Flex
      css={{ position: 'relative', overflowX: 'auto', paddingBottom: '$4' }}
      gap="$4"
      wrap="wrap"
    >
      {data.map((audio) => {
        return (
          <Audio key={audio.id} data={audio} handleDownload={handleDownload} />
        );
      })}
    </Flex>
  );
};

export default Audios;
