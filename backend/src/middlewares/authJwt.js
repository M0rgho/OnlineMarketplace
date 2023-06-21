const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
    const token = req.get("Authorization").replace("Bearer ", "");
    if (!token || token === '') {
        return res.status(403).send({ message: "No token provided!" });
    }
    // console.log(req.params.username)
    jwt.verify(token, "Secret", (err, decoded) => {
        req.body.user = {
            user_id: decoded.id, 
            username: decoded.username
        };
        // console.log(req.body.user);
        next();
    });
};

module.exports = verifyToken
