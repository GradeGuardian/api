const request = require('request')

function predictWithFormattedData(data) {
  request.post('http://159.203.94.60/',{json: data},function(err,res,body) {
    if(!error && response.statusCode == 200) {
      console.log(body)
    } else {
      console.log("Error: ",err)
    }
  })
}

module.exports.predictWithFormattedData = predictWithFormattedData