// const express = require('express');
// const app = express();
//
// const mysql = require('mysql');
// const bodyParser = require('body-parser');
//
// app.use(bodyParser.json({type:'application/json'}));
// app.use(bodyParser.urlencoded({extended:true}));
//
// const con = mysql.createConnection({
//   host: '127.0.0.1',
//   port: '3306',
//   user: 'root',
//   password: '[Peratha1998!]',
//   database: 'rezeipt',
//   multipleStatements: true
// });
//
// const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Listening on port ${port}..`));
//
// con.connect(function(error){
//   if(error) console.log(error);
//   else console.log("connected");
// });
//
// app.get('/users', function(req, res){
//   con.query('SELECT * FROM users', function(error, rows, fields){
//
//     if(error) console.log(error);
//
//     else{
//       console.log(rows);
//       res.send(rows);
//     }
//   });
// });
