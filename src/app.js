const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()
const weatherData = require('../utils/weatherData')
const PublicStaticDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(PublicStaticDirPath))




app.get('/', (req, res) =>{

    res.render('index', {
        title:'Real time weather app'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address)
    {
        return res.send({error: "You must enter address in search text box"})
    }

    weatherData(address, (error, { temperature, description, cityName }) =>
    {
        if (error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
});

app.get('*', (req, res) =>
{
    res.render('404', {
        title:"Page not found!"
    })

})

app.listen(5000, () => {
    console.log("server is running on port 5000")

})