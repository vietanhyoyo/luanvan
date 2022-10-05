const Account = require('../models/Account')
const bcrypt = require('bcrypt-nodejs');

class AdminController {

    async addAdmin(req, res) {
        const data = req.body;
        if (!data || !data.username || data.username === '' ||
            !data.password || data.password === '' ||
            !data.name || data.name === '') {
            res.sendStatus(400);
        }
        else {
            const availableAccount = await Account.findOne({ username: data.username })
            if (availableAccount) res.send({ status: 'Error', message: 'Tên đăng nhập đã được sử dụng!' });
            else {
                const newPass = await bcrypt.hashSync(data.password, bcrypt.genSaltSync(5), null);
                Account.create({
                    username: data.username,
                    password: newPass,
                    name: data.name
                }, (err, doc) => {
                    if (err) res.send({ status: 'Error', error: err, message: 'Thêm dữ liệu thất bại!' });
                    else {
                        res.send({ status: 'Success', data: doc });
                    }
                })
            }
        }
    }

    getAdminAccount(req, res) {
        Account.find({ role: 0, isDelete: false }, (err, doc) => {
            if (err) res.sendStatus(401);
            else res.send(doc);
        })
    }

    editAccount(req, res) {
        if (!req.body) res.sendStatus(400);
        else {
            const data = req.body;
            Account.updateOne({ _id: data._id },
                data, function (err, docs) {
                    if (err) {
                        res.send({ status: 'Error', message: 'Lỗi trong cập nhật dữ liệu', error: err });
                    }
                    else {
                        res.send({ status: 'Success', data: docs });
                    }
                });
        }
    }

    deleteAccount(req, res) {
        if (!req.body) res.sendStatus(400);
        else {
            const data = req.body;
            Account.updateOne({ _id: data.id },
                { isDelete: true }, function (err, docs) {
                    if (err) {
                        res.send({ status: 'Error', message: 'Lỗi trong cập nhật dữ liệu', error: err });
                    }
                    else {
                        res.send({ status: 'Success', message: 'Cập nhật thành công!', data: docs });
                    }
                });
        }
    }

}

module.exports = new AdminController;