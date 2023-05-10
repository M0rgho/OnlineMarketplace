const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
    let bearer = req.get("Authorization");
    const token = bearer.split('Bearer ')[1].trim();
    // console.log("token ", token)
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    // console.log(req.params.username)
    jwt.verify(token, "Secret", (err, decoded) => {
        if (err || decoded.username != req.params.username) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken
