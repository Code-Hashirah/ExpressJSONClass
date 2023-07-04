const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const dataLocation =path.join(__dirname, '..', 'Data','products.json')
// let products=[]
router.get('/products', (req, res, next)=>{
  fs.readFile(dataLocation, (err, info)=>{
    let product=JSON.parse(info)
    res.render('products',{Products:product})
  })
   //   res.sendFile(path.join(__dirname, '../', 'views', 'products.html'));
 
})
router.get('/add-products', (req, res, next)=>{
  res.render('addProduct',{title:"Add products"})
  })
router.post('/add-product', (req, res, next)=>{
let newProduct=req.body;
fs.readFile(dataLocation,(err,data)=>{
  if(!err){
    let prod=[]
   prod= JSON.parse(data)
   newProduct.id=prod.length;
    prod.push(newProduct)
    fs.writeFile(dataLocation,JSON.stringify(prod), (err=>{
      if(err) throw "Failed to save"
      res.redirect('/products')
    }))
  }
})
    // let title = req.body.title
    // let img = req.body.image
    // console.log(title, img)
    // products.push(req.body)

} )

router.post('/delete-product',(req,res)=>{

  let prodId=req.body.prodId;
  fs.readFile(dataLocation,(err,data)=>{
    let prodData=[];
    prodData=JSON.parse(data)
    const newData=prodData.filter((value, index)=>{
      return value.id !=prodId
    })
    fs.writeFile(dataLocation,JSON.stringify(newData), err=>{
      if(err) throw err
      res.redirect('/products')
    })
  })

})
module.exports=router