function renderMessage(req, res) {
  res.render("pages/message", {
    title: "Messagerie",
    pageJs: ["script.js", "dashboard.js", "messagerie.js"],
    showDashboardLayout: true,
    pageCss: ["global.css", "newDashboard.css" , "mediaquery.css", "message.css"],
    topbarTitle: "Message",
  });
}

module.exports = { renderMessage };