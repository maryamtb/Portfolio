require('dotenv').config()
const path = require('path')
const hbs = require('hbs')
const express = require('express')
const sendMail = require('./mail.js')

const port = process.env.PORT

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')
const faviconPath = path.join(__dirname,'./public/assets/favicon.ico');


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.use(express.static('public/assets')); 

app.use(express.static(faviconPath));

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

app.get('', (req, res) => {
    res.render('index', {
    })
});

app.use('/robots.txt', function (req, res, next) {
    res.type('text/plain')
    res.send("User-agent: *\nAllow: /");
});

app.get('/sitemap.xml', function(req, res) {
    // res.sendFile('./sitemap.xml');
    res.sendFile(__dirname + '/sitemap.xml');

});

app.get('/about', (req, res) => {
    res.render('about', {
    })
});

app.get('/projects', (req, res) => {
    res.render('projects', {
    })
});

app.get('/contact', (req, res) => {
    res.render('contact', {
    })
});

app.get('/email/sent', (req, res) => {
    res.render('emailMessage', {
    })
});

app.get('/error', (req, res) => {
    res.render('errorMessage', {
    })
});

app.listen(port, () =>  {
    console.log(`Server is running on PORT ${port}`)
})
