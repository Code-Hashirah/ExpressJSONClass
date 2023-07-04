const http = require('http');
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const productsRoutes= require('./routes/products')
const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))
const userRoute = require('./routes/users')
// app.use( (req, res, next)=>{
//     console.log('First MIddleware')
//     // res.send('<h2> Welcome to nodeJs express class </h2>')
//   })
// app.use( (req, res)=>{
//     console.log('Second middleware')
//     // res.send('<h2> Add Produt Page</h2>')
//   })
// app.get('/', (req, res, next)=>{
//     res.send('Hello Nodejs')
// })
// app.get('/add-product', (req, res)=>{
//     res.send('Add product')
// })
app.use(userRoute)
app.use(productsRoutes)
app.listen(8000)