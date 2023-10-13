const models = require("../models/init-models");
function getAlldataFromModal(modal, asscoctions, attributes, exclude) {
  return models[modal].findAll({
    include: asscoctions,
    attributes: !exclude ? attributes : { exclude },
    exclude: exclude,
  });
}
function getAlldataFromModalWhere(
  modal,
  asscoctions,
  attributes,
  exclude,
  where
) {
  return models[modal].findAll({
    include: asscoctions,
    attributes: !exclude ? attributes : { exclude },
    where: where,
    exclude: exclude,
  });
}
function findOneFromModel(modal, asscoctions, attributes, exclude, where) {
  return models[modal].findOne({
    attributes: !exclude ? attributes : { exclude },
    where: where,
  });
}
function updateRowInModal(modal, updatedValue, where) {
  return models[modal].update(updatedValue, { where });
}
function createRowInModal(modal, data) {
  return models[modal].create({ ...data });
}
module.exports = {
  getAlldataFromModal,
  findOneFromModel,
  updateRowInModal,
  createRowInModal,
  getAlldataFromModalWhere,
};
