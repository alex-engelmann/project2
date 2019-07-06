module.exports = function(sequelize, DataTypes) {
  var Score = sequelize.define("Score", {
    name: {
      type: DataTypes.STRING,
      notNull: true},
    score: {
      type: DataTypes.STRING
    }
    
  });
  return Score;
};
