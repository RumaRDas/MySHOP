import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleWare.js'


dotenv.config()

connectDB()
const app = express()

app.get('/', (req, res) => {
    res.send('API is Running........')
})
app.use('/api/products', productRoutes)
//For handling error 404  getting json responces in development mode
app.use(notFound)

//For handling error 500  getting json responces in development mode
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))