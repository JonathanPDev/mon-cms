function home(req, res) {
  res.render("pages/home", {
    title: "Accueil",
    pageJs: "modal.js",
  });
}

module.exports = { home };