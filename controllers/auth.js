const usermodel = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()
const jwtkey = process.env.JWT_KEY
// const cloudinary = require('cloudinary').v2

const register = async (req, res) => {

    try {

        const { firstName, lastName, email, password, picturePath, friends, location, occupation } = req.body

        console.log(req.body, 'body');
        console.log(req.file, 'files');
        // console.log(password, 'password');

        const salt = await bcrypt.genSaltSync(10)
        const passwordhash = await bcrypt.hashSync(password, salt)

        // if (req.files.picture) {
        //     const uploadResult = await cloudinary.uploader
        //         .upload_stream((result) => console.log(result)
        //         ).end(req.files.picture.data)
        //     console.log(uploadResult, 'uploadresuklt');
        // }

        const user = new usermodel({
            firstName,
            lastName,
            email,
            password: passwordhash,
            impressions: Math.floor(Math.random() * 10000),
            viewedProfile: Math.floor(Math.random() * 10000),
            location,
            friends,
            occupation,
            picturePath: req.file.path,
        })

        const savedUser = await user.save()

        res.json({
            success: true,
            message: 'registered',
            data: savedUser,
        })
    } catch (error) {
        console.log("Something went wrong at register", error.message);

        res.status(500).json({
            message: "Something went wrong at register" + error.message
        })
    }

}

const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await usermodel.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }

        const isMatch = await bcrypt.compareSync(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Email or Password does not match"
            })
        }

        const token = jwt.sign({ id: user._id, name: user.firstName + user.lastName }, jwtkey)

        delete user.password

        res.json({
            success: true,
            message: "Login successful",
            data: user,
            token: token
        })


    } catch (error) {
        console.log("something went wrong at login", error.message);
        res.status(500).json({
            message: "something went wrong at login" + error.message
        })
    }
}


const authcontroller = {
    register,
    login
}

module.exports = authcontroller