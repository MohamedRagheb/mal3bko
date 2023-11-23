require('dotenv').config();

const  mysql2 = require("mysql2") ;

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    process.env.DATABASE_Name ,
  process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOStNAME,
      dialectModule: mysql2,
      dialect: "mysql",
      port: 3306,
      pool: {
          max: 15,
          min: 5,
          idle: 20000,
          evict: 15000,
          acquire: 30000
      },
  }
);
module.exports = sequelize;
