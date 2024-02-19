const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const workoutRouters = require('./routes/workoutsRouter')
const userRouters = require('./routes/userRouter')
const app = express()

app.use('/', (req, res, next) => {
    console.log(req.method, req.path)
    next()
})

app.use(express.json())

app.use(cors())

app.use('/api/workouts', workoutRouters)

app.use('/api/user', userRouters)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.clear();
        app.listen(process.env.PORT, () => {
            console.log('listening to port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })

