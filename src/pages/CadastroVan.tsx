import {
  IonToast,
  IonItem,
  IonLabel,
  IonInput,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonList,
  IonCheckbox,
  IonListHeader,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import React, { useEffect, useReducer, useState } from "react";

import * as yup from 'yup';

import { ApiClient } from "../services/api-client.service";

import carsService from '../services/functions/carsService'

import "./CadastroVan.css";

const CadastroVan: React.FC = () => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const [carModels, setCarModels] = useState([{
    id_model: '',
    name: ''
  }]);

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

  // TODO, yup
  let schema = yup.object().shape({
    carPlate: yup.string().required(),
    carBrand: yup.string().required(),
    carModel: yup.string().required(),
    maxPassengers: yup.number().integer().min(1).max(100).required(),
    isRented: yup.boolean().required(),
    carRentalName: yup.string(), // .required(),
    postalCode: yup.string(), // .required(),
    street: yup.string(), // .required(),
    number: yup.number().integer(), // .required(),
    complement: yup.string(), // .required(),
    city: yup.string(), // .required(),
    state: yup.string(), // .required(),

    // name: yup.string().required(),
    // age: yup.number().required().positive().integer(),
    // email: yup.string().email(),
    // website: yup.string().url(),
    // createdOn: yup.date().default(function () {
    //   return new Date();
    // }),
  });

  const vanForm = {
    carPlate: inputValues.carPlate,
    carBrand: inputValues.carBrand,
    carModel: inputValues.carModel,
    maxPassengers: inputValues.maxPassengers,
    isRented: inputValues.isRented,
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

    if (vanForm.isRented) {
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

  useEffect(() => {
    let isMounted = true

    const getCarsModels = async () => {
      const carModelsRes = await carsService.getAllCarModels()
  
      if (carModelsRes.error) {
        console.log('Houve um erro')
        return
      }
  
      if (carModelsRes.data) {
        if (isMounted) {
          setCarModels(carModelsRes.data)
        }
      }
    }

    getCarsModels()

    return () => { isMounted = false }
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cadastro de veículo</IonTitle>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/perfil' />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList lines="full" class="ion-no-margin">
          <IonListHeader lines="full">
            <IonLabel>Informações do veículo</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel position='floating'>Placa </IonLabel>
            <IonInput
              type='text'
              clearInput
              placeholder='Digite a Placa do Veículo'
              onIonInput={(e: any) => setInputValues({ carPlate: e.target.value })}
            />
          </IonItem>

          {/* <IonItem>
            <IonLabel position='floating'>Marca </IonLabel>
            <IonInput
              type='text'
              clearInput
              placeholder='Digite a Marca do Veículo'
              onIonInput={(e: any) => setInputValues({ carBrand: e.target.value })}
            />
          </IonItem> */}

          <IonItem>
            <IonLabel>Marca</IonLabel>
            <IonSelect value={inputValues.marca}>
              { carModels ? carModels.map((carModel, index) => {
                return (<IonSelectOption key={index} value={carModel.name}>{carModel.name}</IonSelectOption>)
              }) : <></> }
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position='floating'>Modelo </IonLabel>
            <IonInput
              type='text'
              clearInput
              placeholder='Digite o Modelo do Veículo'
              onIonInput={(e: any) => setInputValues({ carModel: e.target.value })}
            />
          </IonItem>

          <IonItem>
            <IonLabel position='floating'>
              Número Máximo de Passageiros 
            </IonLabel>
            <IonInput
              type='text'
              clearInput
              placeholder='Digite o número máximo de passageiros'
              onIonInput={(e: any) => setInputValues({ maxPassengers: e.target.value })}
            />
          </IonItem>
        </IonList>

        <IonList lines="full" class="ion-no-margin">
          <IonListHeader lines="full">
            <IonLabel>Informações do locador</IonLabel>
          </IonListHeader>

          <IonItem>
            <IonLabel>O veículo é alugado?</IonLabel>
            <IonCheckbox checked={inputValues.isRented} onIonChange={e => setInputValues({ isRented: e.detail.checked })} />
          </IonItem>

          {inputValues.isRented && (
            <div>
            <IonItem>
              <IonLabel position="stacked" />
              <IonInput
                type='text'
                clearInput
                placeholder='Nome completo do Locador'
                onIonInput={(e: any) => setInputValues({ carRentalName: e.target.value })}
              />

              <IonInput
                type='text'
                clearInput
                placeholder='Endereço do locador'
                onIonInput={(e: any) => setInputValues({ postalCode: e.target.value })}
              />
              <IonInput
                type='text'
                clearInput
                placeholder='Número'
                onIonInput={(e: any) => setInputValues({ number: e.target.value })}
              />
              <IonInput
                type='text'
                clearInput
                placeholder='Complemento'
                onIonInput={(e: any) => setInputValues({ complement: e.target.value })}
              />
              <IonInput
                type='text'
                clearInput
                placeholder='Cidade'
                onIonInput={(e: any) => setInputValues({ city: e.target.value })}
              />
              <IonInput
                type='text'
                clearInput
                placeholder='Estado'
                onIonInput={(e: any) => setInputValues({ state: e.target.value })}
              />
            </IonItem>
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
        </IonList>

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
