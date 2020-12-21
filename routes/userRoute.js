import express from 'express';
import { authUser, createUsers, deleteUser, getUserById, getUserProfile, getUsers, updateUserAdmin, updateUserProfile } from '../controllers/Users.js';
import { admin, protect } from '../middlewares/auth.js';
const router = express.Router();

router.route('/').post(createUsers).get(protect, admin, getUsers);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUserAdmin)



export default router;