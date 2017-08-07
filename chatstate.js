const chat = require('./chat')

const desiree = chat.desiree

function handleResponse(response,session) {
  const message = response.result.fulfillment.speech
  if(message === 'start-second-collect') {
    console.log("start second");
    chat.sendToAPI('start-second-collection',session,function(data) {
      session.socket.emit('message',newMessage(data.result.fulfillment.speech))
    })
    return true
  }
  return false
}

module.exports.handleResponse = handleResponse