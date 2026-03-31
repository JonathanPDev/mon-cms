const User = require("../models/User");

async function renderUserInfos(req, res) {
  try {
    const currentUser = await User.findById(req.session.user._id).lean();

    return res.render("pages/infosUser", {
      title: "Mes infos",
      pageCss: ["dashboard.css", "infoUser.css"],
      pageJs: ["script.js",  "infosUser.js"],
      showDashboardLayout: true,
      topbarTitle: "Mes infos",
      topbarActions: [],
      currentUser
    });
  } catch (error) {
    console.error("Erreur renderUserInfos :", error);
    return res.status(500).send("Erreur serveur");
  }
}

module.exports = {
  renderUserInfos
};