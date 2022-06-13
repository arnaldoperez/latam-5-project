const apiURL = process.env.BACKEND_URL + "/api";
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
      token: "",
      refreshToken: "",
      loginInfo: {},
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
      login: async (email, password) => {
        const params = {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const resp = await fetch(`${apiURL}/login`, params);
        if (resp.status !== 200) {
          return { code: resp.status, msg: resp.statusText };
        }

        const data = await resp.json();
        console.log(data);
        const token = data.token;
        const refreshToken = data.refreshToken;

        setStore({ token, refreshToken });
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        return { code: 200, msg: "Access granted" };
      },

      logout: async () => {
        const store = getStore();
        console.log(store);
        const params = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
        };
        const resp = await fetch(`${apiURL}/logout`, params);
        if (resp.status !== 200) {
          return { code: resp.status, msg: resp.statusText };
        }

        setStore({ token: "" });
        localStorage.removeItem("token");
        return { code: 200, msg: "Sesion cerrada" };
      },

      signUp: async (email, password, nombre, apellido) => {
        //mi peticion es asincrona es decir espera por el resultado
        const params = {
          method: "POST", //ingreso el metodo de mi peticion
          body: JSON.stringify({
            //ingreso el contenido del body y los parametros de mi peticion
            email,
            password,
            nombre,
            apellido,
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
      },
    },
  };
};

export default getState;
