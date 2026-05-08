const express = require("express");
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

const postRouter = express.Router();

/**
 * @route /api/posts/ [protected] -- POST METHOD
 * @description to create a post for the user who request
 * - req.body = { caption , image-file }
 */
postRouter.post("/" , upload.single("image"), postController.createPostController);

/**
 * @route /api/posts/ [protected] -- GET METHOD
 * @description to get all the post created by the user who request 
 */
postRouter.get("/", postController.getPostController);

/**
 * @route /api/posts/details/:postid  -- GET METHOD
 * @description return an detail about specific post with the id. Also check whether the post belongs to the user that the request come from
 */
postRouter.get("/details/:postId", postController.getPostDetailsController);


module.exports = postRouter;