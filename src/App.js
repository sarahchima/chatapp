import React, { Component } from 'react';
import Signup from './Components/Signup';
import ChatApp from './Components/ChatApp';
const Chatkit = require("@pusher/chatkit-server");

const chatkit = new Chatkit.default({
	instanceLocator: '',
	key: '',
})



class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		currentUsername: '',
		currentId: '',
		currentView: 'signup'
		}
		this.createUser = this.createUser.bind(this);
	}

	createUser(username) {
		chatkit.createUser({
			id: username,
			name: username,
		})
		.then((currentUser) => {
			this.setState({
				currentUsername: username,
				currentId: username,
				currentView: 'chatApp'
			})
		}).catch((err) => {
			if(err.status === 400) {
				this.setState({
					currentUsername: username,
					currentId: username,
					currentView: 'chatApp'
				})
			} else {
				console.log(err.status);
			}
		});
		
	}
	
	render() {
		let view ='';
		if (this.state.currentView === "signup" ) {
			view = <Signup onSubmit={this.createUser}/>;
		} else if (this.state.currentView === "chatApp") {
			view = <ChatApp currentId={this.state.currentId} />
		}
		return (
			<div className="App">
				{view}
			</div>
		);
	}
}

export default App;
