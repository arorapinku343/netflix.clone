const jwt = require('jsonwebtoken');
module.exports = function(requiredRole){
  return function(req,res,next){
    const auth = req.headers.authorization;
    if(!auth) return res.status(401).send({ message: 'No token' });
    const token = auth.split(' ')[1];
    try{
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
      if(requiredRole && payload.role !== requiredRole) return res.status(403).send({ message: 'Forbidden' });
      next();
    }catch(e){
      return res.status(401).send({ message: 'Invalid token' });
    }
  }
}
