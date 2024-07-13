const jwt = require('jsonwebtoken');
const jwtkey = "MySecretKey"

const verifytoken = async (req, res, next) => {
    try {

        const token = req.headers.authorization

        if (!token) {
            return res.status(401).json({
                message: 'No token provided'
            })
        }
        // if (token.startsWith("Bearer ")) {
        //     token = token.slice(7, token.length).trimLeft()
        // }
        const verified = jwt.verify(token, jwtkey)
        req.user = verified;
        next()


    } catch (error) {
        console.log("something went wrong at auhtentication", error);
        res.status(500).json({
            message: "something went wrong at auhtentication" + error
        })
    }
}

module.exports = verifytoken