import React, {Component} from 'react'
import Person  from './Person/Person'

class Persons extends Component {
    static getDerivedStateFromProps(props, state) {
        console.log('persons getDerivedStateFromProps', props);
        return state
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('persons should update', nextContext);
        return nextProps.persons !== this.props.persons
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('persons snapshot', prevState);
        return {message: 'snap'}
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('persons did update', snapshot)
    }

    componentWillUnmount() {
        console.log('Persons will be unmounted')
    }

    render() {
        console.log('persons rendering');
        return (this.props.persons.map((person, index) => {
                return (
                    <Person
                        click={() => this.props.clicked(index)}
                        name={person.name}
                        age={person.age}
                        key={person.id}
                        changed={event => this.props.changed(event, person.id)}
                    />
                );
            })
        );
    }
}

export default Persons;