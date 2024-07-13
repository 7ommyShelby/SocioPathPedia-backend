const mongoose =require('mongoose');

const postSchema = new mongoose.Schema(
    {
        userid : {
            type : String,
            required : true
        },
        firstName : {
            type : String,
            required : true
        },
        lastName: {
            type : String,
            required : true
        },
        location : {
            type : String,
            required : true
        },
        description : String,
        picturePath : String,
        userPicturePath : String,

        likes :{
            type : Map,
            of : Boolean
        },
        comments : {
            type : Array,
            default : []
        }
    },
    {
        timestamps : true
    }
)

const postmodel = mongoose.model("post", postSchema);
module.exports = postmodel