import React, {Component} from 'react';
import PropTypes from 'prop-types'
import WithClass from "../../../hoc/WithClass";
import AuthContext from '../../../context/auth-context'
import classes from './Person.css';

class Person extends Component {
    constructor() {
        super();
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated)
    }

    render() {
        return (
            <WithClass classes={classes.Person}>
                    {this.context.authenticated ? <p>Auth</p> : <p>Log in</p>}

                <p onClick={this.props.click}>
                    I'm {this.props.name} and I am {this.props.age} years old!
                </p>
                <p>{this.props.children}</p>
                <input type="text"
                       ref={
                           //     (inputElement) => {
                           //     this.inputElement = inputElement
                           // }
                           this.inputElementRef
                       }
                       onChange={this.props.changed}
                       value={this.props.name}
                />
            </WithClass>
        );
    }
}

Person.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    click: PropTypes.func,
    changed: PropTypes.func
};

export default Person;
