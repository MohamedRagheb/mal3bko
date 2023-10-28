const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reviews', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    user_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    playground_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'playground',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(55),
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    postive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    evidance: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending','reviewed','vrefied',''),
      allowNull: false,
      defaultValue: "pending"
    }
  }, {
    sequelize,
    tableName: 'reviews',
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
        name: "playground_id",
        using: "BTREE",
        fields: [
          { name: "playground_Id" },
        ]
      },
      {
        name: "User_idD",
        using: "BTREE",
        fields: [
          { name: "sender" },
        ]
      },
      {
        name: "to_user",
        using: "BTREE",
        fields: [
          { name: "user_Id" },
        ]
      },
    ]
  });
};
