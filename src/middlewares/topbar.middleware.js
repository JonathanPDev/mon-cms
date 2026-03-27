module.exports = (req, res, next) => {
  res.locals.topbarTitle = "Dashboard";
  res.locals.topbarActions = [];
  next();
};