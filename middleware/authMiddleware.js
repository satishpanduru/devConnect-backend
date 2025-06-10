import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            console.log('No token found in header');
            return res.status(401).json({message: 'No token, authorization denied'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('Authenticated user:', decoded);
        req.user = {id: decoded.id}; 

        next();
    } catch (error) {
        console.error("invalid token:", error.message);
        res.status(401).json({message: 'Token is not valid'});
    }
};

export default auth;
