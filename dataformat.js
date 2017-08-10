
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
    console.log(rawStudent)
    console.log("G1 and G2",rawStudent['G1'],rawStudent['G2'])
    console.log("keys",Object.keys(rawStudent))
    const student = {
      id: rawStudent._id,
      name: rawStudent.name,
      gpa: (parseInt(rawStudent.G1) + parseInt(rawStudent.G2)) / 10,
      atRisk: rawStudent.atRisk
    }
    students.push(student)
  })
  return students
}

function formatStudentForAdvisor(rawStudent) {
  const student = {
    Name: rawStudent.name,
    atRisk: rawStudent.atRisk,
    GPA: (parseInt(rawStudent.G1) + parseInt(rawStudent.G2)) / 10,
    Age: rawStudent.age,
  }
  student['Living Status'] = rawStudent.Pstatus == 'A' ? 'Apart' : 'Together'
  student['Mother\'s Education'] = ['None','Primary Education','Secondary Education','5th to 9th grade','Higher Education'][parseInt(rawStudent.Medu)]
  student['Father\'s Education'] = ['None','Primary Education','Secondary Education','5th to 9th grade','Higher Education'][parseInt(rawStudent.Medu)]
  student['Mother\'s Job'] = rawStudent.Mjob
  student['Father\'s Job'] = rawStudent.Fjob
  student['Reason for school choice'] = rawStudent.reason
  student['Travel Time'] = ['',',<15 min','15 to 30 min','30 min to 1 hour','> 1 hour'][parseInt(rawStudent.traveltime)]
  student['Hours Spent Studying per Week'] = ['',',<2 hr','2 to 5 hrs','5 to 10 hrs','> 10 hrs'][parseInt(rawStudent.studytime)]
  student['Class Failures'] = rawStudent.failures
  student['Extra Educational Support'] = yesNo(rawStudent.schoolsup)
  student['Family Educational Support'] = yesNo(rawStudent.famsup)
  student['Extra Paid Classes?'] = yesNo(rawStudent.paid)
  student['Extra Curriculars?'] = yesNo(rawStudent.activities)
  student['Attends Nursery School?'] = yesNo(rawStudent.nursery)
  student['Has Internet?'] = yesNo(rawStudent.internet)
  student['In a relationship?'] = yesNo(rawStudent.romantic)
  student['Quality of Family Relationships (numeric: from 1 - very bad to 5 - excellent)'] = rawStudent.famrel
  student['Free time after school (numeric: from 1 - very low to 5 - very high)'] = rawStudent.freetime
  student['Going out with friends (numeric: from 1 - very low to 5 - very high)'] = rawStudent.goout
  student['Workday alcohol consumption (numeric: from 1 - very low to 5 - very high)'] = rawStudent.Dalc
  student['Weekend alcohol consumption (numeric: from 1 - very low to 5 - very high)'] = rawStudent.Walc
  student['Current health status (numeric: from 1 - very bad to 5 - very good)'] = rawStudent.health
  student['Number of school absences'] = rawStudent.absences
  return student
}

function yesNo(value) {
  return value == '1' ? 'Yes' : 'No'
}

module.exports.formatDataForMLAndSave = formatDataForMLAndSave
module.exports.formatListForAdvisor = formatListForAdvisor