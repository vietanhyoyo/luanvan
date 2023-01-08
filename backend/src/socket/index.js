const onlineMeeting = require('./onlineMeeting.socket')
const numberLesson = require('../define/numberLesson')

function socket(io) {
    /**io lắng nghe khi có connect đến */
    io.on('connection', (socket) => {
        console.log('----------- Đã kết nối socket ----------------------');

        onlineMeeting(socket, io)
    })

    setInterval(() => {
        let number = 0;
        // const nDate = new Date()
        const nDate = new Date(2022, 11, 7, 8, 10)
        const nowDate = new Date(
            nDate.getFullYear(),
            nDate.getMonth(),
            nDate.getDate(),
            nDate.getHours(),
            nDate.getMinutes()).getTime();
        for (lesson of numberLesson) {
            const start = new Date(
                nDate.getFullYear(),
                nDate.getMonth(),
                nDate.getDate(),
                lesson.start_hour,
                lesson.start_minute).getTime();
            const end = new Date(
                nDate.getFullYear(),
                nDate.getMonth(),
                nDate.getDate(),
                lesson.end_hour,
                lesson.end_minute).getTime();
            if (nowDate >= start && nowDate <= end) {
                number = lesson.number;
                break;
            }
        }

        console.log('socketNumber timeout: ', number)

        io.emit('online-meeting-client', { lessonNumber: number });
    }, 10000)
}

module.exports = socket;