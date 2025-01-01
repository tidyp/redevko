import FormInput from '@/components/form/FormInput';
import Buttons from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';

const createProfileAction = async (prevState: any, formData: FormData) => {
  'use server';

  const rawData = Object.fromEntries(formData);
  console.log(rawData);

  if (rawData.firstName !== 'jj') {
    return {
      message: 'Profile not created',
    };
  }

  return {
    message: 'Profile created successfully',
  };
};

export default function page() {
  return (
    <section>
      <h1>new user</h1>
      <FormContainer action={createProfileAction}>
        <FormInput name='firstName' type='text' label='FirstName' />
        <FormInput name='lastName' type='text' label='LastName' />
        <Buttons text='submit' className='mt-8' />
      </FormContainer>
    </section>
  );
}
