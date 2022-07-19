import React, { useRef, useState } from 'react'
import { FormControl, Form} from 'react-bootstrap'
import "react-datetime-picker/dist/DateTimePicker.css"
import "react-calendar/dist/Calendar.css"
import "react-clock/dist/Clock.css"
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from "../../Redux/Action"
import cuid from 'cuid';

const Todo = ({isUpdate, handleUpdate, todo}) => {
		const [task, setTask] = useState("")
		const [time, setTime] = useState();
		const dispatch = useDispatch();
		const taskRef = useRef();
		const dateRef = useRef();

	function handleChange(e) {
		setTime(e.target.value)
	}

	const createTask = (e) => {
		e.preventDefault();
		const data = {
				"taskName": task,
				"time": time
		}
		dispatch(addTodo({task: data, id: cuid() }))  
		setTask("");
		setTime(new Date())
	}

	const updateTask =()=> {
			console.log("called update===", taskRef.current.value, dateRef.current.value, todo.id);
			const updatedTask = {
					"taskName": taskRef.current.value,
					"time": dateRef.current.value
			}
			dispatch(updateTodo({payload: updatedTask, id: todo.id}))
			handleUpdate();
	}

		return (
		<div className='p-3'>
				{!isUpdate ? 
				<Form onSubmit={(e)=>createTask(e)}>
						<div>
								<label>Title:</label>
								<FormControl
										type='text'
										value={task}
										onChange={(e)=> setTask(e.target.value)}
										placeholder="Title"
										className='mb-3'
										required
								/>
						</div>
						<div>
								<label>Deadline: </label>
								<FormControl 
								type="datetime-local" 
								className="mb-3" 
								placeholder="Add Date & Time"
								aria-label="Time" 
								defaultValue={time}
								onChange={(e)=>handleChange(e)}
								required
								/>
						<div>
								<label>Status:</label><br/>
								<select NAME="status"> 
								<option VALUE="0">Not Started </option>
								<option VALUE="1">Completed </option>
								<option VALUE="2">In progress </option>
								</select> 
								
						
						</div>
								<button className='btn btn-dark mt-4' type="submit">Add</button>
						</div>
				 </Form>
					: 
					<div>
						<label>Title:</label>
						<FormControl
								type='text'
								ref={taskRef}
								defaultValue={todo.task.taskName}
								placeholder="Title"
								className='mb-3'
						/>
						<label>Deadline: </label>
						<FormControl 
						type="datetime-local" 
						className="mb-3" 
						placeholder="Add Time" 
						aria-label="Time" 
						defaultValue={todo.task.time}
						ref={dateRef}
						/>
						<div>
						<label>Status:</label><br/>
						<select NAME="status"> 
						<option VALUE="0">Not Started </option>
						<option VALUE="1">Completed </option>
						<option VALUE="2">In progress </option>
						</select> 
								
						
						</div>
						<button onClick={updateTask} className="btn btn-dark mt-3">Update</button> 
				 </div>
				 }

		</div>
	)
}

export default Todo
