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
import { I18n } from 'react-redux-i18n';

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
        className="dm-sans"
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
              {I18n.t('attachments.pdf.title')}
            </Text>
            <Text as="h4" css={{ color: '$neutral800' }}>
              {I18n.t('attachments.pdf.description')}
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
                placeholder={I18n.t('attachments.pdf.placeholder')}
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
                  {I18n.t('attachments.pdf.incorrect')}
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
              {I18n.t('attachments.cancel')}
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
              {I18n.t('attachments.submit')}
            </Button>
          </Flex>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordModal;
