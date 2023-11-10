var DataTypes = require("sequelize").DataTypes;
const sequelize = require("../config/db_data.js");

var _Texts = require("./Texts");
var _palyground_media = require("./palyground_media");
var _palyground_unit_relation = require("./palyground_unit_relation");
var _palyground_userInterestReplation = require("./palyground_userInterestReplation");
var _playground = require("./playground");
var _playground_mangment_relation = require("./playground_mangment_relation");
var _reviews = require("./reviews");
var _roles = require("./roles");
var _sports = require("./sports");
var _units = require("./units");
var _users = require("./users");
var _otps = require("./otps");

function initModels(sequelize) {
  var Texts = _Texts(sequelize, DataTypes);
  var palyground_media = _palyground_media(sequelize, DataTypes);
  var palyground_unit_relation = _palyground_unit_relation(
    sequelize,
    DataTypes
  );
  var palyground_userInterestReplation = _palyground_userInterestReplation(
    sequelize,
    DataTypes
  );
  var playground = _playground(sequelize, DataTypes);
  var playground_mangment_relation = _playground_mangment_relation(
    sequelize,
    DataTypes
  );
  var reviews = _reviews(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var sports = _sports(sequelize, DataTypes);
  var units = _units(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var otps = _otps(sequelize, DataTypes);

  palyground_media.belongsTo(playground, {
    as: "playground",
    foreignKey: "playground_id",
  });
  playground.hasMany(palyground_media, {
    as: "palyground_media",
    foreignKey: "playground_id",
  });
  palyground_unit_relation.belongsTo(playground, {
    as: "playground",
    foreignKey: "playground_id",
  });
  playground.hasMany(palyground_unit_relation, {
    as: "palyground_unit_relations",
    foreignKey: "playground_id",
  });
  palyground_userInterestReplation.belongsTo(playground, {
    as: "playground",
    foreignKey: "playground_id",
  });
  playground.hasMany(palyground_userInterestReplation, {
    as: "palyground_userInterestReplations",
    foreignKey: "playground_id",
  });
  playground_mangment_relation.belongsTo(playground, {
    as: "playground",
    foreignKey: "playground_id",
  });
  playground.hasMany(playground_mangment_relation, {
    as: "playground_mangment_relations",
    foreignKey: "playground_id",
  });
  reviews.belongsTo(playground, {
    as: "playground",
    foreignKey: "playground_Id",
  });
  playground.hasMany(reviews, { as: "reviews", foreignKey: "playground_Id" });
  users.belongsTo(roles, { as: "roles", foreignKey: "role" });
  roles.hasMany(users, { as: "users", foreignKey: "role" });
  palyground_unit_relation.belongsTo(units, {
    as: "unit",
    foreignKey: "unitId",
  });
  units.hasMany(palyground_unit_relation, {
    as: "palyground_unit_relations",
    foreignKey: "unitId",
  });
  playground.belongsTo(units, { as: "unit_unit", foreignKey: "unit" });
  units.hasMany(playground, { as: "playgrounds", foreignKey: "unit" });
  palyground_userInterestReplation.belongsTo(users, {
    as: "user",
    foreignKey: "user_id",
  });
  users.hasMany(palyground_userInterestReplation, {
    as: "palyground_userInterestReplations",
    foreignKey: "user_id",
  });
  playground_mangment_relation.belongsTo(users, {
    as: "user",
    foreignKey: "user_id",
  });
  users.hasMany(playground_mangment_relation, {
    as: "playground_mangment_relations",
    foreignKey: "user_id",
  });
  reviews.belongsTo(users, { as: "user", foreignKey: "user_Id" });
  users.hasMany(reviews, { as: "reviews", foreignKey: "user_Id" });
  reviews.belongsTo(users, { as: "sender_user", foreignKey: "sender" });
  users.hasMany(reviews, { as: "sender_reviews", foreignKey: "sender" });
  sports.belongsTo(users, { as: "creator", foreignKey: "creator_id" });
  users.hasMany(sports, { as: "sports", foreignKey: "creator_id" });
  otps.belongsTo(users, { as: "for", foreignKey: "user" });
  users.hasOne(otps, { as: "otp", foreignKey: "id" });

  return {
    Texts,
    palyground_media,
    palyground_unit_relation,
    palyground_userInterestReplation,
    playground,
    playground_mangment_relation,
    reviews,
    roles,
    sports,
    units,
    users,
    otps,
  };
}
const models = initModels(sequelize);
module.exports = models;
// module.exports.initModels = initModels;
// module.exports.default = initModels;
