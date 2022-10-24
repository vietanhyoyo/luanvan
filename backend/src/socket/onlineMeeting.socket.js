const numberLesson = require('../define/numberLesson')

function onlineMeeting(socket, io) {

    socket.on('online-meeting', data => {
        console.log(data);
        let number = 0;
        const nowDate = new Date(2022, 1, 0, data.hour, data.minute)

        for (lesson of numberLesson) {
            const start = new Date(2022, 1, 0, lesson.start_hour, lesson.start_minute);
            const end = new Date(2022, 1, 0, lesson.end_hour, lesson.end_minute);
            if (nowDate >= start && nowDate <= end) {
                number = lesson.number
            }
        }

        io.emit('online-meeting-client', { lessonNumber: number });
    })
}

module.exports = onlineMeeting