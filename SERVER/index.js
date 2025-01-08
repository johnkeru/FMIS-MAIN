require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');
require('./config/mongo_db')()
const authRouter = require('./routers/auth_router');
const roleRouter = require('./routers/role_router');
const setterDataRouter = require('./routers/setter_data');
const signatoriesRouter = require('./routers/signatories_router');
const employeeRouter = require('./routers/employee_router');

const app = express();
app.use(cors({
    origin: [
        process.env.CLIENT1,
        process.env.CLIENT2,
        process.env.CLIENT3,
        process.env.CLIENT4,
        process.env.CLIENT5,
        // list more allowed origins
    ],
    credentials: true,
}))

app.use(express.json())
app.use(cookieParser())

// ROUTES
app.use(setterDataRouter)

app.use(authRouter)
app.use(roleRouter)
app.use(signatoriesRouter)
app.use(employeeRouter)

app.listen(5000, () => console.log('🚀', 'Server is now running'))