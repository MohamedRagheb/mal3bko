const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "users",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nickname: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: "test",
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "roles",
          key: "id",
        },
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      favPLayGrounds: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      friend_req: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      friends: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      block: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      intersting_pg: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      intersting_users: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      img: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      sports_played: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
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
          name: "test",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "username" },
          ]
        },
        {
          name: "role",
          using: "BTREE",
          fields: [
            { name: "role" },
          ]
        },
      ]
    }
  );
};
