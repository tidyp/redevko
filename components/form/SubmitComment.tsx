'use client';

import SubmitButton from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import TextAreaInput from '@/components/form/TextAreaInput';
import { createCommentAction } from '@/server/comment.action';
import { useState } from 'react';

// Avatar

export default function SubmitComment({
  profileImage,
  postId,
}: {
  postId: string;
  profileImage: string;
}) {
  console.log(profileImage);

  const [isComment, setisComment] = useState(false);

  return (
    <>
      <div className='flex w-full gap-4'>
        {!isComment && (
          <div
            className='flex w-full items-center gap-2'
            onClick={() => setisComment(true)}
          >
            <img
              src={profileImage}
              className='h-6 w-6 rounded-full'
              alt='user profile image'
              referrerPolicy='no-referrer'
            />
            <p>Add a comment</p>
          </div>
        )}
      </div>
      {isComment && (
        <FormContainer
          action={createCommentAction}
          className='flex w-full flex-col gap-4'
        >
          <input type='hidden' name='profileId' value={postId} />
          <TextAreaInput name='content' label='Comment' rows={1} />
          <div className='flex w-full flex-row-reverse gap-4'>
            <SubmitButton text='Submit' size='sm' />
            <button
              className='w-sm'
              type='button'
              onClick={() => setisComment(false)}
            >
              Cancel
            </button>
          </div>
        </FormContainer>
      )}
    </>
  );
}
