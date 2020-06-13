var express = require('express');
var app = express();

//// CSSや画像ファイルを置くフォルダを指定する部分
app.use(express.static('public'));

//topを表示
app.get("/", (req,res)=>{
  res.render("top.ejs");
});

//indexを表示
app.get("/index", (req,res)=>{
  res.render("index.ejs");
});

// サーバーを起動する部分（＊固定）
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});