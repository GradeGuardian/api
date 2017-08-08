const chat = require('./chat')
const Student = require('./models/student')

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
    session.rawData = Object.assign(session.rawData,response.result.parameters)
    formatDataAndSave(session)
    console.log(session.rawData)
    session.socket.emit('message',chat.newMessage('Thanks you for helping us help you help us all! That\'s all the questions I have today.'));
    setTimeout(function() {
      session.socket.emit('message',chat.newMessage('Your info has been sent to the NSA (Node Server Application) and will be used by your advisor to help you improve your grades.'))
    },1000)
    setTimeout(function() {
      session.socket.emit('message',chat.newMessage('Now that we are done, feel free to make small talk with me!'))
    },2000)
    return true
  }
  return false
}

function formatDataAndSave(session) {
  const data = session.rawData
  data.age = data.age.amount
  data.G1 = (parseInt(data.G1) * 5).toString()
  data.G2 = (parseInt(data.G2) * 5).toString()
  data.guardian = data.guardian.toLowerCase()
  data.famsize = parseInt(data.famsize) > 3 ? 'GT3' : 'LT3'
  session.data = data
  const student = new Student(session.data)
  student.save()
}

module.exports.handleResponse = handleResponse