const request = require('request')

const Student = require('./models/student')

function predictWithFormattedData(data) {
  request.post('http://159.203.94.60/',{json: data},function(err,res,body) {
    if(!err && res.statusCode == 200) {
      console.log(body)
      const predictedValue = body.Prediction.predictedValue
      let atRisk = false
      if(predictedValue <= 10) atRisk = true;
      data.predictedValue = predictedValue
      data.atRisk = atRisk
      const student = new Student(data)
      student.save(function(err1){
        if(err1) throw err1;
        console.log("saved prediction")
        console.log(student)
      })
    } else {
      console.log("Error: ",err)
    }
  })
}

module.exports.predictWithFormattedData = predictWithFormattedData