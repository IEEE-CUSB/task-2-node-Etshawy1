var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Workshops'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});


app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
})

app.get('/success', function(req, res){
  res.sendFile(__dirname+'/success.html');
})

app.post('/', urlencodedParser, function (req, res) {
    console.log(req.body);
    let stmt = `INSERT INTO registrant(name, email, phone, university,	faculty,	year,	first_pref,	second_pref)
    VALUES(?,?,?,?,?,?,?,?)`;
    let registerant = [req.body.name , req.body.email, req.body.phone, req.body.university, 
      req.body.faculty, req.body.year? req.body.year : "other", req.body.pre1, req.body.pre2];
    connection.query(stmt, registerant, (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
    });
    return res.redirect('/success');
    //res.end();
    //res.redirect(302, __dirname+'/success.html');

  })

app.listen(3000);

