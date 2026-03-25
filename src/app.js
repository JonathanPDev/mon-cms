const path = require("path");
const express = require("express");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const { MongoStore } = require("connect-mongo");

const webRoutes = require("./routes/web.routes");
const authRoutes = require("./routes/auth.routes");
const editorRoutes = require("./routes/editor.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const projectRoutes = require("./routes/project.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layouts/site");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.pageCss = null;
  res.locals.pageJs = null;
  res.locals.title = "Mon CMS";
  res.locals.showDashboardLayout = false;
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/", webRoutes);
app.use("/", authRoutes);
// app.use("/", editorRoutes);
app.use("/", dashboardRoutes);
app.use("/", projectRoutes);
app.use(editorRoutes);

module.exports = app;