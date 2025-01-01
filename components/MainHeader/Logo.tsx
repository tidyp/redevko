import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/'>
      <span className='text-lg font-bold'>DEVKO</span>
    </Link>
  );
}
