import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

//@des Fetch all products
//@route GET /api/products
//@access public
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
}))

//@des Fetch single product by id
//@route GET /api/products/:id
//@access public
router.get('/:id', asyncHandler(async (req, res) => {
    // const product = products.find((p) => p._id === req.params.id)
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        // res.status(404).json({ message: 'Product not found' })
        res.status(404)
        throw new Error('Product not found')
    }

}))

export default router