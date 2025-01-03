import FormInput from '@/components/form/FormInput';
import FormContainer from '@/components/form/FormContainer';
import { createPostAction } from '@/server/post.action';
import SubmitButton from '@/components/form/Buttons';
import CounterInput from '@/components/form/CounterInput';
import DropdownInput from '@/components/form/DropdownInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import ImageInput from '@/components/form/ImageInput';

export default function createPostPage() {
  return (
    <section className='mx-auto w-full lg:w-1/3'>
      <h1 className='mb-8 text-2xl font-semibold capitalize'>Create post</h1>
      {/* TODO: 게시판 카테고리 탭 변경*/}
      <FormContainer action={createPostAction} className='flex flex-col gap-4'>
        <DropdownInput />
        <FormInput
          name='title'
          label='title'
          type='text'
          placeholder='Enter title'
          defaultValue='title1'
        />
        <TextAreaInput name='content' label='content' />
        <CounterInput name='Person' />
        <ImageInput />
        {/* 게시판 별 추가 Input */}
        <SubmitButton text='create post' className='mt-8' />
      </FormContainer>
    </section>
  );
}

// 'use client';
// import { newPost } from '@/actions/newPost.action';
// import Button from '@/components/Button';
// import Input from '@/ui/Input';

// export default function NewPostForm() {
//   return (
//     <form
//       action={newPost}
//       className='mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-4 rounded-md bg-white p-6 shadow-md'
//     >
//       {/* Category Selection */}
//       <div className='w-full'>
//         <label
//           htmlFor='category'
//           className='block text-sm font-medium text-gray-700'
//         >
//           Category
//         </label>
//         <select
//           name='category'
//           id='category'
//           className='mt-1 block w-full rounded-md border-gray-300 bg-gray-100 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
//         >
//           <option value='discuss'>Discuss</option>
//           <option value='question'>Question</option>
//           <option value='event'>Event</option>
//           <option value='ream'>Ream</option>
//         </select>
//       </div>

//       {/* Title Input */}
//       <div className='w-full'>
//         <label
//           htmlFor='title'
//           className='block text-sm font-medium text-gray-700'
//         >
//           Title
//         </label>
//         <Input
//           id='title'
//           className='mt-1 block w-full rounded-md border-gray-300 bg-gray-100 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
//           type='text'
//           name='title'
//           placeholder='Enter title'
//         />
//       </div>

//       {/* Content Input */}
//       <div className='w-full'>
//         <label
//           htmlFor='content'
//           className='block text-sm font-medium text-gray-700'
//         >
//           Content
//         </label>
//         <Input
//           id='content'
//           className='mt-1 block w-full rounded-md border-gray-300 bg-gray-100 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
//           type='text'
//           name='content'
//           placeholder='Enter content'
//         />
//       </div>

//       {/* Submit Button */}
//       <Button>Submit</Button>
//     </form>
//   );
// }
