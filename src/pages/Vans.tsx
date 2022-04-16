import {
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonToolbar,
  IonTitle,
  IonList,
  IonRadioGroup,
  IonListHeader,
  IonRadio
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { useState } from "react";
//import { Van } from "../models/van.model";
import "./Vans.css";

const Vans: React.FC = () => {
  // const van: Van;

  const [placa, setPlaca] = useState<string>("");
  const [marca, setMarca] = useState<string>("");
  const [modelo, setModelo] = useState<string>("");
  const [numPassageiros, setNumPassageiros] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState<string>("Não");

  const placaChangeHandle = (event: any) => {
    setPlaca(event.target.value);
  };

  const marcaChangeHandle = (event: any) => {
    setMarca(event.target.value);
  };

  const modeloChangeHandle = (event: any) => {
    setModelo(event.target.value);
  };

  const numPassageirosChangeHandle = (event: any) => {
    setNumPassageiros(event.target.value);
  };

  const tipoSelecionadoChangeHandle = (event: any) => {
    setTipoSelecionado(event.target.value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
          <IonButtons slot='start'>
            <IonBackButton
              text={""}
              icon={arrowBack}
              defaultHref='cadastro-van'
            >
              Return
            </IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>
        <form className='ion-padding'>
          <IonCardTitle>Cadastro da Veículo</IonCardTitle>

          <IonItem>
            <IonLabel position='floating'>Placa *</IonLabel>
            <IonInput
              type='text'
              required
              value={placa}
              placeholder='Digite a placa do Veículo'
              onIonChange={placaChangeHandle}
              //onIonChange={e => setPlaca(e.detail.value!)}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position='floating'>Marca *</IonLabel>
            <IonInput
              type='text'
              required
              value={marca}
              placeholder='Digite a Marca do Veículo'
              onIonChange={marcaChangeHandle}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position='floating'>Modelo *</IonLabel>
            <IonInput
              type='text'
              required
              value={modelo}
              placeholder='Digite o Modelo do Veículo'
              onIonChange={modeloChangeHandle}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position='floating'>
              Digite o número total de passageiros *
            </IonLabel>
            <IonInput
              type='number'
              required
              value={numPassageiros}
              placeholder='Digite o número total de passageiros'
              onIonChange={numPassageirosChangeHandle}
            ></IonInput>
          </IonItem>

          <IonList>
            <IonRadioGroup
              value={tipoSelecionado}
              onIonChange={tipoSelecionadoChangeHandle}
            >
              <IonListHeader>
                <IonLabel>Veículo Alugado ?</IonLabel>
              </IonListHeader>

              <IonItem>
                <IonLabel>Sim</IonLabel>
                <IonRadio slot='start' value='Sim'></IonRadio>
              </IonItem>

              <IonItem>
                <IonLabel>Não</IonLabel>
                <IonRadio slot='start' value='Não'></IonRadio>
              </IonItem>
            </IonRadioGroup>
          </IonList>

          <IonButton className='ion-margin-top' type='submit' expand='block'>
            Salvar
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Vans;
