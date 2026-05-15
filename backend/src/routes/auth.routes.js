const express = require("express");
const authController = require("../controllers/auth.controller")
const identifyUser = require("../middlewares/auth.middleware")

const authRouter = express.Router();

/**
 * @route /api/auth/register  -- POST METHOD
 * @description to register the user in DB and generate token & store token in cookie when user register on server for first time
 */
authRouter.post("/register", authController.registerController);

/**
 * @route /api/auth/login  -- POST METHOD
 * @description to logged in user with email/username and password authentication
 */
authRouter.post("/login", authController.loginController);

/**
 * @route  /api/auth/get-me
 * @desc Get the currently logged in user's information
 * @access Private
 */
authRouter.get("/get-me", identifyUser, authController.getMeController)

module.exports = authRouter;
