import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type TextAreaInputProps = {
  name: string;
  label?: string;
  defaultValue?: string;
};

export default function TextAreaInput(props: TextAreaInputProps) {
  const { name, label, defaultValue } = props;

  return (
    <>
      <Label htmlFor={name} className='capitalize'>
        {label}
      </Label>
      <Textarea
        className='max-w-xs leading-loose'
        id={name}
        name={name}
        rows={5}
        defaultValue={defaultValue}
        required
      />
    </>
  );
}
