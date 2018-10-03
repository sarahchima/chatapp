import React, {Component} from 'react';
import {styles} from './Styles';



class  Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({username: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.onSubmit(this.state.username);
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit} style={styles.form}>
                <label for="username">What is your Username?</label>
                <input type="text" name="username" onChange={this.handleChange} style={styles.input} />
                <input type="submit" value="Submit"  style={styles.submit}/>
            </form>
        )
    }

}

export default Signup;