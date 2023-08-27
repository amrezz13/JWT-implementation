import Jwt  from "jsonwebtoken";

const middleware = async (req, res, next) =>{
    try{
        const jwtToken = req.header("token");
        if (!jwtToken){
            return res.status(403).json("Not Authorized")
        }

        // this message used to check the validity of the jwt depending on secret Key
        const playload = Jwt.verify(jwtToken, process.env.jsonSecret)
        
        req.user = playload.user;
    }catch(err){
        console.log('error ', err)
    }
}


export default middleware;