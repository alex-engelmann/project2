module.exports = function(sequelize, DataTypes) {
  var Score = sequelize.define("Score", {
    name: {
      type: DataTypes.STRING,
      allowNull: false},
    score: {
      type: DataTypes.STRING
    }
    
  });
  return Score;
};
