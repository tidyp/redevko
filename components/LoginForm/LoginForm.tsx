'use client';

import React, { useState } from 'react';

export default function LoginForm() {
  const [inputEmail, setinputEmail] = useState<string>();
  const [inputPassword, setinputPassword] = useState<string>();

  const handleSingUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('sign up');
    console.log(inputEmail, inputPassword);
  };

  const textChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'text') {
      setinputEmail(e.target.value);
    } else {
      setinputPassword(e.target.value);
    }
  };

  return (
    <form className='h-1/4' onSubmit={handleSingUp}>
      <div className='flex flex-col gap-4'>
        <input
          className='border'
          type='text'
          value={inputEmail}
          onChange={textChangeHandler}
        />
        <input
          className='border'
          type='password'
          value={inputPassword}
          onChange={textChangeHandler}
        />
      </div>
      <button type='submit'>sign up</button>
    </form>
  );
}
