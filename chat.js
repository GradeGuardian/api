const application = require('./index')
const secrets = require('./secrets')
const apiai = require('apiai')

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
        console.log('User: ', message.message)
        socket.emit('message-success', { })
        sendToAPI(message.message,function(data) {
            const repsonse = data.result.fulfillment.speech
            console.log('Desiree: ' + response)
            socket.emit('message',newMessage(response))
        })
    })
    
    socket.emit('message', newMessage('Hi, I\'m Desiree. I\'m built to get you better grades. Ready to get started?'))
})

function newMessage(text) {
    return {
        message: text,
        isSenderServer: true,
        sent: true
    }
}

const desiree = apiai(secrets.apiai_token)

function sendToAPI(text,callback) {
    var request = desiree.textRequest(text, {
        sessionId: 'test123'
    })
    request.on('response', function(response) {
        callback(response)
    })
    
    request.on('error', function(error) {
        callback(error)
    })
    
    request.end()
}

sendToAPI("Hello",function(data){
    console.log(data.result.fulfillment.speech)
})
