const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });



			},


			getContact: async () => {
				let store = getStore()
				try {
					let response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/Felixnite_agenda")
					let data = await response.json()

					setStore({

						...store, contacts: data

					})
				}

				catch (error) {
					console.log(error)
				}
			},

			createContact: (data) => {
				console.log("Datos a enviar:", data);

				const actions = getActions();
				const URL = "https://playground.4geeks.com/apis/fake/contact/";
				const opt = {
					method: "POST",
					headers: {
						"Content-type": "Application/json",
					},
					body: JSON.stringify(data),
				};

				fetch(URL, opt)
					.then((response) => {
						console.log("Respuesta:", response);
						if (response.ok) {
							actions.getContact();
							alert("Contacto creado con éxito");
						} else {
							alert("Error al crear contacto");
						}
					})
					.catch((error) => {
						console.log("Error:", error);
						alert("Error al crear contacto");
					});
			},

			editContact: (id, data) => {
				console.log(data)
				let store = getStore();
				try {
					let response = fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
						method: "PUT",
						headers: {
							"Content-type":"Application/json"
						},
						body: JSON.stringify(data)
					})
				} catch (error) {
					console.log(error)
				}
			},

			GetContactById: async (id) => {
				try {
					let response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`)
					let data = await response.json()
					return data
				}

				catch (error) {
					console.log(error)
					return null
				}
			},

			deleteContactById: async (id) => {
				const actions = getActions()
				try {
					let response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {method: "DELETE"})
					let data = await response.json()
					console.log(data)
					if (response.ok){
						actions.getContact()
					}
				}

				catch (error) {
					console.log(error)
					return null
				}
			},

		}
	};
};

export default getState;
