const chat = require('./chat')

const desiree = chat.desiree

function handleResponse(response,session) {
  const message = response.result.fulfillment.speech
  if(message === 'start-second-collect') {
    console.log("start second");
    session.rawData = response.result.parameters
    chat.sendToAPI('start-second-collection',session,function(data) {
      session.socket.emit('message',chat.newMessage(data.result.fulfillment.speech))
    })
    return true
  }
  else if(message === 'finish-collect') {
    session.data = Object.assign(session.rawData,response.result.parameters)
    console.log(session.rawData)
    session.socket.emit('message',chat.newMessage('Thanks you for helping us help you help us all! That\'s all the questions I have today.'));
    setTimeout(function() {
      session.socket.emit('message',chat.newMessage('Your info has been sent to the NSA (Node Server Application) and will be used by your advisor to help you improve your grades.'))
    },1000)
    setTimeout(function() {
      session.socket.emit('message',chat.newMessage('Now that we are done, feel free to make small talk with me!'))
    },2000)
    return true;
  }
  return false
}

module.exports.handleResponse = handleResponse