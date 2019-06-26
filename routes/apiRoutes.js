var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.high_scoresDB.findAll({}).then(function(dbhigh_scoresDB) {
      res.json(dbhigh_scoresDB);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.high_scoresDB.create(req.body).then(function(dbhigh_scoresDB) {
      res.json(dbhigh_scoresDB);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.high_scoresDB.destroy({ where: { id: req.params.id } }).then(function(dbhigh_scoresDB) {
      res.json(dbhigh_scoresDB);
    });
  });
};
