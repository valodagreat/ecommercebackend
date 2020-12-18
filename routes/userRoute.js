import express from 'express';
import { authUser, createUsers, getUserProfile, updateUserProfile } from '../controllers/Users.js';
import { protect } from '../middlewares/auth.js';
const router = express.Router();

router.route('/').post(createUsers);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);



export default router;