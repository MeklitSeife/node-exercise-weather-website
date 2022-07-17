const path= require('path')
const express = require('express')
const hbs=require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')
const app=express()

//define path for express config 
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname, "../templates/views")
const partialsPath= path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve express
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index', {
    title:'home page',
    name:'meklit  seife'
    })
    })
app.get('/about', (req,res)=>{
    res.render('about', {
        title:'about page',
        name:'meklit  seife'
    })
    })
app.get('/help',(req,res)=>{
res.render('help', {
helpText:'this is some helpful text',
title:'Help',
name:'meklit seife'
})
} )


app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
        error:'you must provide an adress'
               })
    }
        geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
            if (error) {
                return res.send({error})
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
        res.send({
            weather:forecastData,
            location,
            address: req.query.address
            })

            })
        })
    
    
    })
        
app.get('/help/*',(req,res)=>{
            res.render('404page',{
                title:'404',
                errorMessage:'help article not found',
                name:'meklit seife'
            })
            })
            
app.get('*',(req,res)=>{
res.render('404page',{
    title:'404',
    errorMessage:'page not found',
    name:'meklit seife'
})
})

app.listen(3000,()=>{
console.log('server is up on port 3000')})