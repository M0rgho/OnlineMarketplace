const userModel = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


exports.signup = (req, res) => {
    const user = new userModel({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: "USER",
        registrationDate: new Date(),
        password: bcrypt.hashSync(req.body.password, 8),
        balance: 0
    });

    user.save().then(() => console.log('Saved user'))
        .catch((err) => console.error('Failed to save user', err));
}

exports.signin = (req, res) => {
    userModel.findOne({
        username: req.body.username,
    })
    .exec()
    .then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
            );
            
            if (!passwordIsValid) {
                console.log("Invalid Password!")
                return res.status(401).send({ message: "Invalid Password!" });
            }


        var token = jwt.sign({ id: user._id, username: user.username}, "Secret", {
            expiresIn: 86400, // 24 hours
        });

        // req.session.token = token;
        // console.log(token)
        res.status(200).send( {token: token, id:user._id} );
    })
    .catch((err) => {
        res.status(500).send({ message: err });
        return;
    }
);
};

// exports.signout = async (req, res) => {
//     try {
//         req.session = null;
//         return res.status(200).send({ message: "You've been signed out!" });
//     } catch (err) {
//         this.next(err);
//     }
// };