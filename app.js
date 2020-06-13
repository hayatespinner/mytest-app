var express = require('express');
var app = express();
var mysql = require('mysql');

//// CSSや画像ファイルを置くフォルダを指定する部分
app.use(express.static('public'));

//mysqlの接続情報
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '881010',
  database: 'progate'
});

//エラーの時の表示
connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});



//topを表示
app.get("/", (req,res)=>{
  res.render("top.ejs");
});

//indexを表示
app.get('/index', (req, res) => {
  // データベースからデータを取得する処理
  connection.query(
    "SELECT * FROM items",
    (error, results) => {
      console.log(results);
      res.render('index.ejs');
    }
  );
});

app.listen(3000);