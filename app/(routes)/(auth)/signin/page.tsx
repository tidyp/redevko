import LoginForm from '@/components/LoginForm/LoginForm';

export default function Loginpage() {
  return (
    <div className='m-auto mt-14 flex h-screen flex-col items-center gap-12 text-center'>
      {/* <img className="h-64" src="/images/logo2.png" alt="logo" /> */}
      <div className='gap-2'>
        <p className='text-3xl font-bold'>DEKVO</p>
        <div className='mb-8 text-xl'>Let&#39;s get started!</div>
      </div>
      <LoginForm />
      <div className='flex flex-col gap-4'>
        {/* <a href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=vlUKteyrG18vRROD6kqr&redirect_uri=${API_URL}naverAuth/callback&state=RANDOM_STATE`}>
          <div className="shadow-3xl  flex h-12 w-64 items-center justify-center gap-2 rounded-lg bg-[#36c566] px-8">
            <Naver className="h-4 fill-white" />
            <spans className="text-white">네이버로 계속하기</spans>
          </div>
        </a> */}
      </div>
    </div>
  );
}
