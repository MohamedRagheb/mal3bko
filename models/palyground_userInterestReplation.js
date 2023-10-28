const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('palyground_userInterestReplation', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    playground_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'playground',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'palyground_userInterestReplation',
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
        name: "playground",
        using: "BTREE",
        fields: [
          { name: "playground_id" },
        ]
      },
      {
        name: "user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
