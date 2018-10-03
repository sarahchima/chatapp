import React, {Component} from 'react';

class MessageList extends Component {
    render() {
        return(
            <ul  className="message-list">
                {this.props.messages.map((message, index) => (
                    <li key={index}>
                        <h4>{message.senderId}</h4>
                        <p>{message.text}</p>
                    </li>
                ))}
                <li></li>
            </ul>
        )
    }
}

export default MessageList;