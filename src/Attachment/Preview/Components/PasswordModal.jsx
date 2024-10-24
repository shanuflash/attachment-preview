import {
  Dialog,
  DialogContent,
  Button,
  Box,
  Input,
  Text,
  Flex,
  FormHelperText,
} from '@sparrowengg/twigs-react';
import { LockIcon } from '@sparrowengg/twigs-react-icons';
import React from 'react';

const PasswordModal = ({
  passwordModal,
  setPasswordModal,
  passwordRef,
  passwordError,
  setPasswordError,
  onClose,
}) => {
  return (
    <Dialog open={passwordModal}>
      <DialogContent
        css={{
          backgroundColor: '$white900',
          color: '$neutral900',
          padding: '$16 $12 $8 $12',
          width: '465px',
          borderRadius: '$2xl',
          overflow: 'hidden',
        }}
      >
        <Box as="form">
          <Flex flexDirection="column" alignItems="center">
            <LockIcon />
            <Text as="h3" size="lg" weight="bold" css={{ marginTop: '$6' }}>
              This document is password protected
            </Text>
            <Text as="h4" css={{ color: '$neutral800' }}>
              Please enter the password below
            </Text>
            <Box
              css={{
                width: '100%',
                marginTop: '$12',
              }}
            >
              <Input
                errorBorder={passwordError}
                type="password"
                placeholder="Enter Password"
                size="lg"
                onChange={(e) => {
                  passwordRef.current.value = e.target.value;
                }}
              />
              {passwordError && (
                <FormHelperText
                  css={{
                    color: '$negative500',
                    marginTop: '$1',
                  }}
                >
                  Incorrect password
                </FormHelperText>
              )}
            </Box>
          </Flex>
          <Flex
            justifyContent="space-between"
            css={{
              marginTop: '$12',
            }}
          >
            <Button
              type="reset"
              color="default"
              variant="ghost"
              size="lg"
              onClick={() => {
                onClose();
                setPasswordError(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              onClick={() => {
                passwordRef.current.callback(passwordRef.current.value);
                setPasswordError(false);
                setPasswordModal(false);
              }}
            >
              Submit
            </Button>
          </Flex>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordModal;
