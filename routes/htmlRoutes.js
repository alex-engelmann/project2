var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Score.findAll({}).then(function (high_scoresDB) {
      res.render("index", {
        msg: "Welcome!",
        examples: high_scoresDB
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Score.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (high_scoresDB) {
      res.render("example", {
        example: high_scoresDB
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};