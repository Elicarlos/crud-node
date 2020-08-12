const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const handlebars = require('express-handlebars')
const cors = require('cors')
const app = express()
//padrao do uso de bodyparser, vamos usar esta variavel no rota post para ver 
//como os dados vem do form, por meio do controllerForm
const urlEncodeedParser = bodyParser.urlencoded({ extended: false})
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'novosga',
    port: 3306
})
//Aqui digo que quero usar este banco de dados
sql.query('use nodejs')

//Template engine
app.engine('handlebars', handlebars({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
//Acessando arquivos estaticos com uso do "use"
    app.use('/css', express.static('css'))
    app.use('/js', express.static('js'))
    app.use('/img', express.static('img'))
//Routes and Templates
//? para que o id seja opcional
app.get('/', function(req, res){
    //res.send('Este a minha pagina inicial')
    //res.sendFile(__dirname + "/index.html")
    //Usar o codigo abaixo para ver a passagem de parametro
        //console.log(req.params.id)
    //Posso passar paramentro para o browser
        //res.render('index', {id:req.params.id})
    res.render('index')
})


/* //Criando rotas para acessar os arquivos estaticos
app.get('/javascript', function(req, res){
    res.sendFile(__dirname + '/js/javascript.js')
})

//Servido arquivos estaticos com uso de rotas
app.get('/style', function(req, res){
    res.sendFile(__dirname+"/css/style.css")
}) */

app.get('/inserir', function(req, res){
    res.render('inserir')
})

//Como no formulario de inserção foi usado o metodo post, temos que config
//o app como Post. Por conta desta operaão devemos configurar a urlEncoded 
// a usar o bodyParser lá em cima
app.post('/controllerForm', urlEncodeedParser, function(req, res){
    //Usado para testar o que esta sendo passado pelo formulário
    //console.log(req.body.nome)

    //Aqui devemos verificar quantos paramentros queremos pegar, para preparar a query
    sql.query('insert into user values (?,?,?)', [req.body.id, req.body.nome, req.body.idade]);
    //Posso passar parametros para controllerForm para uma mensagem personalizada
    res.render('controllerForm', { nome: req.body.nome })

})

//devemos colocar para que select recebe o Id de forma optional
app.get('/select/:id?', function(req, res){
    //se nao existir paramentros, vou selectionar todos os campos
    if(!req.params.id){
        sql.query('select * from user order by id asc', function(err, results, fields){
            //Resultado da query
            res.render('select', { data:results})
        })
    } else {
        sql.query('select * from user where id=? order by id asc', [req.params.id], function(err, results, fields){
            res.render('select', { data:results })
        })
    }
    
})


app.get('/deletar/:id', function(req, res){
    sql.query('delete from user where id=?', [req.params.id])
    res.render('deletar')
})

app.get('/update/:id',function(req, res){  
    sql.query('select * from user where id=?', [req.params.id], function (err, results, fields){
        res.render('update', {id:req.params.id, nome:results[0].nome, idade:results[0].idade})
    })  
    
     
})

app.post('/controllerUpdate', urlEncodeedParser, function(req, res){
    sql.query('update user set nome=?, idade=? where id=?', [req.body.nome, req.body.idade, req.body.id])
    res.render('controllerUpdate')
})

//Start Server
app.listen(3000, function(req, res){    
    console.log('Servidor esta funcinando na porta 3000')
})