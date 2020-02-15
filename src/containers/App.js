import React, {Component} from 'react';

import classes from './App.css';
import Persons from '../Components/Persons/Persons';
import Cockpit from '../Cockpit/Cockpit'

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
        showCockPit: true
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

        this.setState({persons: persons});
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

    render() {
        console.log('Render');
        let persons = null;

        if (this.state.showPersons) {
            persons = <Persons
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.nameChangedHandler}/>
        }

        return (
            <div className={classes.App}>

                <button onClick={this.toggleCockPitHandler}>Remove Cockpit</button>

                {this.state.showCockPit ?
                    <Cockpit
                        title={this.props.title}
                        showPersons={this.state.showPersons}
                        personsLength={this.state.persons.length}
                        clicked={this.togglePersonsHandler}/>
                    : null
                }

                {persons}
            </div>
        );
    }
}

export default App;
