// Task1: initiate app and run server at 3000
var express = require("express");
var Mongoose = require("mongoose");
const path = require("path")
const { EmployeeModel } = require("./Model/employee");

var app = new Express();
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended:false}))


const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 

Mongoose.connect("mongodb+srv://Mriduljoly:Mridul123@cluster0.jpujxjr.mongodb.net/Employeedb?retryWrites=true&w=majority",{
    useNewUrlParser: true
});


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',(req,res)=>{
    let data = EmployeeModel.find()
    res.send(data);
})

//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id',(req,res)=>{
    let id=req.params.id;
    let data= EmployeeModel.findOne({"_id":id})
    res.send(data);
})


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',(req,res)=>{
    let data= req.body;
    let employee = new EmployeeModel(data);
    let result = employee.save();
    res.send(result);
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id',(req,res)=>{
    let data = req.body;
        id = req.params.id;
        const Newdata= EmployeeModel.findByIdAndDelete({"_id":id},data);
        res.send(Newdata);
})




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',(req,res)=>{
    let id = req.body._id;
      const Replaceddata = EmployeeModel.findOneAndUpdate({"_id":id},data)
      res.send(Replaceddata);
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



