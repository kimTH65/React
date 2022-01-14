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

app.get('/test', (req, res) => {
    connection.query(
        "select * from TEST",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.use('/image', express.static('./upload'));
app.post('/api/User', upload.single('image'),(req,res) =>{
    let sql = 'insert into TEST values(null, ?, ?, ?)';
    let image = '/image/' + req.file.filename;
    let title = req.body.title;
    let contents = req.body.contents;
    let params = [image, title, contents];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
        }
    );
})
app.delete('/api/userDel/:id',(req,res) => {
    let sql = "delete from TEST where id = ?";
    let params = [req.params.id];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
        }
    );


});

app.listen(port, () => {
    console.log(`Server On ${port}`);
})