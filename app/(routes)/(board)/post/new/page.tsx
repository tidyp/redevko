import FormInput from '@/components/form/FormInput';
import FormContainer from '@/components/form/FormContainer';
import { createPostAction } from '@/server/post.action';
import SubmitButton from '@/components/form/Buttons';
import CounterInput from '@/components/form/CounterInput';
// import DropdownInput from '@/components/form/DropdownInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import ImageInput from '@/components/form/ImageInput';
import CategoriesList from '@/components/form/CategoriesList';

export default function createPostPage({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  return (
    <section className='mx-auto w-full py-4 lg:w-1/3'>
      <input type='hidden' name='category' value={searchParams.category} />
      <h1 className='mb-4 text-2xl font-semibold capitalize'>Create post</h1>
      <CategoriesList selectCategory={searchParams.category} />
      <FormContainer action={createPostAction} className='flex flex-col gap-4'>
        {/* <DropdownInput /> */}
        <FormInput
          name='title'
          label='title'
          type='text'
          placeholder='Enter title'
          defaultValue='title1'
        />
        <TextAreaInput name='content' label='content' />
        <ImageInput />
        {/* 게시판 별 추가 Input */}

        {/* EVENT */}
        {searchParams.category === 'event' && (
          <FormInput
            name='date'
            label='date'
            type='date'
            placeholder='Enter date'
          />
        )}

        {/* TEAM */}
        {searchParams.category === 'team' && <CounterInput name='Person' />}

        <SubmitButton text='create post' className='mt-8' />
      </FormContainer>
    </section>
  );
}
