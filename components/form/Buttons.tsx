'use client';
import { Loader } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

type btnSize = 'default' | 'sm' | 'lg' | 'icon';

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

export default function Buttons(props: SubmitButtonProps) {
  const { className = '', text = 'submit', size = 'lg' } = props;
  const { pending } = useFormStatus();

  return (
    <>
      <Button
        className={`capitalize ${className}`}
        type='submit'
        disabled={pending}
        size={size}
      >
        {pending ? (
          <>
            <Loader className='mr-2 h-4 w-4 animate-spin' />
            <span>Loding...</span>
          </>
        ) : (
          text
        )}
      </Button>
    </>
  );
}
