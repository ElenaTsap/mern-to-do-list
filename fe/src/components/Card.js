import './Card.css';
import { useState } from "react";
import { HiCheck, HiOutlineTrash, HiRefresh } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";

const Card = ({ task, tasks, setTasks}) => {
    const [deleted, setDeleted] = useState(false);
    const [done, setDone] = useState(task.done);
    const [isEditable, setIsEditable] = useState(false);
    const editedTask = {_id: task._id };

    const deleteTask = (id) => {
        const url ='http://localhost:8060/tasks/'+id;
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        }
        const options = {
        method: 'DELETE',
        headers
        }

        setDeleted(true);

        setTimeout(() => {
            fetch(url, options)
            .then(response => response.json().then(output => {
            const newList = tasks.filter(task => task._id !== output.data);
            setTasks(newList);
            }));
        }, 600);
    } 

    const editCheckHandler = (e) => {
        console.log('input', e);
        if (e.charCode === 13 && isEditable) {
            e.preventDefault();
            //setIsEditable(false)
        }
    }

    const editCardHandler = (e) => {
        const id = e.target.getAttribute("data-id");
        const info = e.target.innerText;
        editedTask[id] = info;
    }

    const updateTaskHandler = () => {
        const url = 'http://localhost:8060/tasks/update';
        const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(editedTask)
        }

        fetch(url, options)
        .then( data => data.json().then(output => {
            if (output.status === 'success') {
                console.log('success')
            } else {
                alert(output.message.message);
            }
        })
        ).catch(err => alert(err))
    }

    const checkCardHandler = (e) => {
        console.log('into checkCardHandler the state done is', done);
        const id = e.target.getAttribute("data-id");
        console.log('id',id);
        const info = !done;
        editedTask[id] = info;
        console.log('info', info);
        updateTaskHandler();
    }

    return (
        <div className = {`card-container  ${done ? "done-item" : ""} ${deleted ? "removed-item" : "slide-top"} ${isEditable ? "editable-item" : ""}`}>
            <div className = "card-name" 
                data-id="name" 
                contentEditable = {isEditable}
                onKeyPress = {editCheckHandler}
                onBlur = {editCardHandler}
            >
                {task.name}
            </div>
            <div className = "buttons-container">
                <div 
                    className = "card-edit" 
                    onClick = {()=>{setIsEditable(!isEditable)}}
                >
                    {isEditable ? 
                        <HiRefresh 
                            style = {{backgroundColor: 'peru'}} 
                            onClick = {()=>updateTaskHandler()}
                        /> : 
                        <FiEdit2 
                            style = {{backgroundColor: 'black'}}
                        />
                    }
                </div>
                <div 
                    className = "card-check" 
                    onClick = {()=>{setDone(!done)}}
                >
                    <HiCheck 
                        data-id="done" 
                        onClick = {checkCardHandler}
                    /> 
                </div>
                <div 
                    className = "card-del" 
                    onClick = {()=>{deleteTask(task._id)}}
                >
                    <HiOutlineTrash/>
                </div>
            </div>
        </div>
    )
}

export default Card
