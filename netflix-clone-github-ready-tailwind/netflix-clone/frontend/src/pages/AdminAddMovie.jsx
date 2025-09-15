import React, { useState } from 'react';
import API from '../services/api';

export default function AdminAddMovie(){
  const [form, setForm] = useState({ title: '', description: '', videoUrl: '', tags: '', isPremium: true });
  const [poster, setPoster] = useState(null);

  const submit = async (e)=>{
    e.preventDefault();
    try{
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('description', form.description);
      fd.append('videoUrl', form.videoUrl);
      fd.append('tags', form.tags);
      fd.append('isPremium', form.isPremium);
      if(poster) fd.append('poster', poster);
      const res = await API.post('/movies', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Added: ' + res.data.title);
    }catch(err){ alert('Add failed. Are you admin?') }
  }

  return (
    <form onSubmit={submit} className="p-4 max-w-xl mx-auto">
      <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Title" className="block mb-2" />
      <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Description" className="block mb-2" />
      <input value={form.videoUrl} onChange={e=>setForm({...form, videoUrl:e.target.value})} placeholder="Video URL" className="block mb-2" />
      <input value={form.tags} onChange={e=>setForm({...form, tags:e.target.value})} placeholder="tags (comma)" className="block mb-2" />
      <label className="block mb-2"><input type="checkbox" checked={form.isPremium} onChange={e=>setForm({...form, isPremium: e.target.checked})}/> Premium</label>
      <input type="file" onChange={e=>setPoster(e.target.files[0])} className="block mb-2" />
      <button type="submit">Add Movie</button>
    </form>
  );
}
