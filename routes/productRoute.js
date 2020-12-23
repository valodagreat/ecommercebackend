import express from 'express';
import { admin, protect } from '../middlewares/auth.js';
import { addReview, createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/Product.js';
const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);

router.route('/:id').get(getProduct).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);

router.route('/:id/reviews').post(protect, addReview )

export default router;