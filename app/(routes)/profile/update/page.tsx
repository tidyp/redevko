import FormInput from '@/components/form/FormInput';
import Buttons from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import {
  fetchProfile,
  updateProfileAction,
  updateProfileImageAction,
} from '@/server/profile.action';
import ImageInputContainer from '@/components/form/ImageInputContainer';

export default async function page() {
  const profile = await fetchProfile();

  return (
    <section>
      <h1>new user</h1>
      <ImageInputContainer
        image={profile?.profileImage || ''}
        name={profile?.nickname || ''}
        action={updateProfileImageAction}
        text='프로필 이미지 수정'
      />
      <FormContainer action={updateProfileAction}>
        <FormInput
          name='email'
          type='text'
          label='Email'
          defaultValue={profile?.email}
          disabled
        />
        <FormInput
          name='nickname'
          type='text'
          label='Nicknmae'
          defaultValue={profile?.nickname}
        />
        <FormInput
          name='job'
          type='text'
          label='Job'
          defaultValue={profile?.job}
        />
        <FormInput
          name='firstName'
          type='text'
          label='FirstName'
          defaultValue={profile?.firstName}
        />
        <FormInput
          name='lastName'
          type='text'
          label='LastName'
          defaultValue={profile?.lastName}
        />
        <Buttons text='수정' className='mt-8' />
      </FormContainer>
    </section>
  );
}
