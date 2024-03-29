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

//@des DELETE A PRODUCT
//@route DELETE /api/products/:id
//@access private/admin
const deleteProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    // if admin createor only can delete product we need to check 
    //(if(req.user._id===product.user._id))

    //any admin can delete any product
    if (product) {
        await product.remove()
        res.json({ message: "Product removed" })
    } else {
        // res.status(404).json({ message: 'Product not found' })
        res.status(404)
        throw new Error('Product not found')
    }
})

//@des CREATE A PRODUCT
//@route POST/api/products
//@access private/admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Barnd',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//@des UPDATE A PRODUCT
//@route PUT/api/products/:id
//@access private/admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product Not found')
    }

})

//@des CREATE a new review
//@route POST/api/products/:id/reviews
//@access private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.tostring() === user._id.tostring())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product Not found')
    }

})
export {
    getProducts,
    getProductById,
    deleteProductById,
    createProduct,
    updateProduct,
    createProductReview
}
