const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const dataLocation =path.join(__dirname, '..', 'Data','products.json')
const adminControler=require('../controllers/admin')
// let products=[]
router.get('/products', (req, res, next)=>{
  fs.readFile(dataLocation, (err, info)=>{
    let product=JSON.parse(info)
    res.render('products',{Products:product})
  })
   //   res.sendFile(path.join(__dirname, '../', 'views', 'products.html'));
 
})
router.get('/add-product',adminControler.addProdPage )
router.post('/add-product',adminControler.addProducts )

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

// update product
router.get('/update-product/:id',(req, res)=>{
    let prodId=req.params.id;
    fs.readFile(dataLocation,(err,data)=>{
      let proData=JSON.parse(data)
      let update=proData.filter((value)=>{
        return value.id == prodId
      })
      // console.log(update)
      res.render('updateProduct',{title:"Update Product", Product:update})
    })
})

router.post('/update-product', (req,res)=>{
  let newData=req.body;
  // console.log(newData.id)
  fs.readFile(dataLocation,(err, update)=>{
    let proData=JSON.parse(update)
    let newUpdate=[];
    for(let i=0; i < proData.length; i++){
      if(proData[i].id==newData.id){
        newUpdate[i]=newData
      }
      else{
        newUpdate[i]=proData[i]
        // console.log(newUpdate)
      }
    }
    // writing to Json 
    fs.writeFile(dataLocation,JSON.stringify(newUpdate),(err)=>{
      if(err) throw err
    })
    res.redirect('/products')
  })
})




module.exports=router