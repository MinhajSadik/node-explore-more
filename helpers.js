exports.handler = (req, res) => {
  console.log(req.app.get("view engine"));
  // console.log(req.route);
  // console.log(req.baseUrl);
  res.send("welcome to admin dashboard!");
};

exports.routerPost = (req, res) => {
  console.log(req.body.name);
  res.send("This Is Dashboard Page!");
};

exports.routerGet = (req, res) => {
  res.send("This is home pages!");
};

exports.routerAll = (req, res) => {
  res.send("Hello");
};
