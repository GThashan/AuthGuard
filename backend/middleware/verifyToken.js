import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({success:false,message:"not provide token"});
    }

    try {
        const decoded = jwt.verify(token,"YOUR_SECRET_KEY");
        if(!decoded){
            return res.status(401).json({success:false,message:"not provide token or invalid token"});
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({success:false,message:"Internal server error"});
    }
}