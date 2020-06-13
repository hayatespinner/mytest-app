var express = require('express');
var app = express();
var mysql = require('mysql');
//フォームの値受け取りの定形文
app.use(express.urlencoded({extended: false}));

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
      res.render('index.ejs', { items: results});
    }
  );
});

//newを表示
app.get("/new", (req,res)=>{
  res.render("new.ejs");
});

//create機能
app.post('/create', (req, res) => {

  
  connection.query(

    //itemsにitemNameの値を入力
    "INSERT INTO items(name) VALUES (?)",
    [req.body.itemName],

    //リダイレクト、入力後のデータを出力
    (error, results) => {
      res.redirect("/index");
    }
  );
  
});

//delete機能
app.post("/delete/:id", (req, res) => {
  connection.query(
    "DELETE FROM items WHERE id=?",
    [req.params.id],
    (error, results) => {
      res.redirect("/index");
    }
  );
});

//編集画面
app.get("/edit/:id", (req, res) => {
  connection.query(
    "SELECT * FROM items WHERE id=?",
    [req.params.id],
    (error, results) => {
      res.render("edit.ejs", {item:results[0]});
    }
  );
});

app.listen(3000);