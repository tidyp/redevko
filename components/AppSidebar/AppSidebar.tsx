'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Navbar from './Navbar';
import Menu from '../MainHeader/Menu';
import Logo from '../MainHeader/Logo';

export default function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div
      className={cn(
        'fixed flex h-screen flex-col border-r bg-background pt-2 transition-all duration-300',
        isCollapsed ? 'w-[3.5rem]' : 'w-36',
      )}
    >
      <div className='flex items-center p-2'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <Menu />
          ) : (
            <div className='flex w-full items-center gap-4'>
              <Menu />
              <Logo />
            </div>
          )}
        </Button>
      </div>
      <Navbar isCollapsed={isCollapsed} />
    </div>
  );
}
