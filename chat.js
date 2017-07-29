const application = require('./index')

const server = application.server

const io = require('socket.io').listen(server)

let socketListeners = {}

io.on('connection', (socket) => {
    console.log('User connected')
    socketListeners
    socket.on('disconnect', () => {
        console.log('User disconnected')
    })

    socket.on('message', (message) => {
        console.log('Got message: ', message)
    })
    
    socket.emit('message', newMessage('Hi, I\'m Desiree.'))
})

function newMessage(text) {
    return {
        message: text,
        isSenderServer: true,
        sent: true
    }
}