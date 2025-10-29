import { Flex } from '@sparrowengg/twigs-react';
import File from '../../Common/File';

const Others = ({ data = [], setOpen, handleDownload }) => {
  return (
    <Flex
      className="sparrow-attachments-rest"
      gap="$4"
      wrap="wrap"
      css={{ paddingBottom: '$4' }}
    >
      {data.map((item) => {
        return (
          <File
            key={item?.name}
            attachment={item}
            {...{
              setOpen,
              handleDownload,
            }}
          />
        );
      })}
    </Flex>
  );
};

export default Others;
