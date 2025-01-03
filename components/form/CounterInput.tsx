import { Input } from '../ui/input';
import { Label } from '../ui/label';

type CounterInputProps = {
  name?: string;
};

export default function CounterInput(props: CounterInputProps) {
  const { name } = props;

  return (
    <>
      <Label htmlFor={name} className='capitalize'>
        {name}
      </Label>
      <Input
        className='max-w-xs'
        id={name}
        name={name}
        type='number'
        min={1}
        defaultValue={1}
        required
      />
    </>
  );
}
