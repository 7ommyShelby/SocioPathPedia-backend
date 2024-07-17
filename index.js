const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors');
const helmet = require('helmet')
const morgan = require('morgan');
const multer = require('multer');
require("dotenv").config()
const path = require('path');
const urltopath = require('url');
const userauthrouter = require('./routes/auth')
const userrouter = require('./routes/user');
const postrouter = require('./routes/post');
const validator = require('./middleware/auth');
const { createPost } = require('./controllers/post');
const { register } = require('./controllers/auth');


const port = process.env.PORT;

// config

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyparser.json({ limit: '30mb', extended: true }));
app.use(bodyparser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
// app.use(express.static('public/assets'))
app.use('/images', express.static(path.join(__dirname, 'public/assets')))


//file storage

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

mongoose.connect(process.env.MONGOOSE_KEY)
    .then(() => {
        console.log('server connected to database');
    })
    .catch((err) => {
        console.log('Could not connect to database', err);
    })

// routes with file
app.post('/api/user/register', upload.single('picture'), register)
app.post('/api/createpost', validator, upload.single('picture'), createPost)


// user router
app.use('/api/user', userauthrouter)
app.use('/api/user', validator, userrouter)
app.use('/api', validator, postrouter)



app.listen(port, () => {
    console.log('Server running at port:', port);
})