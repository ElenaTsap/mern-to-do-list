/* eslint-disable import/no-anonymous-default-export */
import './Auth.css'
import { useHistory, NavLink } from 'react-router-dom';


export default function (props) {
    let history = useHistory();
    let submitHandler = (e) => {
        e.preventDefault(); 

        let data = {}; 
        data.email = e.target[0].value;
        data.pass = e.target[1].value;

        let urlLogin = 'http://localhost:8060/auth/login';
        let options = {
            method :'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }

        fetch(urlLogin, options)
        .then(result => result.json()
        .then(output => {
            console.log(output);
            if (output.status === 'success') {
                console.log(output.message);
                localStorage.setItem('token', output.token);
                history.push('/tasks');
            } else {
                alert(output.status);
            }

        }))
    }
    

    return (
            <div className='wrapper'>
                <form onSubmit = {submitHandler}>
                    <h2>Login to your TODO list</h2>
                    <input name = "email" type = "email"/>
                    <input name = "pass" type ="password"/>
                    <section>
                        <input id ="login" type = "submit" value ="Login"/>
                    </section>
                    <h4>new user?  &nbsp; 
                    <NavLink 
                            exact
                            to = "/register"
                        >
                            Register
                    </NavLink></h4>
                </form>
            </div>
    )
}
