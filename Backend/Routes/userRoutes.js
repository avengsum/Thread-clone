import express from 'express';
import { logoutUser, signupUser ,logoutUser,getUserProfile,updateUser,followUnfollowUser} from '../controllers/UserController';
import protectRoute from '../middlewares/protectRoute';

const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.post('/signup',signupUser)
router.post('/login',loginUser)
router.post('/logout',logoutUser)
router.post('follow/:id',protectRoute,followUnfollowUser)
router.post("/update/:id", protectRoute, updateUser);

export default router;