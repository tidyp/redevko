import Button from '../common/button';
import NavBar from './NavBar';

export default function SideBar() {
  return (
    <aside className='fixed top-0 flex h-screen w-1/4 items-center justify-around bg-white'>
      <NavBar />
      <Button className='mx-2'>로그인</Button>
    </aside>
  );
}
