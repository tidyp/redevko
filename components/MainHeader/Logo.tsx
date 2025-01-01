import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/'>
      <span className='bg-white text-lg font-bold text-black'>DEVKO</span>
    </Link>
  );
}
