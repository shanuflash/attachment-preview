import React from 'react';
import {
  Flex,
  Dialog,
  DialogContent,
  Box,
  IconButton,
  Button,
  CircleLoader,
  Tooltip,
  Text,
  Input,
  Slider,
} from '@sparrowengg/twigs-react';

const ProgressBar = ({
  value = 0,
  onMouseDown = () => {},
  onChange = () => {},
  onMouseUp = () => {},
}) => {
  return (
    <Flex
      css={{
        width: '100%',
        height: '6px',
        background: '$white500',
        borderRadius: '30px',
      }}
    ></Flex>
  );
};

export default ProgressBar;
