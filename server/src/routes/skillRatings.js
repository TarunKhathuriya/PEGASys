const express = require("express");
const skillRatingController = require("../controllers/skillRatings");
const router = express.Router();
const authorize = require('../_helpers/authorize')

router.get("/all/:id", authorize.authenticateJWT, authorize.verifyUser, skillRatingController.fetchAllUsersBySkill);
router.get("/user/all/:id", authorize.authenticateJWT, authorize.verifyUser, skillRatingController.fetchAllRatingsByUser);
router.get("/user/:to/:from", authorize.authenticateJWT, authorize.verifyUser, skillRatingController.fetchRatingsGivenByUserToUser);
router.get("/:from/:skillId", authorize.authenticateJWT, authorize.verifyUser, skillRatingController.fetchRatingsGivenByUserBySkill);
router.post("/addRatings", authorize.authenticateJWT, authorize.verifyUser, skillRatingController.addRatings);
router.get("/compare/:id", authorize.authenticateJWT, authorize.verifyAdmin, skillRatingController.compareSelfWithActual);
router.post("/deleteSkill", authorize.authenticateJWT, authorize.verifyUser, skillRatingController.deleteRatings);
module.exports = router;