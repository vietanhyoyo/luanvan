const numberLesson = require('../define/numberLesson')

function onlineMeeting(socket, io) {

    socket.on('online-meeting', data => {
        console.log(data);
        let number = 0;
        const nowDate = new Date(2022, 1, 1, data.hour, data.minute).getTime();

        for (lesson of numberLesson) {
            const start = new Date(2022, 1, 1, lesson.start_hour, lesson.start_minute).getTime();
            const end = new Date(2022, 1, 1, lesson.end_hour, lesson.end_minute).getTime();
            if (nowDate >= start && nowDate <= end) {
                number = lesson.number;
                break;
            }
        }

        console.log('socketNumber', number)

        io.emit('online-meeting-client', { lessonNumber: number });
    })

}

module.exports = onlineMeeting