const apiURL = process.env.BACKEND_URL + "/api";
const getState = ({ getStore, getActions, setStore }) => {
  const apiURL = process.env.BACKEND_URL + "/api";
  return {
    store: {
      propuestas: [],
      fallas: [],
      detalle: [],
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

      signUpTech: async (historial, ubicacion, descripcion, url) => {
        const store = getStore();
        //mi peticion es asincrona es decir espera por el resultado
        console.log(historial, ubicacion, descripcion, url);

        const params = {
          method: "POST", //ingreso el metodo de mi peticion
          body: JSON.stringify({
            //ingreso el contenido del body y los parametros de mi peticion
            historial,
            ubicacion,
            descripcion,
            url,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
        };
        const resp = await fetch(`${apiURL}/tecnicos`, params); //esperar a mi peticion mediante la funcion fetch con los parametros en el cuerpo y encabezado del mensaje para realizar el sgnup en este caso se busca regitrar un usuario
        if (resp.status !== 201) {
          return { code: resp.status, msg: resp.statusText };
        }
        //
        return { code: 201, msg: "Tecnico registrado" };
      },

      listarFallas: async () => {
        const res = await fetch(process.env.BACKEND_URL + "/api/fallas");
        const listado = await res.json();
        const store = getStore();
        setStore({ fallas: listado });
        return store.fallas;
      },
      detalleFallas: async (id) => {
        const res = await fetch(process.env.BACKEND_URL + "/api/falla/" + id);
        const datos = await res.json();
        const store = getStore();
        setStore({ detalle: datos });
        return store.detalle;
      },
      listarPropuestas: async () => {
        const res = await fetch(process.env.BACKEND_URL + "/api/propuestas");
        const listado = await res.json();
        const store = getStore();
        setStore({ propuestas: listado });
        return store.propuestas;
      },
      listarPropuestas: async () => {
        const res = await fetch(process.env.BACKEND_URL + "/api/propuestas");
        const listado = await res.json();
        const store = getStore();
        setStore({ propuestas: listado });
        return store.propuestas;
      },
      grabarPropuesta: async (detalle, costo_servicio, estado, id_falla) => {
        const store = getStore();
        //mi peticion es asincrona es decir espera por el resultado
        console.log(detalle, costo_servicio, estado, id_falla);

        const params = {
          method: "POST", //ingreso el metodo de mi peticion
          body: JSON.stringify({
            //ingreso el contenido del body y los parametros de mi peticion
            detalle,
            costo_servicio,
            estado,
            id_falla,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
        };
        const resp = await fetch(
          process.env.BACKEND_URL + "/api/propuesta",
          params
        );
        console.log(resp.status);
        if (resp.status !== 201) {
          return { code: resp.status, msg: resp.statusText };
        }
        //
        return { code: 201, msg: "Propuesta registrada" };
      },
    },
  };
};

export default getState;
