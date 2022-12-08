const express=require('express')
const {Router}= express
const app= express()
const router= Router()
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
let productos=[
    {
        title: "Xbox Series x",
        price: 500,
        link: "url1",
        id: 1
        
    },
    {
        title: "Playstation 5",
        price: 550,
        link: "url2",
        id: 2
    },
    {
        title: "computadora",
        price: 700,
        link: "url3",
        id: 3  
    }
]

router.get('/',function(req,res){
    res.status(200).json(productos)   
})


router.get('/:id',function(req,res){
    const id= req.params.id
    let objFind = productos.find(item => item.id == id) 
            if(objFind){
               res.status(200).json(objFind)
                return 
            }else res.status(404).json({error:"producto no encontrado"})
       
})
router.post('/',function(req,res){
    const productoAgregar=req.body
    let indice=productos.length-1
    ids=productos[indice].id
    productoAgregar["id"]=ids+1
    productos.push(productoAgregar)
    res.status(200).json(productoAgregar)
})
router.put('/:id',function(req,res){
    const id= req.params.id
    const productoModificar=req.body
    let objFind = productos.find(item => item.id == id) 
            if(objFind){
                productoModificar["id"]=objFind.id
                indice=productos.indexOf(objFind)
                productos[indice]=productoModificar
                res.status(200).json(productos)
                return 
            }else res.status(404).json({error:"producto no encontrado"})
       
})
router.delete('/:id',function(req,res){
    const id=req.params.id
    let objFind = productos.find(item => item.id == id) 
            if(objFind){
                indice=productos.indexOf(objFind)
               //borrar el producto
               productos.splice(indice,1)
                res.status(200).json(productos)
                return 
            }else res.status(404).json({error:"producto no encontrado"})
})

app.use('/api/productos',router)
app.listen(8080)