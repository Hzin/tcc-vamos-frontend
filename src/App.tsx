import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Cadastro from './pages/Cadastro/Cadastro';
import MainPages from './pages/MainPages';

// importação das páginas
import Login from './pages/Login';

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
import BuscarPassageiro from './pages/BuscarPassageiro/BuscarPassageiro';
import Transportes from './pages/Transportes/Transportes';
import BuscarTransporte from './pages/BuscarTransporte/BuscarTransporte';
// import Tabs from './components/Tabs';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      
        <IonRouterOutlet>
          <Route exact path="/mainpages" component={MainPages}></Route>
          <Route exact path="/cadastro" component={Cadastro}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/buscar-passageiro" component={BuscarPassageiro}></Route>
          {/* <Route exact path="/buscar-transporte" component={BuscarTransporte}></Route> */}
          <Route exact path="/transportes" component={Transportes}></Route>
          <Route exact path="/">
            <Redirect to="/mainpages" />
          </Route>
        </IonRouterOutlet>
        
    </IonReactRouter>
  </IonApp>
);

export default App;
