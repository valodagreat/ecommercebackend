import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

export const protect = asyncHandler(async (req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    else if(req.cookies.token){
        token = req.cookies.token;
    }

    //Make sure the token is valid
    if(!token){
        res.status(401)
        throw new Error('Not authorized to access this route');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        req.user = await User.findById(decoded.id).select('-password');
        if(!req.user.name){
            res.status(401)
            throw (new Error('Not authorized to access this route'))
        }
        next();
    } catch (error) {
        res.status(401)
        throw new Error('Not authorized to access this route');
    }
})