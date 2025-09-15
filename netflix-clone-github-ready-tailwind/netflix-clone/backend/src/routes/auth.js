const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req,res)=>{
  try{
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if(existing) return res.status(400).send({ message: 'Email exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash: hash });
    res.send({ message: 'ok' });
  }catch(err){ res.status(500).send({ message: 'Server error' }) }
});

router.post('/login', async (req,res)=>{
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).send({ message: 'Invalid' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if(!ok) return res.status(400).send({ message: 'Invalid' });
    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.send({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  }catch(err){ res.status(500).send({ message: 'Server error' }) }
});

module.exports = router;
