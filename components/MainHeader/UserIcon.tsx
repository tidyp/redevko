import { User2Icon } from 'lucide-react';
import { Button } from '../ui/button';


export default function UserIcon() {
  return (
    <Button variant='outline' size='icon'>
      <User2Icon className='h-6 w-6 rounded-full' />
    </Button>
  );
}
