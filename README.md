# React,Node.js - Practice

<h3>1. Node.js(express)서버 설정</h3>

<h5>데이터 베이스 정보(amazon rds 사용)</h5>
<h6>　retest/database.json</h6>

```
{
    "host":"kth-db.cd1kuc1cybf5.ap-northeast-2.rds.amazonaws.com",
    "user":"kth",
    "password":"xogns1234",
    "port":"3306",
    "database":"kth_db"
}
```

<br>
<h5>node.js서버 설정</h5>
<h6>　retest/server.js</h6>

```
const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const multer = require('multer');

const upload = multer({dest:'./upload'});

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

app.get('/', (req, res) => {
    res.send('complate');
})

...
```

<br>

<br>
<h5>node서버와 react서버를 동시에 실행 시켜줄 스크립트 생성</h5>
<h6>　retest/package.json</h6>

```
{
    "name": "user",
    "version": "1.0.0",
    "scripts": {
        "client": "cd client && yarn start",
        "server": "nodemon server.js",
        "dev": "concurrently \"yarn server\" \"yarn client\""
    },
    "dependencies": {
        "body-parser": "^1.19.0",
        "concurrently": "^6.2.0",
        "express": "^4.17.1",
        "multer": "^1.4.2",
        "mysql": "^2.18.1"
    }
}
```


#
