const bcrypt = require('bcrypt-nodejs');
const Account = require('../models/Account');
const Student = require('../models/Student');
const Grade = require('../models/Grade');
const SchoolYear = require('../models/SchoolYear');
const Class = require('../models/Class');
const Subject = require('../models/Subject')
const Week = require('../models/Week')

const data = [
    {
        id: 1,
        name: 'java'
    },
    {
        id: 2,
        name: 'php'
    }
]

class SiteController {

    index(req, res) {
        res.send('Home')
    }

    showHome(req, res) {
        res.json({ status: "Success", dataItem: data });
    }

    async createAccount(req, res) {

        const newPass = await bcrypt.hashSync('123456', bcrypt.genSaltSync(5), null);

        const newAccount = {
            username: 'vanh1',
            password: newPass,
            name: 'Hồ Minh Thu',
            birthday: '2003-01-10',
            role: 1
        }

        Account.create(newAccount, function (err, account) {
            if (err) res.send(err);
            res.send(account);
        });
    }

    async createStudent(req, res) {
        const newStudent = {
            account: '62f79dfde7601608824212c3',
            phoneNumber: '0123123123',
            parent: 'Ngô Thị Đào',
            address: 'Cần Thơ',
            idStudent: '020204',
            healthInsurance: 'HS09020',
            class: '62f7a03154cab50331538e61'
        }

        Student.create(newStudent, function (err, student) {
            if (err) res.send(err);
            res.send(student);
        });
    }

    createGrade(req, res) {
        Grade.create({
            name: '5'
        }, function (err, data) {
            if (err) res.send(err);
            res.send(data);
        });
    }

    createSchoolYear(req, res) {
        SchoolYear.create({
            name: '2022-2023'
        }, function (err, data) {
            if (err) res.send(err);
            res.send(data);
        });
    }

    createClass(req, res) {
        Class.create({
            name: '1A',
            grade: '62f79823504bbbe461e3eede',
            schoolYear: '62f79d26b91b43d31c9d9545'
        }, function (err, data) {
            if (err) res.send(err);
            res.send(data);
        });
    }

    createSubject(req, res) {
        if (!req.body) res.sendStatus(400);
        else {
            const input = req.body;
            console.log(input);
            Subject.create({ name: input.name }, (err, doc) => {
                if (err) res.send({ status: 'Error', err });
                else res.send({ status: 'Success', doc });
            })
        }
    }

    getSubjects(req, res) {
        Subject.find({}, (err, doc) => {
            if (err) res.send(err);
            else res.send(doc);
        })
    }

    //Dung 1 lan
    async createSemesterOneWeek(req, res) {
        try {
            for (let i = 1; i <= 18; i++) {
                await Week.create({
                    name: i.toString(),
                    semester: '1',
                    startDate: null,
                    endDate: null
                })
            }
        } catch (error) {
            res.send(error);
        }
    }

    //Dung 1 lan
    async createSemesterTwoWeek(req, res) {
        try {
            for (let i = 1; i <= 17; i++) {
                await Week.create({
                    name: i.toString(),
                    semester: '2',
                    startDate: null,
                    endDate: null
                })
            }
        } catch (error) {
            res.send(error);
        }
    }

    getTestRequest(req, res) {
        console.log(req.params)
        if(!req.params) res.sendStatus(400);
        else res.send(req.params);
    }
}

module.exports = new SiteController;