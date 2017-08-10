const index = require('../index')

const api = index.api

const Student = require('../models/student')

const dataformat = require('../dataformat')

api.get('/students',function(req,res){
  Student.find({},function(err,students) {
    if(err) res.json({error: err});
    res.json(students)
  })
})

api.get('/students/atrisk',function(req,res){
  Student.find({atRisk: true}).lean().exec(function(err,students) {
    if(err) res.json({error: err});
    res.json(dataformat.formatListForAdvisor(students))
  })
})

api.get('/students/norisk',function(req,res){
  Student.find({atRisk: false}).lean().exec(function(err,students) {
    if(err) res.json({error: err});
    res.json(dataformat.formatListForAdvisor(students))
  })
})

api.get('/student/:id',function(req,res){
  const id = req.params.id
  Student.findOne({_id: id}).lean().exec(function(err,student) {
    if(err) res.json({error: err});
    res.json(student)
  })
})