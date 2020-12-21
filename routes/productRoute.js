import express from 'express';
import { admin, protect } from '../middlewares/auth.js';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/Product.js';
const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);

router.route('/:id').get(getProduct).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);

export default router;