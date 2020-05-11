const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup HandleBars and views Location
app.set('view engine', 'hbs')
app.set('views', viewsPath) 
hbs.registerPartials(partialsPath) 

// Setup Static Directory to serve
app.use(express.static(publicDirectoryPath))

// app.com/weather
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kai'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Kai'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Kai'
    })
})

// app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address is not given"
        })
    }

    geocode(req.query.address, (error, {location, longtitude, latitude} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        } 
    
        forecast(latitude, longtitude, (error, data) => {
            if (error) {
                return res.send({
                    error: error
                })
            } 
    
            res.send({
                data: data, 
                location,
                address: req.query.address
            })
        });
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Kai',
        error: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Kai',
        error: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})