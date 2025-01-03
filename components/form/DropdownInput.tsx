import {
  MessageSquareMore,
  FileQuestion,
  CalendarDays,
  LucideBookOpenText,
} from 'lucide-react';
import React from 'react';

import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type Category = {
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export type CategoryLabel = 'discuss' | 'question' | 'event' | 'team';

export const categories: Category[] = [
  {
    label: 'discuss',
    icon: MessageSquareMore,
  },
  {
    label: 'question',
    icon: FileQuestion,
  },
  {
    label: 'event',
    icon: CalendarDays,
  },
  {
    label: 'team',
    icon: LucideBookOpenText,
  },
];

export default function DropdownInput() {
  return (
    <div>
      <Label
        htmlFor='category'
        className='block text-sm font-medium text-gray-700'
      >
        Category
      </Label>
      <Select defaultValue={categories[0].label} name='category'>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.label} value={category.label}>
              <span className='flex items-center gap-2'>
                <category.icon className='h-4 w-4' />
                {category.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
