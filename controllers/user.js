const usermodel = require("../model/User");

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

const usercontroller = {
    getuser,
    getfriends,
    addremovefriends,
    getall
}

module.exports = usercontroller