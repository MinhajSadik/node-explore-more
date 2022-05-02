const name = ["a", "b", "c", [1, 2, 3], { name: "Sharminhaj" }];
exports.handler = (req, res) => {
  console.log(req.app.get("view engine"));
  // console.log(req.route);
  // console.log(req.baseUrl);
  // res.status(200).send("Admin dashboard");
  // res.sendStatus(200);
  res.send("welcome to admin dashboard!");
  // res.json(name);
  // res.cookie("cupple", "Sharminhaj", {
  //   maxAge: 1000 * 60 * 60 * 24 * 7,
  //   httpOnly: true,
  // });
  // res.redirect("/home");
  // res.set("CuppleName", "Sharminhaj");
  // res.get("CuppleName");
  // res.end();
};

exports.routerPost = (req, res) => {
  console.log(req.body.name);
  res.send("This Is Dashboard Page!");
};

exports.routerGet = (req, res) => {
  res.send("This is HOME pages!");
};

exports.routerAll = (req, res) => {
  res.send("Hello");
};
