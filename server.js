const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000;

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req,res,next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`

    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => { })
    next()
})
/*
app.use((req,res,next) => {
    res.render('maint.hbs')
})
*/

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('scream', (text) => {
    return text.toUpperCase()
})

app.get('/', (request,response) => {
    response.render('home.hbs',{
        user: 'Danielle',
        pageDescription: 'welcome!'
    })
})

app.get('/about', (request,response) => {
    response.render('about.hbs',{
        pageDescription: 'Help text here.'
    })
})

app.get('/bad', (request,response) => {
    response.send({
        code: '500',
        message: 'Error'
    })
    
})

app.listen(port, () => {
    console.log(`Server up on port ${port}`)
})