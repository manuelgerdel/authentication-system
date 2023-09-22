const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			backendUrl: process.env.BACKEND_URL,
			token: "",
			userData: {},
		},
		actions: {
			registerUser: async (userData) => {
				try {
					const store = getStore();
					const response = await fetch(`${store.backendUrl}api/register`, {
						body: JSON.stringify(userData),
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
					});

					const data = await response.json();
					alert(data);
					if (response.status !== 201) {
						return false;
					} else {
						return true;
					}
				} catch (error) {
					console.log(error)
				};
			},

			loginUser: async (userData) => {
				try {
					const store = getStore();
					const response = await fetch(`${store.backendUrl}api/login`, {
						body: JSON.stringify(userData),
						method: "POST",
						headers: {
							"content-type": "application/json"
						},
					});

					const data = await response.json();
					if (!data.token) return false;
					setStore({ token: data.token })
					return true

				} catch (error) {
					console.log(error)
				}

			},

			getPrivateData: async () => {
				console.log("hola que tal");
				try {
					const store = getStore();
					const response = await fetch(`${store.backendUrl}api/private`, {
						headers: {
							"Authorization": `Bearer ${store.token}`
						}
					})
					const data = await response.json();
					if (response.status === 401) {
						alert("User not autenticated")
						return;
					}
					setStore({ userData: data.data })
				} catch (error) {
					console.log(error)
				}
			},

			logoutUser: () => {
				setStore({ token: "" });
			}

		}
	};
};

export default getState;
