import React from 'react';

class UserDelete extends React.Component {
    
    deleteUser (id) {
        const url = '/api/userDel/' + id;
        fetch(url, {
            method:'DELETE'

        });
        window.location.replace("/");
    }
    render(){
        return(
            <button onClick={(e) => {this.deleteUser(this.props.id)}}>삭제</button>
        )
    }
}

export default UserDelete;