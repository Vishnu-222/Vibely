const express = require('express');
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router();

/**
 * @route /api/users/follow/:username
 * @description Follow a user via its username
 * @access Private
 */
userRouter.post("/follow/:username", identifyUser, userController.followUserController)

/** 
 * @route  /api/users/unfollow/:username
 * @description Unfollow a user via username
 * @access Private
 */
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)



module.exports = userRouter;