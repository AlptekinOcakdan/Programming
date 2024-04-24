import {USER_ROLES} from "../constants/types.js";

const adminMiddleware = (req,res,next)=>{
    const role = req.user.role;
    
    if(role !== USER_ROLES.ADMIN && role !== USER_ROLES.SUPER_ADMIN){
        return res.status(403).json({
            message: 'You are not authorized!'
        })
    }
    next();
};

export default adminMiddleware;