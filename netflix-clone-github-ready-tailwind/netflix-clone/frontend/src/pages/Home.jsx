import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function Home(){
  const [movies, setMovies] = useState([]);
  useEffect(()=>{ API.get('/movies').then(r=>setMovies(r.data)).catch(()=>{}) },[]);
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map(m=> (
        <div key={m._id} className="border rounded overflow-hidden">
          <img src={m.posterUrl || 'https://via.placeholder.com/400x600?text=No+Poster'} alt={m.title} />
          <div className="p-2">
            <h3 className="font-bold">{m.title}</h3>
            <p className="text-sm">{m.description?.slice(0,100)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
