require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// connectDB
const connectDB = require('./db/connect');

// extra security

// Swagger

// router
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs')

// authenticate middleware
const authenticateUser = require('./middleware/authentication');

// error handler
const notFoundErrorMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.json())


// routes
app.get('/', (req, res) => {
    res.send('<h1>JOBS API</h1>')
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

// middleware
app.use(errorHandlerMiddleware)
app.use(notFoundErrorMiddleware)

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })

    } catch (err) {
        console.log(err)
    }
}
start()