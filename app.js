const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const handlebars = require('express-handlebars')
const cors = require('cors')
const app = express()

//Template engine
app.engine('handlebars', handlebars({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Routes and Templates
//? para que o id seja opcional
app.get('/:id?', function(req, res){
    //res.send('Este a minha pagina inicial')
    //res.sendFile(__dirname + "/index.html")
    //Usar o codigo abaixo para ver a passagem de parametro
        //console.log(req.params.id)
    //Posso passar paramentro para o browser
    res.render('index', {id:req.params.id})


    res.render('index')
})




//Start Server
app.listen(3000, function(req, res){
    console.log('Servidor esta funcinando na porta 3000')
})