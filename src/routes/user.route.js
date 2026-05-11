const express = require('express');
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router();

/**
 * @route POST /api/users/follow/:username
 * @description Follow request sent a user via its username
 * @access Private
 */
userRouter.post("/follow/:username", identifyUser, userController.followUserController)

/**
 * @route GET /api/users/follow/requests
 * @description Get all pending follow requests
 * @access Private
 */
userRouter.get("/follow/requests", identifyUser, userController.getPendingFollowRequestsController)


/**
 * @route PATCH /api/users/follow/accept/:id
 * @description Accept follow request
 * @access Private
 */
userRouter.patch("/follow/accept/:id", identifyUser, userController.acceptFollowRequestController)

/**
 * @route DELETE /api/users/follow/reject/:id
 * @description Reject follow request
 * @access Private
*/
userRouter.delete("/follow/reject/:id", identifyUser, userController.rejectFollowRequestController)

/** 
 * @route  /api/users/unfollow/:username
 * @description Unfollow a user via username
 * @access Private
 */
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)

module.exports = userRouter;