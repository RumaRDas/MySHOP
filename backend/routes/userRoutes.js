import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, registerUser, updateUserProfile, getUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
//UserRoutes
router.route('/').post(registerUser).get(protect, admin, getUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)


export default router