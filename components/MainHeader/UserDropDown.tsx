import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
// import { Button } from '../ui/button';
// import SignOutLink from './SignOutLink';

import UserIcon from './UserIcon';
import { auth } from '@/lib/nextAuth/auth';
// import Image from 'next/image';
import { Button } from '../ui/button';
import SignOutButton from './SignOutButton';
import { fetchProfileImageAction } from '@/server/profile.action';

const links = [
  {
    title: 'home',
    href: '/',
  },
  {
    title: 'profile',
    href: '/profile/create',
  },
  {
    title: 'new post',
    href: '/post/new?category=discuss',
  },
];
const guestlinks = [
  {
    title: 'login',
    href: '/signin',
  },
  {
    title: 'resister',
    href: '/signup',
  },
];

export default async function UserDropDown() {
  const session = await auth();
  const profileImage = await fetchProfileImageAction();
  // console.log(profileImage);

  let userImage;

  if (profileImage) {
    userImage = (
      <>
        <Button variant='outline' size='icon'>
          <img
            src={profileImage}
            className='h-6 w-6 rounded-full'
            alt='user profile image'
            referrerPolicy='no-referrer'
          />
        </Button>
      </>
    );
  } else {
    userImage = <UserIcon />;
  }

  return (
    <DropdownMenu>
      {/* 트리거 */}
      <DropdownMenuTrigger asChild>
        <>{userImage}</>
      </DropdownMenuTrigger>

      {/* 컨텐츠 */}
      <DropdownMenuContent sideOffset={5}>
        {!session &&
          guestlinks.map((link) => (
            <Link href={link.href} key={link.title}>
              <DropdownMenuItem>{link.title}</DropdownMenuItem>
            </Link>
          ))}
        {session && (
          <>
            {links.map((link) => (
              <Link href={link.href} key={link.title}>
                <DropdownMenuItem>{link.title}</DropdownMenuItem>
              </Link>
            ))}

            <DropdownMenuSeparator />
            {/* 로그아웃버튼 */}
            <DropdownMenuItem>
              <SignOutButton />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
