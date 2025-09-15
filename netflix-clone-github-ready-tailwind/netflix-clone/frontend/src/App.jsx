import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminAddMovie from './pages/AdminAddMovie'

export default function App(){
  return (
    <div>
      <nav className="p-4 border-b">
        <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link> | <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/admin" element={<AdminAddMovie/>} />
      </Routes>
    </div>
  )
}
