import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Signup(){
  const [form, setForm] = useState({ name:'', email: '', password: '' });
  const nav = useNavigate();
  const submit = async (e)=>{
    e.preventDefault();
    try{ await API.post('/auth/signup', form); alert('Signup ok'); nav('/login'); }catch(err){ alert('Signup failed') }
  }
  return (
    <form onSubmit={submit} className="p-4 max-w-md mx-auto">
      <input className="block mb-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
      <input className="block mb-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
      <input className="block mb-2" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
      <button type="submit">Signup</button>
    </form>
  )
}
