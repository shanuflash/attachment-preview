import { Flex } from '@sparrowengg/twigs-react';
import File from './File';

const Others = ({ data = [], setCurrentData, setOpen }) => {
  return (
    <Flex
      className="sparrow-attachments-rest"
      gap="$4"
      wrap="wrap"
      css={{ paddingBlock: '$4' }}
    >
      {data.map((item) => {
        return (
          <File
            attachment={item}
            {...{
              setCurrentData,
              setOpen,
            }}
          />
        );
      })}
    </Flex>
  );
};

export default Others;
