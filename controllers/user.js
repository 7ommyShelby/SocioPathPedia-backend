const usermodel = require("../model/User");
const bcrypt = require('bcrypt')

const getuser = async (req, res) => {

    try {
        const { id } = req.params;
        const user = await usermodel.findById(id);

        res.json(user)

    } catch (error) {
        console.log("something went wrong at user", error);
        res.status(404).json({
            message: "something went wrong at user" + error.message
        })
    }

}

const getfriends = async (req, res) => {
    try {

        const { id } = req.params;
        const user = await usermodel.findById(id);

        const friends = await Promise.all(
            user?.friends?.map((id) => usermodel.findById(id))
        )

        const friendsdata = friends.map((e) => {
            return {
                _id: e._id,
                firstName: e.firstName,
                lastName: e.lastName,
                occupation: e.occupation,
                location: e.location,
                picturePath: e.picturePath
            }
        })

        res.json(friendsdata)

    } catch (error) {
        console.log("something went wrong at getfriends", error.message);
        res.status(404).json({
            message: "something went wrong at getfriends" + error.message
        })
    }
}

const addremovefriends = async (req, res) => {
    try {

        const { id, friendId } = req.params;

        const user = await usermodel.findById(id);
        const targetfriend = await usermodel.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id != friendId);
            targetfriend.friends = targetfriend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            targetfriend.friends.push(id);
        }

        await user.save()
        await targetfriend.save()

        const friends = await Promise.all(
            user.friends.map((id) => usermodel.findById(id))
        )

        const friendsdata = friends.map((e) => {
            return {
                _id: e._id,
                firstName: e.firstName,
                lastName: e.lastName,
                occupation: e.occupation,
                location: e.location,
                picturePath: e.picturePath
            }
        })

        res.json(friendsdata)
        // res.json(friends)

    } catch (error) {
        console.log("something went wrong at updating friendslist", error.message);
        res.status(404).json({
            message: "something went wrong at updating friendslist" + error.message
        })
    }
}

const getall = async (req, res) => {

    try {

        const allusers = await usermodel.find()
        console.log(allusers);
        res.json({
            allusers: allusers
        })

    } catch (error) {
        console.log("something went wrong at getting all users", error);
        res.status(404).json({
            message: "something went wrong at getting all users" + error.message
        })
    }
}

const updateuser = async (req, res) => {

    try {

        const { firstName, lastName, password, occupation, location } = req.body;

        // console.log("body--------", req.body);
        console.log(req.file);

        const { id } = req.user

        const user = await usermodel.findById(id)

        console.log(user);

        if (!user) {
            return res.status(400).json({
                message: " Login into your account,  Hacker nahi ho!"
            })
        }

        if (password) {
            const salt = bcrypt.genSaltSync(10);
            const hashpass = bcrypt.hashSync(password, salt);
            user.password = hashpass
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (occupation) user.occupation = occupation;
        if (location) user.location = location;
        if (req.file) user.picturePath = req.file.path

        // await usermodel.create(user)
        const updateduser = await user.save()

        //console.log("update", updateduser);

        res.json({
            message: "Profile updated Successfully",
            user: updateduser
        })

    } catch (error) {
        console.log("something went wrong at updating user", error);
        res.status(404).json({
            message: "something went wrong at updating user" + error.message
        })
    }
}

const usercontroller = {
    getuser,
    getfriends,
    addremovefriends,
    getall,
    updateuser
}

module.exports = usercontroller