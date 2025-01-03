import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function ImageInput() {
  const name = 'profileImage';

  return (
    <>
      <Label htmlFor={name} className='capitalize'>
        Image
      </Label>
      <Input
        className='max-w-xs'
        id={name}
        name={name}
        type='file'
        required
        accept='image/*'
      />
    </>
  );
}
