import { Flex } from '@sparrowengg/twigs-react';
import File from '../../Common/File';

const Others = ({ data = [], setCurrentData, setOpen }) => {
  return (
    <Flex className="sparrow-attachments-rest" gap="$4" wrap="wrap">
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
