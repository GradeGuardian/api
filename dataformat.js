
function formatDataForMLAndSave(session) {
  const data = session.rawData
  data.age = data.age.amount
  data.G1 = (parseInt(data.G1) * 5).toString()
  data.G2 = (parseInt(data.G2) * 5).toString()
  data.guardian = data.guardian.toLowerCase()
  data.famsize = parseInt(data.famsize) > 3 ? 'GT3' : 'LT3'
  session.data = data
  const student = new Student(session.data)
  console.log("Formatted Data")
  console.log(data)
  student.save()
}

function formatDataForAdvisor(data) {

}

module.exports.formatDataForMLAndSave = formatDataForMLAndSave