/* eslint-disable import/no-anonymous-default-export */
import './Auth.css'
import { useHistory,NavLink } from 'react-router-dom';

export default function (props) {
    let history = useHistory();
    let submitHandler = (e) => {
        e.preventDefault(); 

        let data = {}; 
        data.email = e.target[0].value;
        data.pass = e.target[1].value;

        let urlRegister = 'http://localhost:8060/auth/register';
        let options = {
            method :'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }

        fetch(urlRegister, options)
        .then(result => result.json()
        .then(output => {
            alert(output.message)
            history.push('/login');
        }))
    }

    return (
        <div className='wrapper'>
            <form onSubmit = {submitHandler}>
                <h2>Register to my simple TODO list</h2>
                <input name = "email" type = "email"/>
                <input name = "pass" type ="password"/>
                <section>
                    <input id ="register" type = "submit" value ="Register"/>
                </section>
                <h4>already registered?  &nbsp; 
                <NavLink 
                        exact
                        to = "/login"
                    >
                        Login
                </NavLink></h4>
            </form>
        </div>
    )
}
