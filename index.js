var express = require('express')
var bodyparser = require('body-parser')
var cors = require('cors')

var app = express()

var api = express.Router()
app.use('/api/v1', api)
api.use(cors())
app.use(express.static('public'));

module.exports.app = app
module.exports.api = api

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

const port = 4404

const server = app.listen(port, () => {
    console.log("Running on port " + port)
})

module.exports.server = server

require('./chat')
require('./routes/student')
