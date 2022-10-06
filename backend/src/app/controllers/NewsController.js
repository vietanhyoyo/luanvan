const Link = require("../models/Link")
const Teacher = require("../models/Teacher")
const News = require("../models/News")
const jwt = require("jsonwebtoken")

class NewsController {

    add(req, res) {
        if (!req.body) res.sendStatus(400);
        else {
            const authorization = req.headers['authorization'];
            if (!authorization) res.sendStatus(401);
            //'Beaer [token]'
            const token = authorization.split(' ')[1];

            if (!token) res.sendStatus(401);
            else {
                jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
                    // console.log(err, data)
                    if (err) res.sendStatus(403);
                    else {
                        News.create({ text: req.body.text, createUser: data._id }, (error, doc) => {
                            if (error) res.send(error);
                            else res.send(doc);
                        })
                    };
                });
            }
        }
    }

}

module.exports = new NewsController;