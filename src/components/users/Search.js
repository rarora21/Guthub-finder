import React, { Component } from 'react';
import PropTypes from "prop-types"

class Search extends Component {
    constructor(){
        super()
        this.state={
            text: ""
        }
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e){
        e.preventDefault()
        if(this.state.text === ""){
            this.props.setAlert("Please enter name", "light")
        }else{
            this.props.searchUser(this.state.text)
            this.setState({ text: "" })
        }
    }
    render() {
        return (
            <div>
                <form className="form" onSubmit={(e)=>this.onSubmit(e)}>
                    <input type="text" name="text" placeholder="Search user" 
                        onChange={(e)=>this.onChange(e)} value={this.state.text}
                    />
                    <button className="btn btn-dark btn-block"> Search </button>
                </form>
                { this.props.showClear &&
                <button className="btn btn-light btn-block" onClick={this.props.clearUsers}> Clear </button>
                }
            </div>
        );
    }
}

Search.propTypes = {
    searchUser: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
}

export default Search;