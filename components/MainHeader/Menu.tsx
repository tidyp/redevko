import { HiBars3 } from 'react-icons/hi2';

export default function Menu({ onMenuOpen }) {
  return (
    <span
      onClick={onMenuOpen}
      className='rounded-md p-2 text-2xl font-semibold hover:bg-gray-100'
    >
      <HiBars3 />
    </span>
  );
}
