const express = require("express");
const morgan = require("morgan")
const app = express();

//Dung cors de web khong bi chan
const cors = require("cors");
app.use(cors())

//Dung morgan de kiem tra su kien tren trinh duyet
app.use(morgan('combined'))

//Dung csdl
const db = require('./config/db')
db.connect()

app.use(express.json());
//Dugn bien moi truong env
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;

//Khai bao route
const route = require('./routes');

route(app);

/*Gửi video*/
const fs = require('fs')
const path = require('path')
const router = express.Router();
const url = require('url');

app.use('/', router.get("/upload/:file", async (req, res) => {

    /**Lấy tên file video */
    var params = url.parse(req.url, true).query;
    const filePath = params.id;
    console.log(params)
    /**Đọc file ảnh và gửi */
    const fakeString = __dirname + `/upload/videos/${req.params.file}`;
    console.log(fakeString);

    fs.readFile(fakeString, function (err, data) {
        if (!err) {
            console.log("d: ", data);
            res.send(data)
        } else {
            console.log(err);
        }
    });

}))

app.use('/', router.get("/image/:file", async (req, res) => {

    /**Lấy tên file video */
    var params = url.parse(req.url, true).query;
    const filePath = params.id;
    console.log(params)
    /**Đọc file ảnh và gửi */
    const fakeString = __dirname + `/upload/images/${req.params.file}`;
    console.log(fakeString);

    fs.readFile(fakeString, function (err, data) {
        if (!err) {
            res.end(data)
        } else {
            res.end(null)
        }
    });

}))
/*------------------------------------*/




/******************* */
/**Tạo một kênh để chia sẽ hình ảnh lắng nghe ở cổng localhost:8000 */
// const url = require('url');
// const http = require('http');
// const fs = require('fs');
// /**Tạo cổng lắng nghe 5001 */
// http.createServer(function (req, res) {
//     /**Lấy tên file ảnh */
//     var params = url.parse(req.url, true).query;
//     const filePath = params.id;
//     console.log(params)
//     /**Đọc file ảnh và gửi */
//     const fakeString = __dirname + `/upload/videos/${filePath}`;
//     console.log(fakeString);
//     fs.readFile(fakeString, function (err, data) {
//         if (err) res.end(null);
//         else
//             res.send(data); // Send the file data to the browser.
//     });

// }).listen(5002, "127.0.0.1");


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})

/******************* */
/**      26 / 4         */
