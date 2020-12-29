const express = require("express");
const skillDeparmentsController = require("../controllers/skillDepartments");
const router = express.Router();
const authorize = require('../_helpers/authorize')

router.get("/all", authorize.authenticateJWT, authorize.verifyUser, skillDeparmentsController.fetchAllSkillDepartments);
router.get("/:id", authorize.authenticateJWT, authorize.verifyUser, skillDeparmentsController.fetchSkillDepartmentById);
router.post("/addSkillDepartment", authorize.authenticateJWT, authorize.verifyManager, skillDeparmentsController.addSkillDepartment);
router.delete("/deleteSkillDepartment/:id", authorize.authenticateJWT, authorize.verifyManager, skillDeparmentsController.deleteSkillDepartment);
router.put("/updateSkillDepartment/:id", authorize.authenticateJWT, authorize.verifyManager, skillDeparmentsController.updateSkillDepartment);

module.exports = router;