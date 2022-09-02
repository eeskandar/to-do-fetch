import React, { useEffect } from "react";
import { useState } from "react";

export const ToDo = () => {

	const [stuffs, setStuffs] = useState("")
	const [list, setList] = useState ([])
	const [waiting, setWaiting] = useState (true)

	//API stuff
	const API_URL = "https://assets.breatheco.de/apis/fake/todos/"
	
	// for submitting
	async function submit (event) {
		if(event.key === "Enter" && stuffs.trim() !== "") {
			setWaiting(false)
			await updateUserList("Alejo")
			await getUserList("Alejo")
			setStuffs("")
		}
		if(event.key === "Enter" && stuffs.trim() == ""){
			alert("Not sure what to add? Take it easy, I know you will think of something")
			setStuffs("")
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
			setWaiting (true)
			deleteUser("Alejo")
		} else {
		await updateUserList("Alejo", newTask)
		await getUserList("Alejo")
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

	//for fetch
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
			data = [...list, {label: stuffs, done: false}]
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
				onChange={(event) => {setStuffs(event.target.value)}}
				value = {stuffs}
				onKeyDown={submit}
				placeholder="What do you need to do?"></input>
			</div>
			<div>
				{waiting? (
					<div className="text-white list-group-item col-sm-8 col-md-8 col-lg-6 mx-auto border-0 disabled bg-transparent mt-1">Try adding a new task! 😎</div>
				) : (
				<ul className="p-0">
					{Mapping}
					<div className="list-end col-sm-8 col-md-8 col-lg-6 mx-auto text-white rounded-bottom shadow"></div>
					<div className="text-white list-group-item col-sm-8 col-md-8 col-lg-6 mx-auto border-0 disabled bg-transparent mt-1">I know you can do it! Only {list.length} left to go!</div>
				</ul>)}
			</div>
		</div>
	);
};

// gracias por tanto y disculpen por tan poco, caballeros 😥