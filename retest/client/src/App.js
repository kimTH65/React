
import './App.css';
import User from './component/User';
import UserAdd from './component/UserAdd';
import Table from '@material-ui/core/Table';
import TableHead  from '@material-ui/core/TableHead';
import TableBody  from '@material-ui/core/TableBody';
import TableRow  from '@material-ui/core/TableRow';
import TableCell  from '@material-ui/core/TableCell';
import React from 'react';



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
