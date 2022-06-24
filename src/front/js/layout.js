import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import ListadoFallas from "./pages/ListadoFallas";
import DetalleFallas from "./pages/DetalleFallas";
import DetallePropuesta from "./pages/DetallePropuesta";
import FormInfoTecnico from "./pages/FormInfoTecnico";
import ListadoPropuestas from "./pages/ListadoPropuestas";
import ListadoInformes from "./pages/ListadoInformes";
import FormCrearFallas from "./pages/FormCrearFallas";
import ProfileTecnico from "./pages/ProfileTecnico";
import DetalleInforme from "./pages/DetalleInforme";
import injectContext, { Context } from "./store/appContext";
import { SignUp } from "./pages/signUp";
import { SignUp_Tech } from "./pages/signUp_Tech";
import { Profile } from "./pages/Profile";
import { Logout } from "./pages/logout";

import { Navbarr } from "./component/navbar";
import { Footer } from "./component/footer";
import { Login } from "./component/login";
import { NavbarProtected } from "./component/navbarProtected";
import { HomeProtected } from "./pages/homeProtected";

import { SubidaPrueba } from "./pages/subirImagen";

import { Landing } from "./pages/landing";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";
  //const { store, actions } = useContext(Context);

  //function navbar() {
  //  if (store.token) {
  //    return <NavbarProtected />;
  //  } else {
  //    return <Navbar />;
  //  }
  //}

  //function home() {//
  //  if (store.token) {
  //    return <HomeProtected />;
  //  } else {
  //    return <Home />;
  //  }
  //}

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbarr />
          <Switch>
            <Route exact path="/tecnicos">
              <SignUp_Tech />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/calificaciones">
              <Profile />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/demo">
              <Demo />
            </Route>
            <Route exact path="/single/:theid">
              <Single />
            </Route>
            <Route exact path="/fallas">
              <ListadoFallas />
            </Route>
            <Route exact path="/falla/:id">
              <DetalleFallas />
            </Route>
            <Route exact path="/crear_informe">
              <FormInfoTecnico />
            </Route>
            <Route exact path="/crear_falla">
              <FormCrearFallas />
            </Route>
            <Route exact path="/informes">
              <ListadoInformes />
            </Route>
            <Route exact path="/propuestas">
              <ListadoPropuestas />
            </Route>
            <Route exact path="/propuesta/:id">
              <DetallePropuesta />
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>
            <Route exact path="/subidaprueba">
              <SubidaPrueba />
            </Route>
            <Route exact path="/detalle_informe/:id">
              <DetalleInforme />
            </Route>
            <Route exact path="/perfil_tecnico">
              <ProfileTecnico />
            </Route>
            <Route>
              <h1>Not found!</h1>
            </Route>
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
