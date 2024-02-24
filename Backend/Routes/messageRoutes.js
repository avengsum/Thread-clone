import express from "express";
import protectRoute from "../middlewares/protectRoute";
import { sendMessage , getConversations ,getMessage } from "../controllers/messageController";

const router = express.Router();

router.post("/",protectRoute,sendMessage);
router.get("/:otherUserId",protectRoute,getMessage);
router.get('/conversations',protectRoute,getConversations);
