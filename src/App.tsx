import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// importação das páginas
import Login from './pages/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import CadastroVan from './pages/CadastroVan';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Perfil from './pages/Perfil';
import PerfilEditar from './pages/PerfilEditar';
import { search, home, person } from 'ionicons/icons';
import { useState, useContext, useEffect } from 'react';
import React from 'react';

setupIonicReact();

const routes = (
  <>
    <Route exact path="/cadastro" component={Cadastro}></Route>
    <Route exact path="/login" component={Login}></Route>
    <Route exact path="/perfil" component={Perfil}></Route>
    <Route exact path="/perfil/editar" component={PerfilEditar}></Route>
    <Route exact path="/cadastro-van" component={CadastroVan}></Route>
    <Route exact path="/">
      <Redirect to="/cadastro" />
    </Route>
  </>)

interface IUserManager {
  setIsLoggedIn: Function;
}

const user: IUserManager = {
  setIsLoggedIn: () => {}
};

export const UserContext = React.createContext<IUserManager>(user);

const IonicApp: React.FC = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useContext(UserContext);

  user.setIsLoggedIn = setIsLoggedIn;

  return(
  <IonApp>
    <IonReactRouter>
        {isLoggedIn ? (
          <IonTabs>
            <IonRouterOutlet>{routes}</IonRouterOutlet>
            
            <IonTabBar slot="bottom">
              <IonTabButton tab="buscar" href="/buscar">
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
        ) : (<IonRouterOutlet>{routes}</IonRouterOutlet>)}
      </IonReactRouter>
  </IonApp>
  )
}

const App: React.FC = () => {
  return (
    <UserContext.Provider value={user}>
      <IonicApp />
    </UserContext.Provider>
  );
};

export default App;
