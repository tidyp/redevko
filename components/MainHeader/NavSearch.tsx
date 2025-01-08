'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';

export default function NavSearch() {
  const inputEl = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const focusInput = (e: KeyboardEvent) => {
    // 활성화된 요소가 input이면 return
    if (document.activeElement === inputEl.current) return;

    if (e.key === '/') {
      e.preventDefault(); // e.key가 '/'일때 기본동작을 막음
      inputEl.current?.focus();
    }
  };

  useEffect(() => {
    // 렌더링 후에 foucs필요한경우
    // focusInput({ key: '/' } as KeyboardEvent);

    // 그냥 keypress만으로도 가능
    document.addEventListener('keydown', focusInput);
    return () => document.removeEventListener('keydown', focusInput);
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      router.push(`?search=${encodeURIComponent(query.trim())}`);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', focusInput);
    return () => document.removeEventListener('keydown', focusInput);
  }, []);

  return (
    <Input
      type='text'
      placeholder="press '/' to search...."
      className='max-w-xs dark:bg-muted'
      ref={inputEl}
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
      }}
      onKeyDown={handleSearch}
    />
  );
}
