import React, {Component} from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit';
import ChatList from './ChatList';
import MessageList from './MessageList';
import Input from './Input';
import TypingIndicator from './TypingIndicator'

const Chatkit = require("@pusher/chatkit-server");


class ChatApp extends Component {
    constructor(props) {
        super(props); 

        this.state = {
            currentUser: null,
            currentRoom: {users:[]},
            messages: [],
            users: [],
            usersTyping: []
        }

        this.addMessage = this.addMessage.bind(this);
        // this.createChat = this.createChat.bind(this);
        this.sendTypingEvent = this.sendTypingEvent.bind(this)
    }

    sendTypingEvent() {
        this.state.currentUser
            .isTypingIn({ roomId: this.state.currentRoom.id })
            .catch(error => console.error('error', error))
    }


    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator: '',
            userId: this.props.currentId,
            tokenProvider: new TokenProvider({
                url: ''
            })
        })


    addMessage(text) {
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoom.id
        })
        .catch(error => console.error('error', error));
    }
    
    createChat(user) {
        console.log(this.state.currentUser);

        this.state.currentUser.createRoom({
            name: user,
            private: true,
            addUserIds: [user]
          }).then(room => {
            this.setState({
                room,
            })
          })
          .catch(err => {
            console.log(`Error creating room ${err}`)
          })
    }

    render() {
        return (
            <div className="chat-app">
                <h1 className="header">{this.state.currentRoom.name}</h1>
                <ChatList user={this.state.currentUser} users={this.state.users} createChat={this.createChat}/>
                <MessageList messages={this.state.messages} />
                <Input onSubmit={this.addMessage} onChange={this.sendTypingEvent}/>
                <TypingIndicator usersTyping={this.state.usersTyping} />
            </div>
        )
    }
}

export default ChatApp;