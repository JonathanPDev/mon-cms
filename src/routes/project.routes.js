const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projects.controller");
const { requireAuth } = require("../middlewares/auth.middleware");

router.get("/projects", requireAuth, projectController.getUserProjects);
router.post("/projects", requireAuth, projectController.createProject);
router.get("/projects/:id", requireAuth, projectController.getProjectById);

module.exports = router;