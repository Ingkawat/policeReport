const express = require('express')

const app = express()
app.use(express.json())

const loginRouter = require('./routes/login')
app.use(loginRouter.router)

const accountRouter = require('./routes/account')
app.use(accountRouter.router)


const reportRouter = require('./routes/report')
app.use(reportRouter.router)

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
  })
