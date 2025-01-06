import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type TextAreaInputProps = {
  name: string;
  label?: string;
  defaultValue?: string;
  rows?: number;
};

export default function TextAreaInput(props: TextAreaInputProps) {
  const { name, label, defaultValue, rows = 5 } = props;

  return (
    <>
      <Label htmlFor={name} className='capitalize'>
        {label}
      </Label>
      <Textarea
        className='max-w-xs text-sm leading-loose'
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        required
      />
    </>
  );
}
