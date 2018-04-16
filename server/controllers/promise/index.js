import express from "express";
import user from "./user";
import mutualFriend from "./mutualFriend";
const router = express.Router();
router.get("/api/user/:username", user);
router.get("/api/mutualfriends/:userId/:friendUserId", mutualFriend);

export default router;
