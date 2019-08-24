require('dotenv').config()
const express = require('express')
const sendMail = require('./mail.js')
const app = express()
const path = require('path')
const port = process.env.PORT


app.use(express.urlencoded({
    extended: false
}));
app.use(express.json())

app.use(express.static(__dirname + '/public'))

app.post('/email', (req, res) => {
    const { name, lastname, subject, email, text} = req.body
    console.log('Data: ', req.body)

    sendMail(name, lastname, subject, email, text, function(err, data) {
        if (err) {
            console.log('ERROR: ', err)
            return res.status(500).json({ message: err.message || 'Internal Error' });
        } else { 
            console.log('Email sent!')
            return res.json({ message: 'Email sent!' })
        }
    });
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'views','/index.html'))
});

app.get('/email/sent', (req, res) => {
    res.sendFile(path.join(__dirname,'views','/emailMessage.html'))
});

app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname,'views','/errorMessage.html'))
});

app.get('/webapps.html', function(req, res) {
    res.sendFile(path.join(__dirname,'views','/webapps.html'))
});

app.get('/about.html', function(req, res) {
    res.sendFile(path.join(__dirname,'views','/about.html'))
});

app.get('/contact.html', function(req, res) {
    res.sendFile(path.join(__dirname,'views','/contact.html'))
});

app.listen(port, () =>  {
    console.log(`Server is running on PORT ${port}`)
})