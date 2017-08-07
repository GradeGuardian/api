const application = require('./index')
const secrets = require('./secrets')
const apiai = require('apiai')
const randomstring = require('randomstring')

const chatState = require('./chatstate')

const server = application.server

const io = require('socket.io').listen(server)

let sessions = []

io.on('connection', (socket) => {
    console.log('User connected')
    
    socket.on('disconnect', () => {
        console.log('User disconnected')
    })

    const session = newSession(socket)
    sessions.push(session)

    socket.on('message', (message) => {
        console.log('User: ', message.message)
        socket.emit('message-success', { })
        sendToAPI(message.message,session,function(data) {
            const response = data.result.fulfillment.speech
            console.log('Desiree: ' + response)
            socket.emit('message',newMessage(response))
        })
    })
    
    socket.emit('message', newMessage('Hi, I\'m Desiree. I\'m built to get you better grades. I\'m going to be asking some questions so please bear with me.'))
    setTimeout(function(){
        sendToAPI('start-data-collect',session,function(data) {
            const response = data.result.fulfillment.speech
            console.log('Desiree: ' + response)
            socket.emit('message',newMessage(response))
        })
    },2000)
})

function newMessage(text) {
    return {
        message: text,
        isSenderServer: true,
        sent: true
    }
}

function newSession(socket) {
    return {
        sessionId: randomstring.generate(16),
        dbObjectId: null,
        socket: socket,
        state: 0,
        rawData: null,
    }
}

const desiree = apiai(secrets.apiai_token)

function sendToAPI(text,session,callback) {
    var request = desiree.textRequest(text, {
        sessionId: session.sessionId,
    })
    request.on('response', function(response) {
        if(chatState.handleResponse(response,session)) return;
        callback(response)
    })
    
    request.on('error', function(error) {
        callback(error)
    })
    
    request.end()
}

module.exports.desiree = desiree
module.exports.sendToAPI = sendToAPI
module.exports.newMessage = newMessage