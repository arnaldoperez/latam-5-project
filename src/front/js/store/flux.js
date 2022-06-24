const getState = ({ getStore, getActions, setStore }) => {
  const apiURL = process.env.BACKEND_URL + "/api";

  return {
    store: {
      propuestas: [],
      propuestas_tecnico: [],
      fallas_user: [],
      informes: [],
      detalle_informe: [],
      detalle_tecnico: [],
      detalle_propuesta: [],
      fallas: [],
      detalle: [],
      historialTodos: [],
      historialTecnico: [],
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
      esTecnico: "",
      id_tecnico: "",
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
        const esTecnico = data.esTecnico;
        const id_tecnico = data.id_tecnico;

        setStore({ token, refreshToken, esTecnico, id_tecnico });
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("esTecnico", esTecnico);
        localStorage.setItem("id_tecnico", id_tecnico);
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

        setStore({ token: "", refreshToken: "" });
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
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
      listarCalificacionesTodos: async () => {
        const res = await fetch(`${apiURL}/calificaciones`);
        const listado = await res.json();
        const store = getStore();
        setStore({ historialTodos: listado });
        return store.historialTodos;
      },
      listarCalificacionesTecnico: async (id_tecnico) => {
        const res = await fetch(`${apiURL}/calificaciones/${id_tecnico}`);
        const listado = await res.json();
        const store = getStore();
        setStore({ historialTecnico: listado });
        console.log(store.historialTecnico);
        return store.historialTecnico;
      },
      tecnicoDetalle: async (tecnico_id) => {
        const store = getStore();
        const params = {
          method: "GET", //ingreso el metodo de mi peticion
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
        };
        const res = await fetch(
          process.env.BACKEND_URL + "/api/tecnico/" + tecnico_id,
          params
        );
        const listado = await res.json();

        setStore({ detalle_tecnico: listado });
        return store.detalle_tecnico;
      },
      listarFallas: async () => {
        const store = getStore();
        const params = {
          method: "GET", //ingreso el metodo de mi peticion
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
        };
        const res = await fetch(
          process.env.BACKEND_URL + "/api/fallas",
          params
        );
        const listado = await res.json();

        setStore({ fallas: listado });
        return store.fallas;
      },
      listarFallas_user: async () => {
        const store = getStore();
        const params = {
          method: "GET", //ingreso el metodo de mi peticion
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
        };
        const res = await fetch(
          process.env.BACKEND_URL + "/api/falla_user",
          params
        );
        const listado = await res.json();
        setStore({ fallas_user: listado });
        return store.fallas_user;
      },
      detalleFallas: async (id) => {
        const store = getStore();
        const params = {
          method: "GET", //ingreso el metodo de mi peticion
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
        };
        const res = await fetch(
          process.env.BACKEND_URL + "/api/falla/" + id,
          params
        );
        const datos = await res.json();
        setStore({ detalle: datos });
        return store.detalle;
      },
      detalleInforme: async (id) => {
        const store = getStore();
        const params = {
          method: "GET", //ingreso el metodo de mi peticion
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
        };
        const res = await fetch(
          process.env.BACKEND_URL + "/api/informe/" + id,
          params
        );
        const datos = await res.json();
        setStore({ detalle_informe: datos });
        return store.detalle;
      },

      listarInformes: async () => {
        const store = getStore();
        const params = {
          method: "GET", //ingreso el metodo de mi peticion
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
        };
        const res = await fetch(
          process.env.BACKEND_URL + "/api/informes",
          params
        );
        const listado = await res.json();
        setStore({ informes: listado });
        return store.informes;
      },
      listarPropuestas: async () => {
        const store = getStore();
        const params = {
          method: "GET", //ingreso el metodo de mi peticion
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
        };
        const res = await fetch(`${apiURL}/propuestas`, params);
        const listado = await res.json();
        setStore({ propuestas: listado });
        return store.propuestas;
      },
      listarPropuestasTecnico: async (id) => {
        const store = getStore();
        const params = {
          method: "GET", //ingreso el metodo de mi peticion
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
        };
        const res = await fetch(`${apiURL}/propuesta_user/${id}`, params);
        const listado = await res.json();
        setStore({ propuestas_tecnico: listado });
        return store.propuestas_tecnico;
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
          process.env.BACKEND_URL + "/api/propuestas",
          params
        );
        console.log(resp.status);
        if (resp.status !== 201) {
          return { code: resp.status, msg: resp.statusText };
        }
        //
        return { code: 201, msg: "Propuesta registrada" };
      },

      grabarInforme: async (
        idFalla,
        comentario,
        recomendacion,
        importe,
        imagen
      ) => {
        const store = getStore();
        //mi peticion es asincrona es decir espera por el resultado
        var data = new FormData();

        data.append("comentario", comentario);
        data.append("recomendacion", recomendacion);
        data.append("idFalla", idFalla);
        data.append("importe", importe);
        data.append("imagen", imagen);

        const params = {
          method: "POST", //ingreso el metodo de mi peticion
          body: data,
          headers: {
            Authorization: `Bearer ${store.token}`,
            "Access-Control-Allow-Origin": "*",
          },
        };
        const resp = await fetch(
          process.env.BACKEND_URL + "/api/informe_tecnico",
          params
        );
        console.log(resp.status);
        if (resp.status !== 201) {
          return { code: resp.status, msg: resp.statusText };
        }
        //
        return { code: 201, msg: "Propuesta registrada" };
      },
      grabarFalla: async (titulo, modelo, descripcion, ubicacion, imagen) => {
        const store = getStore();
        //mi peticion es asincrona es decir espera por el resultado
        var data = new FormData();

        data.append("titulo", titulo);
        data.append("modelo", modelo);
        data.append("descripcion", descripcion);
        data.append("ubicacion", ubicacion);
        data.append("imagen", imagen);

        const params = {
          method: "POST", //ingreso el metodo de mi peticion
          body: data,
          headers: {
            Authorization: `Bearer ${store.token}`,
            "Access-Control-Allow-Origin": "*",
          },
        };
        const resp = await fetch(
          process.env.BACKEND_URL + "/api/crear_falla",
          params
        );
        console.log(resp.status);
        if (resp.status !== 201) {
          return { code: resp.status, msg: resp.statusText };
        }
        //
        return { code: 201, msg: "Falla registrada" };
      },
      detallePropuesta: async (id) => {
        const store = getStore();
        const params = {
          method: "GET", //ingreso el metodo de mi peticion
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
        };
        const res = await fetch(
          process.env.BACKEND_URL + "/api/detalle_propuesta/" + id,
          params
        );
        const datos = await res.json();
        setStore({ detalle_propuesta: datos });
        return store.detalle_propuesta;
      },
      grabarInforme: async (
        idFalla,
        comentario,
        recomendacion,
        importe,
        imagen
      ) => {
        const store = getStore();
        //mi peticion es asincrona es decir espera por el resultado
        var data = new FormData();

        data.append("comentario", comentario);
        data.append("recomendacion", recomendacion);
        data.append("idFalla", idFalla);
        data.append("importe", importe);
        data.append("imagen", imagen);

        const params = {
          method: "POST", //ingreso el metodo de mi peticion
          body: data,
          headers: {
            Authorization: `Bearer ${store.token}`,
            "Access-Control-Allow-Origin": "*",
          },
        };
        const resp = await fetch(
          process.env.BACKEND_URL + "/api/informe_tecnico",
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
