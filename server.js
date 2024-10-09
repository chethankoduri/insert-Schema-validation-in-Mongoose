const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/getStudents",async(req,res)=>{
let studentsArr = await Student.find();
res.json(studentsArr);
})

app.listen(2222,()=>{
    console.log("Listening to port 2222");
})

let studentSchema = new mongoose.Schema({
    firstName:{
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(v);
          },
          message: props => `${props.value} is not a valid firstName!`
        },
        required: [true, 'User firstName required'],
      },
    lastName:{
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(v);
          },
          message: props => `${props.value} is not a valid lastName!`
        },
        required: [true, 'User lastName required'],
      },
    age:{
        type:Number,
        min:[13,"You are too young to use our app"],
        max:[120,"You are too old to create account"],
        required:true,
    },
    email:{
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
          },
          message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'User email required'],
      },
    gender:{
        type:String,
        enum: ["male","female"],
        lowercase: true,
        required: true,
    },
    batchID:String,
});

let Student = new mongoose.model("student",studentSchema,"BRN");

let getDataFromDB = async ()=>{
    let studentsArr = await Student.find();
    console.log(studentsArr);
}

let insertIntoDB = async ()=>{

    try {
        let pawan = new Student({
            firstName:"pawan",
            lastName:"kalyan",
            age:"30",
            email:"pawankalyan@gmail.com",
            gender:"male",
            batchID:"MERN 2407"
        });
        //await pawan.save();   
        console.log ("Saved into DB")

        let chiru = new Student({
            firstName:"chiru",
            lastName:"konidela",
            age:"65",
            email:"chiranjeevi@gmail.com",
            gender:"MaLe",
            batchID:"MERN 2407"
        });
        Student.insertMany([pawan,chiru]);
        //await chiru.save();   
        console.log ("Saved into DB")

    } catch (err) {
     console.log("Unable to insert data into DB");   
    }
};

let connectTOMDB = async ()=>{
    try {
    mongoose.connect("mongodb+srv://chethankoduri:chethan@chethan.ifthz.mongodb.net/BRNDBchethan2407?retryWrites=true&w=majority&appName=chethan")
       console.log("connected to MDB sucessfully");
      //insertIntoDB()
      getDataFromDB();
    } catch (err) {
        console.log("unable to connect to MDB ");
        
    }
};

connectTOMDB();