const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express Config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Fernanda Verzbickas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Fernanda Verzbickas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Fernanda Verzbickas',
        helpText: 'Message to help you.'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'You must provide an adress'})
    } else {
        geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
            if (error) return res.send({error})
            else {
                forecast({longitude, latitude}, (err, dt) => {
                    if (err) return res.send({error: err})
                    else res.send({
                        longitude,
                        latitude,
                        location,
                        output: dt
                    })
                })
            }
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({error: 'You must provide a search term'})
    } else {
        res.send({
            products: []
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Fernanda Verzbickas'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Fernanda Verzbickas'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})