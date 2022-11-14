const Sequelize = require("sequelize");

const sequelize = new Sequelize("purple_pay", "paruljuniwal", "", {
  host: "localhost",
  dialect:
    "postgres" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

module.exports = sequelize;


// const Sequelize = require('sequelize');
// const pg = require('pg');

// module.exports.init = function(callback) {
//     var dbName = 'purple_pay',
//         username = 'postgres',
//         password = '',
//         host = 'localhost'

//     var conStringPri = 'postgres://' + username + ':' + password + '@' + host + '/postgres';
//     var conStringPost = 'postgres://' + username + ':' + password + '@' + host + '/' + dbName;

//     // connect to postgres db
//     pg.connect(conStringPri, function(err, client, done) { 
//         // create the db and ignore any errors, for example if it already exists.
//         client.query('CREATE DATABASE ' + dbName, function(err) {
//             //db should exist now, initialize Sequelize
//             var sequelize = new Sequelize(conStringPost);
//             callback(sequelize);
//             client.end(); // close the connection
//         });
//     });
// };

// const { Pool, Client } = require('pg')
// const pool = new Pool({
//     user: 'paruljuniwal',
//     host: 'localhost',
//     database: 'postgres',
//     password: '',
//     port: 5432,
//   })

// module.exports = pool;
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
