const jwt = require("jsonwebtoken")

function authenMiddleware(req, res, next) {
    const authorization = req.headers['authorization'];
    if(!authorization) res.sendStatus(401);
    //'Beaer [token]'
    const token = authorization.split(' ')[1];

    if (!token) res.sendStatus(401);
    else{
        console.log(process.env.ACCESS_TOKEN_SECRET)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            // console.log(err, data)
            if (err) res.sendStatus(403);
            else next();
        });
    }
}

module.exports = authenMiddleware;