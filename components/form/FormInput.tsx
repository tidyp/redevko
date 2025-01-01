import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type TFormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

export default function FormInput(props: TFormInputProps) {
  const { label, name, type, defaultValue, placeholder } = props;

  return (
    <div>
      <Label htmlFor={name} className='capitalize'>
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </div>
  );
}
