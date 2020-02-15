import React, {useEffect} from 'react'
import classes from "./cockpit.css";

const cockpit = (props) => {
    useEffect(() => {
        console.log('Cockpit useEffect');

        // const timer = setTimeout(() => {
        //     alert('Timeout load')
        // }, 1000);

        return () => {
            // clearTimeout(timer);
            console.log('Cockpit cleanup');
        }
    }, []);

    useEffect(() => {
        console.log('Cockpit second useEffect');

        return () => {
            console.log('Cockpit second cleanup')
        }
    })

    const assignedClasses = [];
    if (props.personsLength <= 2) {
        assignedClasses.push(classes.red); // classes = ['red']
    }
    if (props.personsLength<= 1) {
        assignedClasses.push(classes.bold); // classes = ['red', 'bold']
    }

    let btnClass = '';
    if (props.showPersons) btnClass = classes.Red;

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button className={btnClass} onClick={props.clicked}>
                Toggle Persons
            </button>
        </div>)
}

export default React.memo(cockpit)