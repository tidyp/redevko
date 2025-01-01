'use client';

import { useFormState } from 'react-dom';
import React, { useEffect } from 'react';

import { actionFunction } from '@/types/types';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: '',
};

export default function FormContainer({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) {
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({
        description: state?.message,
      });
    }
  }, [state]);

  return <form action={formAction}>{children}</form>;
}
