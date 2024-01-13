import React, { useContext, useEffect } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Context } from "../store/appContext"
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	console.log(store.contacts)


	useEffect(() => {
		actions.getContact()
	}, [])
	return (
		<div>

			<div className="container text-center">
				{store.contacts.map((item, index) => (

					<div className="card mb-3" key={index} style={{ maxWidth: "800" }}>
						<div className="row g-0">
							<div className="col-md-3">
								<img src="https://as2.ftcdn.net/v2/jpg/02/89/59/55/1000_F_289595573_wCKO1nxxx7HGk69z5szjvSOqPnZVTfTG.jpg" className="img-fluid rounded-start" alt="..." />
							</div>
							<div className="col-md-6">
								<div className="card-body">
									<h5 className="card-title">{item.full_name}</h5>
									<p className="card-text"><i className="fa-solid fa-location-dot"></i> {item.address}</p>
									<p className="card-text"><i className="fa-solid fa-phone"></i> {item.phone}</p>
									<p className="card-text"><i className="fa-solid fa-envelope"></i> {item.email}</p>
								</div>
							</div>


							<div className="col-md-3">
								<div className="d-grid gap-2 d-md-flex justify-content-md-end">
									<button onClick={() => actions.deleteContactById(item.id)} className="btn btn-light me-md-2" type="button"><i className="fa-solid fa-trash"></i></button>
									<Link to = {`/edit/${item.id}`}>
									<button className="btn btn-light" type="button"><i className="fa-solid fa-pen-to-square"></i></button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>




		</div>
	)
}

// <div className="text-center mt-5">
// 	<h1>Hello Rigo!</h1>
// 	<p>
// 		<img src={rigoImage} />
// 	</p>
// 	<a href="#" className="btn btn-success">
// 		If you see this green button, bootstrap is working
// 	</a>
// </div>
// );
