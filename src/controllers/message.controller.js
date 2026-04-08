function renderMessage(req, res) {
  res.render("pages/message", {
    title: "Messagerie",
    pageJs: ["script.js", "dashboard.js", "messagerie.js"],
    showDashboardLayout: true,
    pageCss: ["dashboard.css", "mediaquery.css", "message.css"],
    topbarTitle: "Messagerie",
  });
}

module.exports = { renderMessage };