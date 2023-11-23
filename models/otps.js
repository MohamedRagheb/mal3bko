const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('otp-codes', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        type:{
            allowNull:false,
            type:DataTypes.STRING
        },
        user:{
            type:DataTypes.INTEGER,
            allowNull:false,
            unique:true,
            references: {
                model: "users",
                key: "id",
            },
        },
        code:{
          type:DataTypes.INTEGER,
          allowNull:false,
            unique:true
        },
            isExpierd: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue:0
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        }, {
        sequelize,
        tableName: 'otp-codes',
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
        ]
    });
};
