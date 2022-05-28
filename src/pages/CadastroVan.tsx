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
  IonText,
  IonRadioGroup,
  IonRadio
} from "@ionic/react";

import React, { useReducer, useState } from "react";

import { ApiClient } from "../services/api-client.service";

import "./CadastroVan.css";

const CadastroVan: React.FC = () => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const [inputValues, setInputValues] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      carPlate: '',
      carBrand: '',
      carModel: '',
      maxPassengers: 1,
      isRent: false,
      carRentalName: '',
      postalCode: '',
      street: '',
      number: '',
      complement: '',
      city: '',
      state: '',
    }
  );

  const vanForm = {
    carPlate: inputValues.carPlate,
    carBrand: inputValues.carBrand,
    carModel: inputValues.carModel,
    maxPassengers: inputValues.maxPassengers,
    isRent: inputValues.isRent,
    carRentalName: inputValues.carRentalName,
    carRentalAddress: {
      postalCode: inputValues.postalCode,
      street: inputValues.street,
      number: inputValues.number,
      complement: inputValues.complement,
      city: inputValues.city,
      state: inputValues.state,
    }
  };

  const clearRentalData = () => {
    setInputValues({
        carPlate: '',
        carBrand: '',
        carModel: '',
        maxPassengers: 1,
        isRent: false,
        carRentalName: '',
        postalCode: '',
        street: '',
        number: '',
        complement: '',
        city: '',
        state: '',
    })
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
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/perfil' />
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
              onIonInput={(e: any) => setInputValues({ carPlate: e.target.value })}
            />
          </IonItem>

          <IonItem>
            <IonLabel position='floating'>Marca *</IonLabel>
            <IonInput
              type='text'
              clearInput
              placeholder='Digite a Marca do Veículo'
              onIonInput={(e: any) => setInputValues({ carBrand: e.target.value })}
            />
          </IonItem>

          <IonItem>
            <IonLabel position='floating'>Modelo *</IonLabel>
            <IonInput
              type='text'
              clearInput
              placeholder='Digite o Modelo do Veículo'
              onIonInput={(e: any) => setInputValues({ carModel: e.target.value })}
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
              onIonInput={(e: any) => setInputValues({ maxPassengers: e.target.value })}
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
                  onIonChange={(e: any) => setInputValues({ isRent: e.target.value })}
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

          {inputValues.isRent && (
            <div>
              <IonItem>
                <IonLabel position='floating'>Nome do Locador *</IonLabel>
                <IonInput
                  type='text'
                  clearInput
                  placeholder='Digite o nome do locador do veículo'
                  onIonInput={(e: any) => setInputValues({ carRentalName: e.target.value })}
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
                    onIonInput={(e: any) => setInputValues({ postalCode: e.target.value })}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position='floating'>Logradouro*</IonLabel>
                  <IonInput
                    type='text'
                    clearInput
                    placeholder='Digite o nome da rua'
                    onIonInput={(e: any) => setInputValues({ street: e.target.value })}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position='floating'>Número*</IonLabel>
                  <IonInput
                    type='text'
                    clearInput
                    placeholder='Digite o número'
                    onIonInput={(e: any) => setInputValues({ number: e.target.value })}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position='floating'>Complemento*</IonLabel>
                  <IonInput
                    type='text'
                    clearInput
                    placeholder='Digite o endereço completo'
                    onIonInput={(e: any) => setInputValues({ complement: e.target.value })}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position='floating'>Cidade*</IonLabel>
                  <IonInput
                    type='text'
                    clearInput
                    placeholder='Digite a cidade'
                    onIonInput={(e: any) => setInputValues({ city: e.target.value })}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position='floating'>Estado*</IonLabel>
                  <IonInput
                    type='text'
                    clearInput
                    placeholder='Digite o estado'
                    onIonInput={(e: any) => setInputValues({ state: e.target.value })}
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
