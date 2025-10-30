import React from 'react';
import { Lock } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
      <DialogContent className="dm-sans bg-white text-neutral-900 p-16 px-12 pb-8 w-[465px] rounded-2xl overflow-hidden">
        <form>
          <div className="flex flex-col items-center">
            <Lock className="h-6 w-6" />
            <h3 className="text-lg font-bold mt-6">Title</h3>
            <h4 className="text-neutral-800">Description</h4>
            <div className="w-full mt-12">
              <Input
                type="password"
                placeholder="Password"
                className={`h-12 ${passwordError ? 'border-red-500' : ''}`}
                onChange={(e) => {
                  passwordRef.current.value = e.target.value;
                }}
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">Incorrect password</p>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-12">
            <Button
              type="reset"
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
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordModal;
