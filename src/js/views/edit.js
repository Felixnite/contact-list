import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Edit = () => {
	const { store, actions } = useContext(Context);
    const {id} = useParams();
	const [data, setData ] = useState({
		full_name:"", email:"", phone:"", address:"", agenda_slug:"Felixnite_agenda"
	})
	const info = (event) => {
		setData({
			...data, [event.target.name]:event.target.value
		})
	}
    useEffect(() => {
        // Obtén los detalles del contacto por ID cuando el componente se monta
        actions.GetContactById(id)
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error("Error obteniendo detalles del contacto:", error);
            });

    }, [actions, id]);
	const edit = async (event) => {
		event.preventDefault()
        try {
           await actions.editContact(id, data)
        } catch (error) {
            console.log(error)
        }
		
	}
	return (
		<div className="container">
		<form className="row g-3">
			<div className="col-md-6">
				<label htmlFor="inputEmail4" className="form-label">Full Name</label>
				<input type="text" className="form-control" id="inputFullName" name="full_name" required value={data?.full_name} onChange={info}/>
			</div>
			<div className="col-md-6">
				<label htmlFor="inputPassword4" className="form-label">Email</label>
				<input type="email" className="form-control" id="inputEmail" name="email" required value={data?.email} onChange={info}/>
			</div>
			<div className="col-12">
				<label htmlFor="inputAddress" className="form-label">Phone</label>
				<input type="text" className="form-control" id="inputPhone" name="phone" required value={data?.phone} onChange={info}/>
			</div>
			<div className="col-12">
				<label htmlFor="inputAddress2" className="form-label">Address</label>
				<input type="text" className="form-control" id="inputAddress" name="address" required value={data?.address} onChange={info}/>
			</div>
			
		
			<div className="col-12">
				<button type="submit" onClick={edit} className="btn btn-primary"></button>
			</div>
		</form>
		<Link to = "/">Volver a mis contactos</Link>
		</div>
	);
};