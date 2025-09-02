const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser = require('body-parser')



const app = express()
app.use(cors('https://localhost:3000/'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', require('./routes/customerRoutes'))
app.use(bodyParser.json())
const PORT = 5000


// const initializeDBAndServer = async () => {
//   try {
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (e) {
//     console.log(`DB Error: ${e.message}`)
//     process.exit(1)
//   }
// }
// initializeDBAndServer()

app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});





module.exports = app

