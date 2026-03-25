const express = require("express");
const router = express.Router();
const editorController = require("../controllers/editor.controller");
const { requireAuth } = require("../middlewares/auth.middleware");

router.get("/editor/:id", requireAuth, editorController.editor);

module.exports = router;