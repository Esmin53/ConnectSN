const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
         if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "Unauthorized!"})
         }

         const token = authHeader.split(" ")[1]

         await jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                return res.status(401).json({err})
            }
            req.user = data
            
         })
         next();
    } catch (error) {
        res.status(401).json({ msg: "Unauthorized!"})
    }
}

const verifyTokenAndUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.userId === req.params.userId) {
            next();
        } else {
            return res.status(401).json({ msg: "Unauthorized!!!"});
        }
    });
} ;

module.exports = {verifyToken, verifyTokenAndUser};