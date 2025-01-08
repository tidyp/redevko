'use client';

import Link from 'next/link';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';

import {
  Home,
  MessageSquareMore,
  FileQuestion,
  CalendarDays,
  LucideBookOpenText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Discuss', href: '/b/discuss', icon: MessageSquareMore },
  { name: 'question', href: '/b/question', icon: FileQuestion },
  { name: 'article', href: '/b/article', icon: LucideBookOpenText },
  { name: 'team', href: '/b/team', icon: CalendarDays },
];

export default function Navbar({ isCollapsed }: { isCollapsed: boolean }) {
  const pathname = usePathname();

  return (
    <ScrollArea className='flex-1'>
      <nav className='flex w-fit flex-col gap-2 p-2'>
        {sidebarItems.map((item) => (
          <Link key={item.href} href={item.href} className='w-fit'>
            <Button
              variant='ghost'
              className={cn(
                'w-full justify-start p-2',
                pathname === item.href && 'bg-muted',
                isCollapsed ? '' : 'px-4',
              )}
            >
              <item.icon
                className={cn('h-4 w-4', isCollapsed ? 'mr-0' : 'mr-2')}
              />
              {!isCollapsed && <span>{item.name}</span>}
            </Button>
          </Link>
        ))}
      </nav>
    </ScrollArea>
  );
}
