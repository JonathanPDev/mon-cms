const Project = require("../models/Project");

async function dashboard(req, res) {
  try {
    const userId = req.session.user.id;

    const projects = await Project.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(3);

    res.render("pages/dashboard", {
      layout: "layouts/site",
      title: "Dashboard",
      pageCss: "dashboard.css",
      pageJs: "script.js",
      showDashboardLayout: true,
      projects
    });
  } catch (error) {
    console.error("Erreur dashboard :", error);
    res.status(500).send("Erreur serveur");
  }
}

module.exports = { dashboard };