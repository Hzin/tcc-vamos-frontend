import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { useContext, useState } from "react";
import { Redirect, Route } from "react-router-dom";

import { home, person, search } from "ionicons/icons";

// importação das páginas
import Cadastro from "./pages/Cadastro";
import CadastroCompletar from "./pages/CadastroCompletar/CadastroCompletar";
import CompletarDocumento from "./pages/CadastroCompletar/CompletarDocumento";
import CompletarTelefone from "./pages/CadastroCompletar/CompletarTelefone";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import PerfilEditar from "./pages/PerfilEditar";

import CadastrarItinerario from "./pages/CadastrarItinerario";
import MeusItinerarios from "./pages/MeusItinerarios";
import MeusVeiculos from "./pages/MeusVeiculos";
import Veiculo from "./pages/Veiculo";
import VeiculoCadastro from "./pages/VeiculoCadastro";

import BuscarItinerario from "./pages/BuscarItinerario";
import BuscarPassageiro from "./pages/BuscarPassageiro";
import ListaItinerarios from "./pages/ListaItinerarios";

import Buscas from "./pages/Buscas";
import Viagem from "./pages/Viagem";

import ModerarDocumentos from "./pages/ModerarDocumentos";

import EditarItinerario from "./pages/EditarItinerario";
import Itinerario from "./pages/Itinerario";

import ItinerarioContratos from "./pages/ItinerarioContratos";
import ContratoResumo from "./pages/ContratoResumo";

import Contrato from "./pages/Contrato";
import ListaDePresenca from "./pages/ListaDePresenca";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import './theme/custom-tab-bar.css';
import "./theme/variables.css";

/* Tailwind styles */
import "./theme/tailwind.css";

setupIonicReact();

const routes = (
  <>
    <Route exact path="/cadastro" component={Cadastro}></Route>
    <Route exact path="/perfil/completar" component={CadastroCompletar}></Route>
    <Route
      exact
      path="/perfil/completar/documento"
      component={CompletarDocumento}
    ></Route>
    <Route
      exact
      path="/perfil/completar/telefone"
      component={CompletarTelefone}
    ></Route>

    <Route exact path="/home" component={Home}></Route>
    <Route exact path="/login" component={Login}></Route>
    <Route exact path="/perfil" component={Perfil}></Route>
    <Route exact path="/usuario/:id" component={Perfil}></Route>

    <Route exact path="/perfil/editar" component={PerfilEditar}></Route>

    <Route exact path="/veiculos/cadastrar" component={VeiculoCadastro}></Route>
    <Route exact path="/veiculos/meus" component={MeusVeiculos}></Route>
    <Route
      exact
      path="/cadastrar-itinerario"
      component={CadastrarItinerario}
    ></Route>
    <Route exact path="/veiculo" component={Home}></Route>
    <Route exact path="/veiculo/placa" component={Home}></Route>
    <Route exact path="/veiculo/placa/:id" component={Veiculo}></Route>

    <Route exact path="/itinerario/meus" component={MeusItinerarios}></Route>
    <Route exact path="/itinerario/id/:id" component={Itinerario}></Route>
    <Route exact path="/itinerario/id/:id/editar" component={EditarItinerario}></Route>

    <Route exact path="/buscas" component={Buscas}></Route>
    <Route exact path="/buscar/itinerario" component={BuscarItinerario}></Route>
    <Route exact path="/buscar/passageiro" component={BuscarPassageiro}></Route>
    <Route exact path="/buscar/itinerario/lista" component={ListaItinerarios}></Route>

    <Route exact path="/viagem" component={Home}></Route>
    <Route exact path="/viagem/:id" component={Viagem}></Route>

    <Route exact path="/documentos/moderar" component={ModerarDocumentos}></Route>

    <Route exact path="/itinerario/id/:id/contratos" component={ItinerarioContratos}></Route>
    <Route exact path="/itinerario/id/:id/contratos/resumo" component={ContratoResumo}></Route>

    <Route exact path="/viagem/id/:id" component={Viagem}></Route>
    <Route exact path="/contrato/id/:id" component={Contrato}></Route>
    <Route exact path="/viagem/id/:id/presenca" component={ListaDePresenca}></Route>

    <Route exact path="/">
      <Redirect to="/home" />
    </Route>
  </>
);

interface IUserManager {
  setIsLoggedIn: Function;
}

const user: IUserManager = {
  setIsLoggedIn: () => { },
};

export const UserContext = React.createContext<IUserManager>(user);

const IonicApp: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useContext(UserContext);

  user.setIsLoggedIn = setIsLoggedIn;

  return (
    <IonApp>
      <IonReactRouter>
        {isLoggedIn ? (
          <IonTabs>
            <IonRouterOutlet>{routes}</IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="buscar" href="/buscas">
                <IonIcon icon={search} />
                <IonLabel>Buscar</IonLabel>
              </IonTabButton>
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="perfil" href="/perfil">
                <IonIcon icon={person} />
                <IonLabel>Perfil</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        ) : (
          <IonRouterOutlet>{routes}</IonRouterOutlet>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

const App: React.FC = () => {
  return (
    <UserContext.Provider value={user}>
      <IonicApp />
    </UserContext.Provider>
  );
};

export default App;
