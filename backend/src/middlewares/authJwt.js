const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
    let token = req.get("Authorization");
    if (token)
        token = token.replace("Bearer ", "");
    if (!token || token === '') {
        return res.status(403).json({ message: "No token provided!" });
    }
    // console.log(req.params.username)
    jwt.verify(token, "Secret", (err, decoded) => {
        
        if (err || !decoded.id || !decoded.username) {
            return res.status(401).json({ message: "Invalid usertoken" });
        }

        req.body.user = {
            user_id: decoded.id, 
            username: decoded.username
        };
        next();
    });
};

module.exports = verifyToken
