import { useState, useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import Card from '../components/Card'
import './Tasks.css'
import { useHistory } from 'react-router-dom';

function Tasks() {
    let history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push('/auth');
        }
    })

    const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token')
    }

    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState({
        name: '',
        done: false
    })

    useEffect(() => {
        const url = 'http://localhost:8060/tasks/all';
        const options = {
            headers
        }

        fetch(url, options).then(data => data.json().then(output => {
            if (output.status === 'success') {
                setTasks(output.data)
            } else {
                console.log(output.message);
            }
        }))
    }, [])

    const addTask = (e, field) => {
        let singleTask = {
            ...newTask
        }
        singleTask[field] = e.target.value;
        setNewTask(singleTask);
    }

    const taskSubmitHandler = (e) => {
        e.preventDefault();
        console.log(newTask);
        const url = 'http://localhost:8060/tasks/new';
        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(newTask)
        }

        fetch(url, options)
            .then(response => response.json().then(res => {
                if (res.errors) {
                    alert(`Your ${res.message} `);
                } else {
                    setTasks([...tasks, res])
                    setNewTask({
                        name: '',
                        done: false
                    });
                }
            })).catch(err => console.log(err))
    }

    let tasksList;

    if (typeof(tasks) ==='object' && tasks.length > 0) {
        tasksList = tasks.map(task => 
            <Card 
                key={task._id} 
                task = {task} 
                tasks = {tasks}
                setTasks = {setTasks}
            />
        )
    }

    return (
        <div className='app-container'>
            <h1>My MERN to-do list</h1>
            <form className="input-container" onSubmit = {taskSubmitHandler}>
                <input  placeholder="add a task" 
                        required
                        type="text" 
                        value={newTask.name} 
                        onChange={(e)=>addTask(e, 'name')}
                />
                <button><HiPlus/></button>
            </form>

            <div className ="tasks-container">
                {tasksList}
            </div>
        </div>
    );
}

export default Tasks;
