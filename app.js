var express = require('express');
var app = express();

// HTTPリクエストを受け取る部分
app.get('/', (req, res) => {
  res.render("hello.ejs");
});

//topを表示
app.get("/top", (req,res)=>{
  res.render("top.ejs");
});

// サーバーを起動する部分
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});