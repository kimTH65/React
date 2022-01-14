import React from 'react';
import { post } from 'axios';
class UserAdd extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            image: null,
            title: '',
            contents: '',
            filename: ''
        }
    }

    addUser = () => {
        const url = '/api/User';
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('title',this.state.title);
        formData.append('contents',this.state.contents);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }
    handleFormSubmit = (e) => {
            e.preventDefault()
            this.addUser()
                .then((response) => {console.log(response.data);
                                    this.props.setRefresh();}
                )
            
                  
    }

    handleFileChange = (e) => {
            this.setState({
                file : e.target.files[0],
                filename: e.target.value
            })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    render(){
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1>추가 하기</h1><br/>
                이미지 : <input type='file' name='file' file={this.state.file} value={this.state.filename} onChange={this.handleFileChange}/><br/>      
                제목 : <input type='text' name='title'  value={this.state.title}  onChange={this.handleValueChange}/><br/> 
                내용 : <input type='text' name='contents' value={this.state.contents} onChange={this.handleValueChange}/><br/> 
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default UserAdd;