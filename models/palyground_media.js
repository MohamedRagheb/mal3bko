const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('palyground_media', {
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
    path: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    craeted_at: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "image"
    }
  }, {
    sequelize,
    tableName: 'palyground_media',
    timestamps: true,
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
        name: "playground_attach",
        using: "BTREE",
        fields: [
          { name: "playground_id" },
        ]
      },
    ]
  });
};
