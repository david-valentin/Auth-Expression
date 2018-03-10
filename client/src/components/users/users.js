import React, { Component } from 'react';
import './users.css';

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch('/users')
        .then(res => res.json())
        .then(users => {
            this.setState({users}, () => console.log('Users Fetched...', users))
        });
    }

    render() {
        return (
            <div>
                <h2>Users</h2>
                <ul>
                    {this.state.users.map(user => 
                        <li key={user.id}> {user.email} {user.parking_lot} </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Users;
