import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./TaskItem.css"

const TaskItem = ({task, deleteTask, handleChangeStatus}) => (
    <li className="TaskItem">
        <input onChange={() => handleChangeStatus(task.id)} id={task.id} type="checkbox" checked={task.status} />
        <h2>{task.title}</h2>
        <button onClick={() => deleteTask(task.id)}><FaTrashAlt /></button>
    </li>
)

export default TaskItem