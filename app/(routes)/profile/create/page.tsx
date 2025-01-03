import FormInput from '@/components/form/FormInput';
import Buttons from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import { createProfileAction } from '@/server/profile.action';

export default function page() {
  return (
    <section>
      <h1>new user</h1>
      <FormContainer action={createProfileAction}>
        <FormInput name='nickname' type='text' label='Nicknmae' />
        <FormInput name='job' type='text' label='Job' />
        <Buttons text='submit' className='mt-8' />
      </FormContainer>
    </section>
  );
}
