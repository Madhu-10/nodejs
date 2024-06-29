const jwt=require('jsonwebtoken')

exports.verifyToken = [
    (req, res, next)=>{
        const token = req.header('Autherization');
        if(!token)  // If the token is not found 'Access is Denied'
            return res.status(401).json({error: 'Access Denied'});
        try{ 
            // Verifying the key of the user
            const decoded= jwt.verify(token, 'this-can-be-any-random-key');
            req.userId = decoded.userId;
            next();
        } 
        catch(error){
            res.status(401).json({error: 'Invalid token'});
        }
    }
]