import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  username:{
    type:String,
    required:true,
    unique:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
    minLength:6,
  },
  followers:{
    type:[String],
    default:[],
  },
  following:{
    type:[String],
    default:[],
  },
  bio:{
    type:String,
    default:"",
  }
  
},{
  timestamps:true
})

const user = mongoose.model("User",userSchema)

export default user;