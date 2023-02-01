import React,{useEffect, useState} from "react";
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import TaskList from '../TaskList/TaskList';
import FilterFooter from '../FilterFooter/FilterFooter';
import { v4 as uuidv4 } from 'uuid';
import "./TodoApp.css"

const TodoApp = () => {
    const [tasks,setTasks] = useState([])
    const [filter, setFilter] = useState("all")
    const [filterTasks, setFilterTasks] = useState([])
    const [refresh, setRefresh] = useState(0)

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"))
        setTasks(storedTasks)
    },[])

    useEffect(() => {
        if(filter === "all") setFilterTasks(tasks)
        if(filter === "completed"){
            const newFilterTasks = tasks.filter(item => item.status)
            setFilterTasks(newFilterTasks)
        }
        if(filter === "active"){
            const newFilterTasks = tasks.filter(item => !item.status)
            setFilterTasks(newFilterTasks)
        }
    },[filter,tasks,refresh])

    const addTask = (taskTitle) => {
        const newTasks = [
            ...tasks,
            {
                id: uuidv4(),
                title: taskTitle,
                status: false
            }
        ]
        setTasks(newTasks)
        localStorage.setItem("tasks", JSON.stringify(newTasks))
    }

    const deleteTask = (taskId) => {
        const newTasks = tasks.filter(item => item.id !== taskId)
        setTasks(newTasks)
        localStorage.setItem("tasks", JSON.stringify(newTasks))
    }

    const handleChangeStatus = (taskId) => {
        const newTasks = tasks
        let index = newTasks.findIndex(item => item.id === taskId)
        newTasks[index].status = !newTasks[index].status
        setTasks(newTasks)
        localStorage.setItem("tasks", JSON.stringify(newTasks))
        setRefresh(refresh+1)
    }

    return(
    <div className="TodoApp">
        <AddTaskForm addTask={addTask} />
        <TaskList handleChangeStatus={handleChangeStatus} tasks={filterTasks} deleteTask={deleteTask} />
        <FilterFooter updateFilter={setFilter} tasks={filterTasks} />
    </div>
)}

export default TodoApp