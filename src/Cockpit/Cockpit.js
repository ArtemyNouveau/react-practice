import React, {useEffect, useRef, useContext} from 'react'
import classes from "./cockpit.css";
import AuthContext from '../context/auth-context'

const cockpit = (props) => {
    useEffect(() => {
        console.log('Cockpit useEffect');

        // const timer = setTimeout(() => {
        //     alert('Timeout load')
        // }, 1000);
        toggleBtnRef.current.click();

        return () => {
            // clearTimeout(timer);
            console.log('Cockpit cleanup');
        }
    }, []);

    useEffect(() => {

        return () => {
            console.log('Cockpit second cleanup')
        }
    });

    const toggleBtnRef = useRef();
    const authContext = useContext(AuthContext);

    const assignedClasses = [];
    if (props.personsLength <= 2) {
        assignedClasses.push(classes.red); // classes = ['red']
    }
    if (props.personsLength <= 1) {
        assignedClasses.push(classes.bold); // classes = ['red', 'bold']
    }

    let btnClass = '';
    if (props.showPersons) btnClass = classes.Red;

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button
                ref={toggleBtnRef}
                className={btnClass}
                onClick={props.clicked}
            >
                Toggle Persons
            </button>
            <button onClick={authContext.login}>
                Log in
            </button>
        </div>
    )
}

export default React.memo(cockpit)