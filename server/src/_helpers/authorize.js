const jwt = require('jsonwebtoken');
const jwtsecret = require("../utils/dev.json");
const secret = jwtsecret.secret;

exports.authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.role = user.role;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

exports.verifyAdmin = (req, res, next) => {
    req.role == "admin" ? next() : res.status(400).send("You are not authorized!");
}

exports.verifyManager = (req, res, next) => {
    req.role == "manager" || req.role == "admin" ? next() : res.status(400).send("You are not authorized!");
}

exports.verifyMentor = (req, res, next) => {
    req.role == "mentor" || req.role == "manager" || req.role == "admin" ? next() : res.status(400).send("You are not authorized!");
}

exports.verifyUser = (req, res, next) => {
    req.role == "user" || req.role == "mentor" || req.role == "manager" || req.role == "admin" ? next() : res.status(400).send("You are not authorized!");
}