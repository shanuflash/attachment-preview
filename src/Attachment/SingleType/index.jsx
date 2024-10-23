import {
  Box,
  Flex,
  Text,
  IconButton,
  Tooltip,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@sparrowengg/twigs-react';
import {
  PlayFillIcon,
  EllipsisVerticalIcon,
} from '@sparrowengg/twigs-react-icons';
import React, { useState, useEffect, useMemo } from 'react';

import { Images, Videos, Audios, Others, File, Skeleton } from './Components';

const SingleTypeAttachment = ({
  type,
  attachments,
  videoThumbnails,
  currentData,
  setCurrentData,
  setOpen,
}) => {
  switch (type) {
    case 'images':
      return (
        <Images data={attachments?.images} {...{ setCurrentData, setOpen }} />
      );

    case 'videos':
      return (
        <Videos
          data={attachments?.videos}
          thumbnails={videoThumbnails}
          {...{
            setCurrentData,
            setOpen,
          }}
        />
      );

    case 'audios':
      return (
        <Audios
          data={attachments?.audios}
          {...{
            setCurrentData,
            setOpen,
          }}
        />
      );

    case 'others':
      return (
        <Others
          data={attachments?.others}
          {...{
            setCurrentData,
            setOpen,
          }}
        />
      );

    default:
      return null;
  }
};

export default SingleTypeAttachment;
