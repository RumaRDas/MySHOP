import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleWare.js'


dotenv.config()

connectDB()
const app = express()
//allowing json data in the body middleware
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is Running........')
})
//for Product routes
app.use('/api/products', productRoutes)

//For getting users Routes 
app.use('/api/users', userRoutes)

//For getting Ordera Routes 
app.use('/api/orders', orderRoutes)

// For getting paypal server
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

//For handling error 404  getting json responces in development mode
app.use(notFound)

//For handling error 500  getting json responces in development mode
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))