exports.handler = (req, res) => {
  res.send("This is home pages!");
  console.log(req.app.locals.title);
};
