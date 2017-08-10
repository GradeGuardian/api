const request = require('request')

function predictWithFormattedData(data,student) {
  request.post('http://159.203.94.60/',{json: data},function(err,res,body) {
    if(!err && res.statusCode == 200) {
      console.log(body)
      const predictedValue = body.Prediction.predictedValue
      let atRisk = false
      if(predictedValue <= 10) atRisk = true;
      student.predictedValue = predictedValue
      student.atRisk = atRisk
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