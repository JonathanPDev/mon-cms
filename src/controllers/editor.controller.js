const Project = require("../models/Project");

async function editor(req, res) {
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

    res.render("pages/editor", {
      layout: "layouts/editor",
      title: `Éditeur - ${project.name}`,
      project
    });
  } catch (error) {
    console.error("Erreur ouverture éditeur :", error);
    res.status(500).send("Erreur serveur");
  }
}

module.exports = { editor };