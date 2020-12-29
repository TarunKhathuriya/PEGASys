const express = require("express");
const timeSheetController = require("../controllers/timesheets");
const router = express.Router();
const authorize = require('../_helpers/authorize')

router.get("/all/:id", authorize.authenticateJWT, authorize.verifyUser, timeSheetController.fetchAllTimeSheetByUserId);
router.post("/addTimeSheet", authorize.authenticateJWT, authorize.verifyUser, timeSheetController.addTimeSheet);
router.post("/all/mentees/:id", authorize.authenticateJWT, authorize.verifyMentor, timeSheetController.getTimeSheetsByMentees);
router.post("/all/projects", authorize.authenticateJWT, authorize.verifyManager, timeSheetController.getTimeSheetsByProjects);
router.post(
  "/user/day/:id", authorize.authenticateJWT, authorize.verifyUser,
  timeSheetController.fetchAllTimeSheetsByUserIdByDay
);
router.post("/approve/day/:id", authorize.authenticateJWT, authorize.verifyMentor, timeSheetController.approveTimeSheetForDay);
router.post("/approve/:id", authorize.authenticateJWT, authorize.verifyMentor, timeSheetController.approveTimeSheet);
router.post("/addMultiple", authorize.authenticateJWT, authorize.verifyUser, timeSheetController.addMultipleTimeSheets);
router.get("/all/project/:id", authorize.authenticateJWT, authorize.verifyManager, timeSheetController.getTimeSheetsByProject);
router.post(
  "/project/day/:id",
  authorize.authenticateJWT, authorize.verifyManager,
  timeSheetController.getTimeSheetsByProjectByDate
);
router.post(
  "/project/dateRange/:id",
  authorize.authenticateJWT, authorize.verifyManager,
  timeSheetController.getTimeSheetsByProjectByDateRange
);
router.post(
  "/editTimeSheets",
  authorize.authenticateJWT, authorize.verifyUser,
  timeSheetController.editTimeSheets
);
router.post(
  "/deleteTimeSheets",
  authorize.authenticateJWT, authorize.verifyUser,
  timeSheetController.deleteTimeSheets
);
router.post(
  "/user/dateRange/:id",
  authorize.authenticateJWT, authorize.verifyUser,
  timeSheetController.getTimeSheetsByUserByDateRange
);
router.post(
  "/user/project/dateRange/:id",
  authorize.authenticateJWT, authorize.verifyUser,
  timeSheetController.getTimeSpentByUser
);
router.post("/all/project/dateRange", authorize.authenticateJWT, authorize.verifyAdmin, timeSheetController.getTimeSpentByOrg);
router.get("/all", authorize.authenticateJWT, authorize.verifyAdmin, timeSheetController.fetchAllTimeSheets);
module.exports = router;