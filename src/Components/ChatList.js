import React, {Component} from 'react';

class ChatList extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(user) {
        this.props.createChat(user.user);
    }

    render() {
        return (
            <div className="user-list">
                <h3>{this.props.currentUser}</h3>
                <ul>
                    {this.props.users.map((user, index) => (
                        
                        <li className="white" key={index} onClick={() => this.handleClick({user})}>
                        <div className="presence"></div>{user}
                        </li>
                    ))}
                </ul>
            </div>
        )
    } 
}

export default ChatList;