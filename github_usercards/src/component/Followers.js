import React from 'react';
import axios from 'axios';


class Followers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            follower: {}
        }
    }

    componentDidMount() {
        axios.get(`https://api.github.com/users/${this.props.follower.login}`)
          .then((res) => {
            console.log(res.data);
            this.setState({follower: res.data});
          })
          .catch((err) => {
            console.log(err);
          })
        console.log('componentDidMount running');
    }

    render() {
        console.log('App is rendering!');
        return (
          <div className='usercard'>
            <h2>Name: {this.state.follower.name}</h2>
            <img src={this.state.follower.avatar_url} className='picture' alt='' />
            <p>{this.state.follower.login}</p>
            <a href={this.state.follower.html_url}>{this.state.follower.html_url}</a>
            <p>Location: {this.state.follower.location}</p>
            <p>Bio: {this.state.follower.bio}</p>
          </div>
        );
    }  
}

export default Followers; 