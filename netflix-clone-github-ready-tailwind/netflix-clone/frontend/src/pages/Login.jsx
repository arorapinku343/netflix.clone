import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ email: '', password: '' });
  const nav = useNavigate();
  const submit = async (e)=>{
    e.preventDefault();
    try{
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      nav('/');
    }catch(err){ alert('Login failed') }
  }
  return (
    <form onSubmit={submit} className="p-4 max-w-md mx-auto">
      <input className="block mb-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
      <input className="block mb-2" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
      <button type="submit">Login</button>
    </form>
  )
}
