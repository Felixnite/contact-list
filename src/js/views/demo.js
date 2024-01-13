import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const [data, setData ] = useState({
		full_name:"", email:"", phone:"", address:"", agenda_slug:"Felixnite_agenda"
	})
	const info = (event) => {
		setData({
			...data, [event.target.name]:event.target.value
		})
	}
	const add = (event) => {
		event.preventDefault()
		actions.createContact(data)
	}
	return (
		<div className="container">
		<form className="row g-3">
			<div className="col-md-6">
				<label htmlFor="inputEmail4" className="form-label">Full Name</label>
				<input type="text" className="form-control" id="inputFullName" name="full_name" required value={data.full_name} onChange={info}/>
			</div>
			<div className="col-md-6">
				<label htmlFor="inputPassword4" className="form-label">Email</label>
				<input type="email" className="form-control" id="inputEmail" name="email" required value={data.email} onChange={info}/>
			</div>
			<div className="col-12">
				<label htmlFor="inputAddress" className="form-label">Phone</label>
				<input type="text" className="form-control" id="inputPhone" name="phone" required value={data.phone} onChange={info}/>
			</div>
			<div className="col-12">
				<label htmlFor="inputAddress2" className="form-label">Address</label>
				<input type="text" className="form-control" id="inputAddress" name="address" required value={data.address} onChange={info}/>
			</div>
			
		
			<div className="col-12">
				<button type="submit" onClick={add} className="btn btn-primary">Create</button>
			</div>
		</form>
		<Link to = "/">Volver a mis contactos</Link>
		</div>
	);
};
