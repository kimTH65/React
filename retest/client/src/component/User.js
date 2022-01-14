import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import UserDelete from './UserDelete';
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
