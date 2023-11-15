# React - Practice

<div align="right">
  <h5>
    Language : 
    <a href="JP.md">日本語</a> 
      ,
    <a href="US.md">English</a> 
  </h5>
</div>
 
<h3>1. 데이터 베이스 정보 설정(amazon rds 사용)</h3>
<div align="center">
    <h6>
        <a href="retest/database.json">
            Node.js - database.json
        </a>
    </h6>
</div>

```
{
    "host":"kth-db.cd1kuc1cybf5.ap-northeast-2.rds.amazonaws.com",
    "user":"kth",
    "password":"xogns1234",
    "port":"3306",
    "database":"kth_db"
}
```

#

<h3>2. node.js서버 설정</h3>
<div align="center">
    <h6>
        <a href="retest/server.js">
           Node.js - server.js
        </a>
    </h6>
</div>

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

  .
  .
  .

```

#

<h3>3. node서버와 react서버를 동시에 실행 시켜줄 스크립트 생성</h3>
<div align="center">
    <h5>
        <a href="retest/package.json">
           Node.js - package.json
        </a>
    </h5>
</div>

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

<h3>4. React설정</h3>

<h5>　CORS(Cross Origin Resource Sharing)정책 위반 문제해결을 위해 proxy설정</h5>
<div align="center">
    <h6>
        <a href="retest/client/package.json">
            React - package.json
        </a>
    </h6>
</div>

```
  .
  .
  .

  "proxy": "http://localhost:5000/"
}
```

#

<h3>5. React</h3>

<h5>
    
 - react배포시 실제 서버에 배포되는 폴더가 public 폴더<br>
 
 - 가상 DOM을 위한 index.html파일이 존재(추가적인 url을 안붙이면 요청됨)
<br>
index.js에서 화면이 시작</h5>
<div align="center">
    <h6>
        <a href="retest/client/src/index.js">
            React - index.js
        </a>
    </h6>
</div>

```
  .
  .
  .

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
```

<h5>　App.js가 초기 컴포넌트</h5>

<div align="center">
    <h6>
        <a href="retest/client/src/App.js">
            React - App.js
        </a>
    </h6>
</div>

```
  .
  .
  .

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      users: ''
    }
  }
  setRefresh = () => {
    this.setState({users:''});
    this.callApi().then(res => this.setState({users: res}))
                    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.callApi().then(res => this.setState({users: res}))
                    .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/test');
    const body = await response.json();
    return body;
  }
  render(){
    return(
      
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>사진</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>내용</TableCell>
              <TableCell>삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.users ? this.state.users.map(c => { 
                return (
                <User 
                  setRefresh={this.setRefresh}
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  title={c.title}
                  contents={c.contents}
                />
                
                )
              }) : ""} 
          </TableBody>
        </Table>
        <UserAdd setRefresh={this.setRefresh}/>
      </div>
    );
  }
}

export default App;
```

<h5>　CRUD관련 컴포넌트</h5>

<div align="center">
    <h6>
        <a href="retest/client/src/component">
            React - components
        </a>
    </h6>
</div>

```
  .
  .
  .

class User extends React.Component{
   
    render() {
    
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="im"/></TableCell>
                <TableCell><h2>{this.props.title}</h2></TableCell>
                <TableCell><h2>{this.props.contents}</h2></TableCell>
                <TableCell><h2><UserDelete setRefresh={this.setRefresh} id={this.props.id}/></h2></TableCell>
            </TableRow>
      
        )
    }
}


export default User;
```
