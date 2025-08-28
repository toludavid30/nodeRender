const ProductModel = require('../Models/ProductModel')

const addProducts = async (req, res) =>{
    if(!req.file){
        res.status(400).json({
            message: 'no image provided'
        })
    }
    const image = req.file.path
    try{
        let products = await ProductModel.create({...req.body, productImage: image})
        if(!products){
        res.status(400).json({
            status: 'error',
            message: 'product not added'
        })
    }
    res.status(201).json({
        status:'success',
        message : 'Product added successfully.',
        products
    })    
    }
    catch(error){
        console.log(error);
        
    }
}

const getAllProducts = async(req, res) =>{
    try{
        let products = await ProductModel.find()
        if(!products){
            res.status(400).json({
                status: 'error',
                message: 'products not found'
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'products found',
            products
        })
    }
    catch(error){
        console.log(error);
    }
}

const getSingleProduct = async(req, res) => {
    try{
        const {productId} = req.params
        let product = await ProductModel.findOne({id: productId})
        if(!product){
            res.status(400).json({
                status: 'error',
                message: 'products not found'
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'products found',
            product
        })
    }
    catch(error){
        console.log(error);
    }
}

const deleteSingleProduct = async(req, res) => {
    try{
        const {productId} = req.params
        let products = await ProductModel.findByIdAndDelete(productId)
        if(!products){
            res.status(400).json({
                status: 'error',
                message: 'products not found'
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'products found',
            products
        })
    }
    catch(error){
        console.log(error);
    }
}

const updateSingleProduct = async(req, res) => {
    try{
        const {productId} = req.params
        let products = await ProductModel.findByIdAndUpdate(productId, req.body)
        if(!products){
            res.status(400).json({
                status: 'error',
                message: 'products not found'
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'products found',
            products
        })
    }
    catch(error){
        console.log(error);
    }
}

const searchAndFilterProducts = async (req, res) => {
    const {keyword} = req.body
    let query = {}
        if(keyword){
            query.$or =[{name: {$regex:keyword, $options:'i'}},{category: {$regex:keyword, $options:'i'}},]
        }
    try{
        let products = await ProductModel.find(query)
        if(!products){
            res.status(400).json({
                status: 'error',
                message: 'products not found'
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'products found',
            products
        })
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    addProducts, 
    getAllProducts,
    getSingleProduct,
    deleteSingleProduct,
    updateSingleProduct,
    searchAndFilterProducts 
}