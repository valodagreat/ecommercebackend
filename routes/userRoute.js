import express from 'express';
import { authUser, createUsers, getUserProfile, getUsers, updateUserProfile } from '../controllers/Users.js';
import { admin, protect } from '../middlewares/auth.js';
const router = express.Router();

router.route('/').post(createUsers).get(protect, admin, getUsers);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);



export default router;