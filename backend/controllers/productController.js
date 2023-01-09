import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//@des Fetch all products
//@route GET /api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    // res.status(401)
    // throw new Error("Not Authrised")
    res.json(products)
})

//@des Fetch single product by id
//@route GET /api/products/:id
//@access public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {

        res.json(product)
    } else {
        // res.status(404).json({ message: 'Product not found' })
        res.status(404)
        throw new Error('Product not found')
    }
})

export{
    getProducts,
    getProductById
}