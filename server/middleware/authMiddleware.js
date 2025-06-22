const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) =>{

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    const token =authHeader.replace('Bearer ', '');
    try{
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    }
    catch(err){
        res.status(400).json( {message: 'Invalid token'} );
    }
}
module.exports = authMiddleware;