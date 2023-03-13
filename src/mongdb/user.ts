const mongooses = require('./connection.ts');

const userSchema = new mongooses.Schema({
    username:{
        required: true,
        type:String,
    },
    password:{
        required:true,
        type: String,
    },
    gender: {
        required:true,
        type: String,
    },
    email: {
        required:true,
        type: String,
    },
    residence:{
        required:true,
        type: [String],
    },
    phone:{
        required:true,
        type: String,
    },
    prefix:{
        required:true,
        type: String,
    },
    intro:{
        required:true,
        type: String,
    },
    agreement:{
        required: true,
        type: Boolean,
    },
    created_at: {
        type: Date,
        default: +new Date()
    },
    updated_at: {
        type: Date,
        default: +new Date()
    },
})


module.exports = mongooses.model('user',userSchema,'user')