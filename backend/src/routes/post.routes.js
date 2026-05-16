const express = require("express");
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware");

const postRouter = express.Router();

/**
 * @route /api/posts/ [protected] -- POST METHOD
 * @description to create a post for the user who request
 * - req.body = { caption , image-file }
 */
postRouter.post("/" , upload.single("image"), identifyUser ,postController.createPostController);

/**
 * @route /api/posts/ [protected] -- GET METHOD
 * @description to get all the post created by the user who request 
 */
postRouter.get("/", identifyUser , postController.getPostController);

/**
 * @route /api/posts/details/:postid  -- GET METHOD
 * @description return an detail about specific post with the id. Also check whether the post belongs to the user that the request come from
 */
postRouter.get("/details/:postId", identifyUser , postController.getPostDetailsController);

/**
 * @route  /api/posts/like/:postid -- POST METHOD
 * @description like a post with the id provided in the request params. 
 */
postRouter.post("/like/:postId", identifyUser, postController.likePostController)

/**
 * @route GET /api/posts/feed
 * @description get all the post created in the DB
 * @access private
 */
postRouter.get("/feed",identifyUser,postController.getFeedController)


module.exports = postRouter;