import jwt from "jsonwebtoken"
import dotenv from "dotenv"


dotenv.config();


const protect = async (req, res, next) => {

    try {
        // Get token from header
        const  token= req?.headers?.authorization?.split(" ")[1];

        if(!token){
            return res.status(404).json({message: "Not Found Token"})
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

        // Attach user info to request
        req.userId = decoded.id;

        // call next 
        next()
    
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid", error: error.message });
    }
}


export default protect;