import passport from "passport";

const authMiddleware=(req,res,next)=>{
    const token = req.headers.authorization;
    if(req.originalUrl.includes('/auth')){
        return next();
    }
    
    return passport.authenticate('jwt',{session:false}, (err, user, info)=>{
        if(err) return next(err);
        
        if(!user){
            return res.status(401).json({
                success:false,
                data:null,
                message: 'Unauthorized Access'
            });
        }
        req.user = user;
        next();
    });
};

export default authMiddleware;