import Logo from './Logo';
import NavSearch from './NavSearch';

import ModeToggle from './ModeToggle';
import UserDropDown from './UserDropDown';

export default function MainHeader() {
  return (
    <header className='fixed z-40 flex w-full items-center justify-between gap-4 bg-inherit px-2 py-4 pl-16'>
      <div className='flex items-center justify-center gap-1'>
        <Logo />
      </div>
      <NavSearch />
      <div className='flex items-center justify-center gap-1'>
        <ModeToggle />
        <UserDropDown />
      </div>
    </header>
  );
}
