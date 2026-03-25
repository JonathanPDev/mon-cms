const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");
const { requireAuth } = require("../middlewares/auth.middleware");

router.get("/dashboard", requireAuth, dashboardController.dashboard);

module.exports = router;