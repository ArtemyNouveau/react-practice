import React, {Component} from 'react';

import classes from './App.css';
import Persons from '../Components/Persons/Persons';
import Cockpit from '../Cockpit/Cockpit'
import WithClass from "../hoc/WithClass";

import AuthContext from '../context/auth-context'

class App extends Component {
    constructor(props) {
        console.log('Constructor');
        super(props);
    }

    state = {
        persons: [
            {id: 'asfa1', name: 'Max', age: 28},
            {id: 'vasdf1', name: 'Man', age: 29},
            {id: 'asdf11', name: 'Lis', age: 26}
        ],
        otherState: 'some other value',
        showPersons: false,
        showCockPit: true,
        changeCounter: 0,
        authenticated: false
    };

    static getDerivedStateFromProps(props, state) {
        // console.log('getDerivedStateFromProps', props);
        return state
    }

    componentDidMount() {
        console.log('Mounted');
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('App should update');
        return true
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('App updated')
    }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {...this.state.persons[personIndex]};

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState((prevState, props) => {
            return {
                persons: persons,
                changeCounter: prevState.changeCounter + 1
            }
        })
    };

    deletePersonHandler = personIndex => {
        // const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    };

    toggleCockPitHandler = () => {
        const doesShow = this.state.showCockPit;
        this.setState({showCockPit: !doesShow});
    };

    loginHandler = () => {
        this.setState({authenticated: true})
    }

    render() {
        console.log('Render');
        let persons = null;

        if (this.state.showPersons) {
            persons = <Persons
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.nameChangedHandler}
                isAuthenticated={this.state.authenticated}
            />
        }

        return (
            <WithClass classes={classes.App}>
                <button onClick={this.toggleCockPitHandler}>Remove Cockpit</button>
                <AuthContext.Provider
                    value={{
                        authenticated: this.state.authenticated,
                        login: this.loginHandler
                    }}
                >
                    {this.state.showCockPit ?

                        <Cockpit
                            title={this.props.title}
                            showPersons={this.state.showPersons}
                            personsLength={this.state.persons.length}
                            clicked={this.togglePersonsHandler}
                            login={this.loginHandler}
                        />
                        : null
                    }
                    {persons}
                </AuthContext.Provider>

            </WithClass>
        );
    }
}

export default App;
