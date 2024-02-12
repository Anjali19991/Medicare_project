const jwt = require('jsonwebtoken');


const SECRET = "fakhawkehqw232dasasd"

const auth = async(req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, SECRET);
        const user = decodedToken;
        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: new Error("Invalid Request")
        })
    }
}

module.exports = auth