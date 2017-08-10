
const Student = require('./models/student')
const predict = require('./predict')

function formatDataForMLAndSave(session) {
  const data = session.rawData
  data.age = data.age.amount.toString()
  data.G1 = (parseInt(data.G1) * 5).toString()
  data.G2 = (parseInt(data.G2) * 5).toString()
  data.guardian = data.guardian.toLowerCase()
  data.famsize = parseInt(data.famsize) > 3 ? 'GT3' : 'LT3'

  data.traveltime = parseInt(data.traveltime)
  if(data.traveltime < 15) data.traveltime = 1;
  if(data.traveltime >= 15 && data.traveltime < 30) data.traveltime = 2;
  if(data.traveltime >= 30 && data.traveltime < 60) data.traveltime = 3;
  if(data.traveltime >= 60) data.traveltime = 4;
  data.traveltime = data.traveltime.toString()

  data.studytime = parseInt(data.studytime)
  if(data.studytime < 2) data.studytime = 1;
  if(data.studytime >= 2 && data.studytime < 5) data.studytime = 2;
  if(data.studytime >= 5 && data.studytime < 10) data.studytime = 3;
  if(data.studytime >= 10) data.studytime = 4;
  data.studytime = data.studytime.toString()

  data.failures = parseInt(data.failures)
  if(data.failures > 4) data.failures = '4';
  data.failures = data.failures.toString()

  session.data = data
  console.log("Formatted Data")
  console.log(data)
  predict.predictWithFormattedData(data)
}

function formatListForAdvisor(rawStudents) {
  let students = []
  rawStudents.forEach(function(rawStudent) {
    const student = {
      name: rawStudent.name,
      gpa: (parseInt(rawStudent.G1) + parseInt(rawStudent.G2)) / 10,
      atRisk: rawStudent.atRisk
    }
    students.push(student)
  })
  return list
}

function formatStudentForAdvisor(rawStudent) {

}

module.exports.formatDataForMLAndSave = formatDataForMLAndSave
module.exports.formatListForAdvisor = formatListForAdvisor