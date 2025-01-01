import { MenuIcon } from 'lucide-react';
import Logo from './Logo';
import NavSearch from './NavSearch';
import UserIcon from './UserIcon';

export default function MainHeader() {
  return (
    <header className='fixed flex w-full items-center justify-between gap-4 bg-primary px-2 py-4'>
      <div className='flex items-center justify-center gap-1'>
        <MenuIcon className='h-6 w-6 border-b p-1' />
        <Logo />
      </div>
      <NavSearch />
      <UserIcon />
    </header>
  );
}
