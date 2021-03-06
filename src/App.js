import React, { Fragment } from 'react';
import './App.css';
import Navbar from "./components/layout/Navbar"
import Users from "./components/users/Users"
import axios from "axios"
import Search from "./components/users/Search"
import Alert from "./components/layout/Alert"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import About from "./components/pages/About"
import User from "./components/users/User"
class App extends React.Component{
  constructor(){
    super()
    this.state={
      users: [],
      loading: false,
      alert: null,
      user: {},
      repos: []
    }
  }

  // Get all the users
  // async componentDidMount(){
  //   this.setState({ loading: true })
    
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //   &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

  //   this.setState({ users: res.data, loading: false })
  // }

  // Search github user
  searchUser = async(value) =>{
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/search/users?q=${value}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data.items, loading: false })
  }

  // Clear users from state
  clearUsers = () =>{
    this.setState({ users: [], loading: false })
  }

  // Set alert if there is no value submitted 
  setAlert = (text, type) =>{
    this.setState({ alert: { message: text, type: type } })
    setTimeout(()=>{
      this.setState({ alert: null })
    }, 3000)
  }

  // Get a single github user
  getUser = async(username) =>{
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ user: res.data, loading: false })
  }

  // Get user repos
  getUserRepos = async(username) =>{
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log("Repos",res)
    this.setState({ repos: res.data, loading: false })
  }

  render(){
    return(
      <Router>
        <div className="App">
          <Navbar title="Github Finder" icon="fa fa-github" />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path="/" render={(props)=>(
                <Fragment>
                  <Search searchUser={this.searchUser} 
                    clearUsers={this.clearUsers} showClear={this.state.users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users loading={this.state.loading} users={this.state.users} />
                </Fragment>
              )} />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" render={(props)=>(
                <User {...props} getUser={this.getUser} user={this.state.user} loading={this.state.loading} 
                  getUserRepos={this.getUserRepos} repos={this.state.repos}
                />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
