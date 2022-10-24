const onlineMeeting = require('./onlineMeeting.socket')

function socket(io) {
    /**io lắng nghe khi có connect đến */
    io.on('connection', (socket) => {
        console.log('----------- Đã kết nối socket ----------------------');

        onlineMeeting(socket, io)
    })
}

module.exports = socket;