const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
    let token = req.get("Authorization");
    if (token)
        token = token.replace("Bearer ", "");
    if (!token || token === '') {
        return res.status(403).send({ message: "No token provided!" });
    }
    // console.log(req.params.username)
    jwt.verify(token, "Secret", (err, decoded) => {
        req.body.user = {
            user_id: decoded.id, 
            username: decoded.username
        };
        next();
    });
};

module.exports = verifyToken
