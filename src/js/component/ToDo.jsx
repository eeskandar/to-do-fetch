import React from "react";
import { useState } from "react";

export const ToDo = () => {

	const [stuffs, setStuffs] = useState("")
	const [list, setList] = useState ([])
	const [waiting, setWaiting] = useState (true)
	
	// for submitting
	function submit (event) {
		if(event.key === "Enter" && stuffs.trim() !== "") {
			setWaiting(false)
			setList([...list, stuffs])
			setStuffs('')
		}
		if(event.key === "Enter" && stuffs.trim() == ""){
			alert("Not sure what to add? Take it easy, I know you will think of something")
			setStuffs('')
		}
	}

	// for deleting
	function deleteTask (i) {
		const newTask = list.filter((task, index)=> {
			if (i == index) {
				return false
			}
			return true
		})
			if (newTask.length == 0){
				setWaiting (true)
			}
			setList(newTask)
	}

	// for mapping
	const Mapping = list.map((task, i) => {
		return (
				<li key={i} className="list-group-item col-sm-8 col-md-8 col-lg-6 mx-auto border-0 mt-1 bg-dark text-white show-button">
					{task}
					<button key={i} type="button"
					className="btn-close btn-close-white float-end invi-button"
					onClick={(event) => deleteTask(i)}></button>
				</li>
		)
	})	

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