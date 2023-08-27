import  Jwt  from "jsonwebtoken";
import {} from 'dotenv/config'

function jwtGenerator (user_id){
    const playload = {
        user: user_id
    }

    Jwt.sign(playload, process.env.jsonSecret, {expiresIn: "2hr"})
}

export default jwtGenerator