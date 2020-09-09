import React from 'react';
import axios from 'axios';
import Followers from './component/Followers';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      userText: '',
      follower: []
    };
  }

  componentDidMount() {
    axios.all([
      axios.get('https://api.github.com/users/CoinOperatedGuy'),
      axios.get('https://api.github.com/users/CoinOperatedGuy/followers')
    ])
    .then(axios.spread((res, fol) => {
        console.log(res.data);
        console.log(fol.data);
        this.setState({
          user: res.data,
          follower: fol.data
        })
      }))
      .catch((err) => {
        console.log('componentDidMount Error: ', err);
      })
    console.log('componentDidMount running');
  }

  handleChange = e => {
    this.setState( { 
      userText: e.target.value 
    } )
    console.log( 'This is state: ', e.target.value )
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate is getting called!');
    console.log('prevProps: ', prevProps);
    console.log('prevState: ', prevState);

    if (prevProps.userID !== this.props.userID) {
      console.log('If this runs, we are in trouble');
    }

    if (prevState.name !== this.state.name) {
      console.log('There are new users on the state!');
    }
  }

  componentWillUnmount() {
    console.log('This will not run because App is still on screen');
  }

  render() {
    console.log('App is rendering!');
    console.log('this.state.name', this.state.user.name);
    return (
      <div className='container'>
        <div className='header'>
          <h1>Github UserCards</h1>
        </div>
        <div className='usercard'>
          <h2>{this.state.user.name}</h2>
          <img src={this.state.user.avatar_url} className='picture' alt='' />
          <p>{this.state.user.login}</p>
          <a href={this.state.user.html_url}>{this.state.user.html_url}</a>
          <p>Location: {this.state.user.location}</p>
          <p>Bio: {this.state.user.bio}</p>
          <p>Company: {this.state.user.company}</p>
        </div>
        <div className='followers'>
          {this.state.follower.map(fol => (
            <Followers follower = {fol} />
          ))}
        </div>
      </div>
    )
  }
};

export default App;