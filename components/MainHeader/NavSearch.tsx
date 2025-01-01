import { Input } from '../ui/input';

export default function NavSearch() {
  return (
    <Input
      type='text'
      placeholder="press '/' to search...."
      className='max-w-xs dark:bg-muted'
    />
  );
}
