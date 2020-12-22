import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoute from './routes/productRoute.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import userRoute from './routes/userRoute.js'
import { errorHandler, notFound } from './middlewares/error.js';
dotenv.config()

connectDB();
const app = express();

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send(`It's working`);
});
app.use('/api/products', productRoute )
app.use('/api/users', userRoute )
app.use('/api/orders', orderRoutes )
app.use('/api/upload', uploadRoutes )

app.get('/api/config/paypal', (req, res)=> {
    res.send(process.env.PAYPAL_CLIENT_ID);
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound);

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`App is listening in ${process.env.NODE_ENV} mode on port ${PORT}!`.yellow.bold);
});