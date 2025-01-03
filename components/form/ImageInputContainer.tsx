'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import FormContainer from './FormContainer';
import ImageInput from './ImageInput';
import Buttons from './Buttons';
import { type actionFunction } from '@/types/types';
import { User2Icon } from 'lucide-react';

type ImageInputContainerProps = {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: React.ReactNode;
};

export default function ImageInputContainer(props: ImageInputContainerProps) {
  const { image, name, action, text } = props;
  const [previewImage, setPreviewImage] = useState(false);

  const UserIcon = (
    <User2Icon className='mb-4 h-24 w-24 rounded bg-primary text-white'>
      ImageInputContainer
    </User2Icon>
  );

  return (
    <div>
      {image ? (
        <Image
          className='mb-4 h-24 w-24 rounded object-cover'
          src={image}
          alt={name}
          width={100}
          height={100}
        />
      ) : (
        UserIcon
      )}
      <Button
        variant='outline'
        size='sm'
        onClick={() => setPreviewImage((prev) => !prev)}
      >
        {text}
      </Button>
      {previewImage && (
        <div className='mt-4 max-w-lg'>
          <FormContainer action={action}>
            {props.children}
            <ImageInput />
            <Buttons size='sm'>Upload</Buttons>
          </FormContainer>
        </div>
      )}
    </div>
  );
}
