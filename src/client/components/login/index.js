import React from 'react';
import axios from 'axios';
export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        axios.post('http://localhost:3005/api/v1/auth', this.state)
            .then((res) => {
                console.log(res);
            })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="username">Username</label>
                <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
                <br />
                <label htmlFor="password">Password</label>
                <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
                <br />
                <input type="submit" value="Login" />
            </form>
        )
    }
}