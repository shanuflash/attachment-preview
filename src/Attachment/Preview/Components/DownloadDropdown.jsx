import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Text,
} from '@sparrowengg/twigs-react';
import { ChevronDownIcon } from '@sparrowengg/twigs-react-icons';
import React from 'react';

const DownloadDropdown = ({ options = [] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          color="secondary"
          variant="ghost"
          rightIcon={<ChevronDownIcon />}
          css={{
            '& > span:not(.twigs-button__content)': {
              margin: '0',
              marginInlineStart: '$2 !important',
            },
            '&[data-state="open"]': {
              color: '$secondary600',
              backgroundColorOpacity: ['$secondary500', 0.2],
            },
          }}
        >
          Download
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        size="sm"
        onCloseAutoFocus={(e) => e.preventDefault()}
        align="end"
        sideOffset={5}
        css={{
          minWidth: '160px',
          maxWidth: '160px',
          paddingBlock: '$4',
        }}
      >
        {options.map((option) => (
          <DropdownMenuItem key={option.value} css={{ cursor: 'pointer' }}>
            <Text as="h4">{option.label}</Text>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem css={{ cursor: 'pointer' }}>
          <Text as="h4">Download Both</Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DownloadDropdown;
