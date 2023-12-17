'use client';

import { stripeRedirect } from '@/actions/stripe-redirect';
import { useAction } from '@/hooks/use-action';
import { useProModal } from '@/hooks/use-pro-modal';
import { toast } from 'sonner';
import { Dialog, DialogContent } from '../ui/dialog';
import Image from 'next/image';
import { Button } from '../ui/button';

export const ProModal = () => {
  const proModalState = useProModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onExecute = () => {
    execute({});
  };

  return (
    <Dialog
      open={proModalState.isOpen}
      onOpenChange={proModalState.onClose}
    >
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image
            src="/hero.svg"
            alt="Hero"
            className="object-cover"
            fill
          />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">
            Upgrade to Trello Clone Pro Today!
          </h2>
          <p className=" text-xs font-semibold text-neutral-600">
            Explore the best of Trello Clone
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited Boards</li>
              <li>Advanced Checklists</li>
              <li>Admin and Security Features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            disabled={isLoading}
            onClick={onExecute}
            className="w-full"
            variant="primary"
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
