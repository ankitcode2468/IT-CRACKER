const jwt = require("jsonwebtoken");
const User = require("../module/userSchema");

const Authenticate = async (req, res, next) => {
    try {
        // console.log("abhishek");
        // console.log(req.cookies);
         const token = req.cookies.jwtoken;
        // console.log(token);
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!rootUser) { throw new Error('User not Found') }
        
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
        
    } catch (err) {
        res.status(401).send('Unauthorized:No token provided');
        // console.log('Unauthorized:No token provided');
        console.log(err);
    }
}

module.exports = Authenticate;