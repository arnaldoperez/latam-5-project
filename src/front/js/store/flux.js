const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      loginInfo: {},
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
	const apiURL = process.env.BACKEND_URL+"/api";
	return {
		store: {
			message: null,
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
			token: "",
			refreshToken: "",
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

      getMessage: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/hello")
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) => {
            console.log(
              "Error loading message from backend",
              JSON.stringify(error)
            );
          });
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
      login: (email, password) => {
        fetch(
          "https://3001-arnaldopere-latam5proje-urbbrs1j9de.ws-us47.gitpod.io/api/login", //recordar cambiar url del backend
          {
            mode: "no-cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
            method: "POST",
            body: JSON.stringify({ email, password }),
          }
        )
          .then(async (response) => {
            await response.json();
            console.log(response.json());
          })
          .then(async (result) => {
            console.log("Success:", result);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },
    },
  };
				//reset the global store
				setStore({ demo: demo });
			},

			signUp: async (email, password, nombre, apellido ) => {//mi peticion es asincrona es decir espera por el resultado
			  const params = {
				method: "POST", //ingreso el metodo de mi peticion
				body: JSON.stringify({//ingreso el contenido del body y los parametros de mi peticion
				  email,
				  password,
				  nombre,
				  apellido
				}),
				headers: {
				  "Content-Type": "application/json",
				},
			  };
			  const resp = await fetch(`${apiURL}/signup`, params); //esperar a mi peticion mediante la funcion fetch con los parametros en el cuerpo y encabezado del mensaje para realizar el sgnup en este caso se busca regitrar un usuario
			  if (resp.status !== 201) {
				return { code: resp.status, msg: resp.statusText };
			  }
	  
			  return { code: 201, msg: "Usuario registrado" };
			}
		}
	};
};

export default getState;
