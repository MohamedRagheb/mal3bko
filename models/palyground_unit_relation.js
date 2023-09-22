const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('palyground_unit_relation', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    playground_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'playground',
        key: 'id'
      }
    },
    unitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'units',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'palyground_unit_relation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "palyGround",
        using: "BTREE",
        fields: [
          { name: "playground_id" },
        ]
      },
      {
        name: "unitPlayGroundUnitRelation",
        using: "BTREE",
        fields: [
          { name: "unitId" },
        ]
      },
    ]
  });
};
