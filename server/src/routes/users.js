const express = require("express");
const usersController = require("../controllers/users");
const router = express.Router();
const authorize = require('../_helpers/authorize')

router.post('/loginUser', usersController.loginUser); // public route
router.get("/all", authorize.authenticateJWT, authorize.verifyUser, usersController.fetchAllUsers);
router.get("/:id", usersController.fetchUserById);
router.get("/all/deleted", authorize.authenticateJWT, authorize.verifyAdmin, usersController.fetchAllDeletedUsers);
router.post("/addUser", authorize.authenticateJWT, authorize.verifyAdmin, usersController.addUser);
router.post("/deleteUser", authorize.authenticateJWT, authorize.verifyAdmin, usersController.deleteUserById);
router.post("/updateUser/:id", authorize.authenticateJWT, authorize.verifyUser, usersController.updateUserById);
router.post("/loginUser", usersController.loginUser);
router.post("/getMentees", authorize.authenticateJWT, authorize.verifyMentor, usersController.getMentees);

module.exports = router;