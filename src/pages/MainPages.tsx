import React, { useState, useRef } from 'react';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonPage,
  IonIcon,
  IonRouterOutlet
} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { search, home, person } from 'ionicons/icons';

import Home from './Home';
import BuscarPassageiro from './BuscarPassageiro/BuscarPassageiro';

export const MainPages: React.FC = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/home" exact={true}>
          <Home />
        </Route>
        <Route path="/buscar" exact={true}>
          <BuscarPassageiro />
        </Route>
        <Route path="/buscar" exact={true}>
          <BuscarPassageiro />
        </Route>
        <Route path="/mainpages" render={() => <Redirect to="/buscar
        " />} />
      </IonRouterOutlet>

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
  )
}

export default MainPages;