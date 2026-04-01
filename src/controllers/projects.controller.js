const Project = require("../models/Project");

function slugify(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

async function getUserProjects(req, res) {
  try {
    const userId = req.session.user.id;

    const projects = await Project.find({ userId }).sort({ updatedAt: -1 });

    res.render("pages/projects", {
      title: "Dashboard",
      layout: "layouts/site",
      pageCss: ["dashboard.css", "mediaquery.css"],
      pageJs: "script.js",
      showDashboardLayout: true,
      topbarTitle: "Mes projets",
      topbarActions: ["new-project"],
      projects
    });
  } catch (error) {
    console.error("Erreur récupération projets :", error);
    res.status(500).send("Erreur serveur");
  }
}

async function createProject(req, res) {
  try {
    const userId = req.session.user.id;
    const name = req.body.name?.trim();

    if (!name) {
      return res.status(400).send("Le nom du projet est obligatoire.");
    }

    const slug = slugify(name);

    const existingProject = await Project.findOne({ userId, slug });

    if (existingProject) {
      return res.status(400).send("Un projet avec ce nom existe déjà.");
    }

    const project = await Project.create({
      userId,
      name,
      slug
    });

    res.redirect(`/editor/${project._id}`);
  } catch (error) {
    console.error("Erreur création projet :", error);
    res.status(500).send("Erreur serveur");
  }
}

async function getProjectById(req, res) {
  try {
    const userId = req.session.user.id;
    const projectId = req.params.id;

    const project = await Project.findOne({
      _id: projectId,
      userId
    });

    if (!project) {
      return res.status(404).send("Projet introuvable.");
    }

    res.render("pages/projects", {
      title: project.name,
      project
    });
  } catch (error) {
    console.error("Erreur récupération projet :", error);
    res.status(500).send("Erreur serveur");
  }
}

module.exports = {
  getUserProjects,
  createProject,
  getProjectById
};