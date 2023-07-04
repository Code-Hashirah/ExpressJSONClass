const path = require('path')
const fs = require('fs')
const dataLocation =path.join(__dirname, '..', 'Data','products.json')

exports.addProdPage=(req, res, next)=>{
    res.render('addProduct',{title:"Add products"})
    }

    exports.addProducts= (req, res, next)=>{
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
          
        }