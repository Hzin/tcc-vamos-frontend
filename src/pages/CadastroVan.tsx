import {
  IonToast,
  IonItem,
  IonLabel,
  IonInput,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonText,
  IonRadioGroup,
  IonRadio
} from "@ionic/react";

import React, { useState } from "react";

import { ApiClient } from "../services/api-client.service";
import { arrowBack } from "ionicons/icons";
import "./CadastroVan.css";


const CadastroVan: React.FC = () => {

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const [carPlate, setCarPlate] = useState<string>("");
  const [carBrand, setCarBrand] = useState<string>("");
  const [carModel, setCarModel] = useState<string>("");
  const [maxPassengers, setMaxPassengers] = useState<number>(1);
  const [isRent, setIsRent] = useState<boolean>(false);
  const [carRentalName, setCarRentalName] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [complement, setComplement] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");

  const vanForm = {
    carPlate,
    carBrand,
    carModel,
    maxPassengers,
    isRent,
    carRentalName,
    carRentalAddress: {
      postalCode,
      street,
      number,
      complement,
      city,
      state
    }
  };

  const clearRentalData = () => {
    setCarRentalName("");
    setPostalCode("");
    setStreet("");
    setNumber("");
    setComplement("");
    setCity("");
    setState("");
  };

  const validateForm = (): boolean => {
    if (
      !vanForm.carPlate ||
      vanForm.carPlate.length !== 7 ||
      !vanForm.carPlate.match(/([A-z0-9]){7}/g)
    ) {
      setToastMessage("Placa do veículo inválida!");
      setShowToast(true);
      return false;
    }

    if (!vanForm.carBrand) {
      setToastMessage("Marca do veículo é obrigatório");
      setShowToast(true);
      return false;
    }

    if (!vanForm.carModel) {
      setToastMessage("Modelo do veículo é obrigatório");
      setShowToast(true);
      return false;
    }

    if (!vanForm.maxPassengers || !parseInt(`${vanForm.maxPassengers}`)) {
      setToastMessage("Número de passageiros inválido");
      setShowToast(true);
      return false;
    }

    if (vanForm.isRent) {
      return validateRentalForm();
    } else {
      clearRentalData();
    }

    return true;
  };

  const validateRentalForm = (): boolean => {
    if (!vanForm.carRentalName) {
      setToastMessage("Nome do Locador é obrigatório");
      setShowToast(true);
      return false;
    }

    if (
      !vanForm.carRentalAddress.postalCode ||
      vanForm.carRentalAddress.postalCode.length !== 8 ||
      !vanForm.carRentalAddress.postalCode.match(/([0-9]){8}/g)
    ) {
      setToastMessage("Cep inválido");
      setShowToast(true);
      return false;
    }

    if (
      !vanForm.carRentalAddress.number ||
      !parseInt(`${vanForm.carRentalAddress.number}`)
    ) {
      setToastMessage("Número inválido");
      setShowToast(true);
      return false;
    }

    if (
      !vanForm.carRentalAddress.city ||
      !vanForm.carRentalAddress.city.match(/([A-zà-úÀ-Ú])/g)
    ) {
      setToastMessage("Cidade inválido");
      setShowToast(true);
      return false;
    }

    if (
      !vanForm.carRentalAddress.state ||
      !vanForm.carRentalAddress.state.match(/([A-zà-úÀ-Ú])/g)
    ) {
      setToastMessage("Estado inválido");
      setShowToast(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      await ApiClient.doPost("/cadastro-van", vanForm);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle>VanMos App v1.0</IonTitle>
          <IonButtons slot='start'>
            <IonBackButton icon={arrowBack} defaultHref='cadastro-van'>
              Return
            </IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>
        <form className='ion-padding'>
          <IonCardTitle>Cadastro do Veículo</IonCardTitle>

          <IonItem>
            <IonLabel position='floating'>Placa *</IonLabel>
            <IonInput
              type='text'
              clearInput
              placeholder='Digite a Placa do Veículo'
              onIonInput={(e: any) => setCarPlate(e.target.value)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position='floating'>Marca *</IonLabel>
            <IonInput
              type='text'
              clearInput
              placeholder='Digite a Marca do Veículo'
              onIonInput={(e: any) => setCarBrand(e.target.value)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position='floating'>Modelo *</IonLabel>
            <IonInput
              type='text'
              clearInput
              placeholder='Digite o Modelo do Veículo'
              onIonInput={(e: any) => setCarModel(e.target.value)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position='floating'>
              Número Máximo de Passageiros *
            </IonLabel>
            <IonInput
              type='text'
              clearInput
              placeholder='Digite o número máximo de passageiros'
              onIonInput={(e: any) => setMaxPassengers(e.target.value)}
            />
          </IonItem>

          <IonItem>
            <IonText>
              <div style={{ padding: 8, paddingLeft: 0, fontWeight: "bold" }}>
                Veículo alugado?
              </div>
              <div>
                <IonRadioGroup
                  style={{ display: "flex", width: "100%" }}
                  onIonChange={(e: any) => setIsRent(e.target.value)}
                >
                  <IonItem lines='none' style={{ flexGrow: 2 }}>
                    <IonLabel position='fixed'>Sim</IonLabel>
                    <IonRadio value={true} />
                  </IonItem>

                  <IonItem style={{ flexGrow: 2 }} lines='none'>
                    <IonLabel position='fixed'>Não</IonLabel>
                    <IonRadio value={false} />
                  </IonItem>
                </IonRadioGroup>
              </div>
            </IonText>
          </IonItem>

          {isRent && (
            <div>
              <IonItem>
                <IonLabel position='floating'>Nome do Locador *</IonLabel>
                <IonInput
                  type='text'
                  clearInput
                  placeholder='Digite o nome do locador do veículo'
                  onIonInput={(e: any) => setCarRentalName(e.target.value)}
                />
              </IonItem>
              <IonText>
                <div
                  style={{ padding: 8, paddingLeft: 16, fontWeight: "bold" }}
                >
                  Endereço do Locador
                </div>
                <IonItem>
                  <IonLabel position='floating'>CEP*</IonLabel>
                  <IonInput
                    type='text'
                    clearInput
                    placeholder='Digite o endereço completo do locador do veículo'
                    onIonInput={(e: any) => setPostalCode(e.target.value)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position='floating'>Logradouro*</IonLabel>
                  <IonInput
                    type='text'
                    clearInput
                    placeholder='Digite o nome da rua'
                    onIonInput={(e: any) => setStreet(e.target.value)}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position='floating'>Número*</IonLabel>
                  <IonInput
                    type='text'
                    clearInput
                    placeholder='Digite o número'
                    onIonInput={(e: any) => setNumber(e.target.value)}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position='floating'>Complemento*</IonLabel>
                  <IonInput
                    type='text'
                    clearInput
                    placeholder='Digite o endereço completo'
                    onIonInput={(e: any) => setComplement(e.target.value)}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position='floating'>Cidade*</IonLabel>
                  <IonInput
                    type='text'
                    clearInput
                    placeholder='Digite a cidade'
                    onIonInput={(e: any) => setCity(e.target.value)}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position='floating'>Estado*</IonLabel>
                  <IonInput
                    type='text'
                    clearInput
                    placeholder='Digite o estado'
                    onIonInput={(e: any) => setState(e.target.value)}
                  />
                </IonItem>
              </IonText>
            </div>
          )}

          <div>
            <IonButton
              className='ion-margin-top'
              expand='block'
              onClick={handleSubmit}
            >
              Salvar
            </IonButton>
          </div>
        </form>
        <IonToast
          color='danger'
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2500}
        />
      </IonContent>
    </IonPage>
  );
};

export default CadastroVan;
