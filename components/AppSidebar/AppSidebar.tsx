'use client';

import { useState } from 'react';

import { ChevronRight, ChevronLeft } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Navbar from './Navbar';

export default function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div
      className={cn(
        'flex h-screen flex-col border-r bg-background pt-12 transition-all duration-300',
        isCollapsed ? 'w-[3.5rem]' : 'w-36',
      )}
    >
      <div className='flex items-center p-2'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          // className='mr-2'
        >
          {isCollapsed ? (
            <ChevronRight className='h-2 w-2' />
          ) : (
            <ChevronLeft className='h-2 w-2' />
          )}
        </Button>
      </div>
      <Navbar isCollapsed={isCollapsed} />
    </div>
  );
}
