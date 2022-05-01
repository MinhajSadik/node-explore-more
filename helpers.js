exports.handler = (req, res) => {
  console.log(admin.mountpath);
  res.send("welcome to admin dashboard!");
};

exports.routerPost = (req, res) => {
  console.log(req.body.name);
  res.send("This Is Home Page with Post Request");
};

exports.routerGet = (req, res) => {
  res.send("This is home pages!");
};

exports.routerAll = (req, res) => {
  res.send("Hello");
};
