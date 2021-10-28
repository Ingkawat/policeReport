const express = require('express')

const app = express()
app.use(express.json())

const loginRouter = require('./routes/login')
app.use(loginRouter.router)

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
  })