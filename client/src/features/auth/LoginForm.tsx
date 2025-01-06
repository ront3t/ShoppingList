import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginUser } from './authSlice';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <div>
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
      </div>
      <button disabled={loading} type='submit'>Login</button>
    </form>
  );
}
