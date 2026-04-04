import jwt from 'jsonwebtoken';
import blacklistModel from '../models/token.model.js';

export async function authUser(req,res,next){
  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({ message:"Unauthorized: No token provided" });
  }



  try{

    const isBlacklisted = await blacklistModel.findOne({ token });

    if (isBlacklisted) {
      return res.status(401).json({
        message: "Token invalid, login again (blacklisted)"
      });
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next();
  }catch(err){
    return res.status(401).json({ message:"Unauthorized: Invalid token" });
  }
}