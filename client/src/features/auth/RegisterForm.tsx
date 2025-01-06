import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { registerUser } from './authSlice';

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <div>
        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
      </div>
      <button disabled={loading} type='submit'>Register</button>
    </form>
  );
}
