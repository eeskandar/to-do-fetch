import React, { useState } from "react";
import { EntryModal } from "./EntryToast.jsx";

export const ToDo = () => {

	const [stuff, setstuff] = useState ("")
	const [list, setList] = useState ([])
	const [waiting, setWaiting] = useState (true)
	const [activeUser, setActiveUser] = useState ("Guest")
	const [voidTodo, setVoidTodo] = useState (false)

	//API stuff
	const API_URL = "https://assets.breatheco.de/apis/fake/todos/"
	
	// for submitting
	async function submit (event) {
		if(event.key === "Enter" && stuff.trim() !== "") {
			setWaiting(false)
			await updateUserList(activeUser)
			await getUserList(activeUser)
			setVoidTodo(false)
			setstuff("")
		}
		if(event.key === "Enter" && stuff.trim() == ""){
			setVoidTodo(true)
			setstuff("")
		}
	}

	// for deleting
	async function deleteTask (i) {
			const newTask = list.filter((task, index)=> {
			if (i == index) {
				return false
			}
			return true
		})
		if (newTask.length == 0){
			deleteUser(activeUser)
		} else {
		await updateUserList(activeUser, newTask)
		await getUserList(activeUser)
		setVoidTodo(false)
		}
	}

	// for mapping
	const Mapping = list.map((task, i) => {
		return (
				<li key={i} className="list-group-item col-sm-8 col-md-8 col-lg-6 mx-auto border-0 mt-1 bg-dark text-white show-button">
					{task.label}
					<button key={i} type="button"
					className="btn-close btn-close-white float-end invi-button"
					onClick={(event) => deleteTask(i)}></button>
				</li>
		)
	})	

	// for fetch
	async function createUser(user) {
		try {
			const response = await fetch(API_URL + `user/${user}`, {
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					"Content-Type": "application/json"
				}
			})
			if (!response.ok) {
				new Error("Ocurrió un error en la solicitud")
			}
			const body = await response.json ()
			console.log(response)
			console.log(body)
		}	
		catch (error) {
			console.log(error)
		}
	}

	async function updateUserList(user, newFilteredList = null) {
		try {
			let data; 
			data = [...list, {label: stuff, done: false}]
			if(newFilteredList != null){
				data = newFilteredList
			}
			const response = await fetch(API_URL + `user/${user}`, {
				method: "PUT",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json"
				}
			})
			if (!response.ok) {
				new Error("Ocurrió un error en la solicitud")
			}
			const body = await response.json ()
			console.log(response)
			console.log(body)
		}	
		catch (error) {
			console.log(error)
		}
	}

	async function getUserList(user) {
		const response = await fetch(API_URL + `user/${user}`)
		if (!response.ok) {
			new Error("Ocurrió un errorsote en la solicitud")
		}
		const body = await response.json ()
		setList(body)
	}

	async function deleteUser(user) {
		try {
			const response = await fetch(API_URL + `user/${user}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			})
			if (!response.ok) {
				new Error("Ocurrió un error en la solicitud")
			}
			const body = await response.json ()
			await createUser(user)
			setWaiting (true)
			setList([])
			console.log(response)
			console.log(body)
		}	
		catch (error) {
			console.log(error)
		}
	}

	// display
	return (
		<div className="container-fluid">
			<div className="mt-3 mb-4">
				<div className="row justify-content-center text-white fs-1 fst-italic fw-bolder text-center">"The Best Way to Know What to Do <br></br> Is to Write Your ToDos"</div>
				<div className="row text-white justify-content-center fst-italic">-Someone, at some point (maybe)-</div>
			</div>
			<div className="row col-sm-8 col-md-8 col-lg-6 mx-auto">
				<input id="tasker" 
				type="text"
				className={`list-group-item shadow border-0 ${waiting? "rounded" : "rounded-top"}`}
				onChange={(event) => {setstuff(event.target.value)}}
				value = {stuff}
				onKeyDown={submit}
				placeholder="What do you need to do?"></input>
				{voidTodo ? (
				<div class="alert alert-warning alert-dismissible mt-1 mb-0" role="alert">You can't add an empty task! Write something else</div>
				) : (null)}
				</div>
			<div>
				{waiting? (
					<div className="text-white list-group-item col-sm-8 col-md-8 col-lg-6 mx-auto border-0 bg-transparent mt-1">Try adding a new task! 😎</div>
				) : (
				<ul className="p-0">
					{Mapping}
					<div className="list-end col-sm-8 col-md-8 col-lg-6 mx-auto text-white rounded-bottom shadow"></div>
					<div className="text-white list-group-item col-sm-8 col-md-8 col-lg-6 mx-auto border-0 bg-transparent mt-1">I know you can do it! Only {list.length} left to go!</div>
					<div className="text-white list-group-item col-sm-8 col-md-8 col-lg-6 mx-auto border-0 bg-transparent mt-1">...or let it go with the wind and erase all your tasks by pressing this cute raccoon <button className="btn" type="button" onClick={(event) => deleteUser(activeUser)}>🦝</button></div>
				</ul>)}
			</div>
		</div>
	);
};

// gracias por tanto y disculpen por tan poco, caballeros 😥