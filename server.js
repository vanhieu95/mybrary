const express = require('express')
const dotenv = require('dotenv')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

// Load config vars
dotenv.config({ path: './.env' })

const app = express()

// Routers
const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connect to Mongoose'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)
