import express from 'express'
const router = express.Router()
import { getProducts, getProductById, deleteProductById, updateProduct, createProduct, createProductReview } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

//Products route
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)

router.route('/:id').get(getProductById).delete(protect, admin, deleteProductById).put(protect, admin, updateProduct)

export default router