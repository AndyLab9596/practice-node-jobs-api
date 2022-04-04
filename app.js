require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// connectDB
const connectDB = require('./db/connect');

// extra security
// extra security
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

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
// extra packages
// for deployment
app.set('trust proxy', 1)
//
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))
app.use(helmet())
app.use(cors())
app.use(xss())

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