import { usePage } from '@inertiajs/react';
import { useCallback, useEffect } from 'react';
import { Toaster, toast } from 'sonner';

export default function FlashMessage() {
  const { flash } = usePage().props;

  const showToast = useCallback(() => {
    if (flash?.error) {
      toast.error(flash.error);
    }
    if (flash?.success) {
      toast.success(flash.success);
    }
  }, [flash?.error, flash?.success]);

  useEffect(() => {
    showToast();
  }, [showToast]);

  return <Toaster position='top-right' duration={5000} richColors closeButton={true} />;
}
