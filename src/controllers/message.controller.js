function message(req, res) {
  res.render("pages/message", {
    title: "Message",
    pageJs: "script.js",
    showDashboardLayout: true,
    pageCss: ["dashboard.css", "mediaquery.css", "message.css"],
    topbarTitle: "Message",
  });
}

module.exports = { message };