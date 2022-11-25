import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonToast,
  IonToolbar,
} from "@ionic/react";

import React, { useEffect, useReducer, useState } from "react";

// import * as yup from 'yup';

import carsService from "../services/functions/carsService";

import * as vehiclesRoutes from "../services/api/vehicles";

import { Color } from "@ionic/core";
import { PageHeader } from "../components/PageHeader";
import { closeToast } from "../services/utils";
import { ModalInfoEntendi, RedirectData } from "../components/ModalInfoEntendi";

const VeiculoCadastro: React.FC = () => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  const [carBrands, setCarBrands] = useState([
    {
      codigo: "",
      nome: "",
    },
  ]);

  const [carModels, setCarModels] = useState([
    {
      codigo: "",
      nome: "",
    },
  ]);

  const [inputValues, setInputValues] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      carPlate: "",
      carBrand: "",
      carModel: "",
      seats_number: 1,
      isRented: false,
      locator_name: "",
      locator_address: "",
      locator_complement: "",
      locator_city: "",
      locator_state: "",
    }
  );

  const clearRentalData = () => {
    setInputValues({
      carRentalName: "",
      complement: "",
      city: "",
      state: "",
    });
  };

  const validateForm = (): boolean => {
    const vehicleForm = {
      carPlate: inputValues.carPlate,
      carBrand: inputValues.carBrand,
      carModel: inputValues.carModel,
      seats_number: inputValues.seats_number,
      isRented: inputValues.isRented,
    };

    if (
      !vehicleForm.carPlate ||
      vehicleForm.carPlate.length !== 7 ||
      !vehicleForm.carPlate.match(/([A-z0-9]){7}/g)
    ) {
      setToastMessage("Placa do veículo inválida!");
      setShowToast(true);
      return false;
    }

    if (!vehicleForm.carBrand) {
      setToastMessage("Marca do veículo é obrigatório");
      setShowToast(true);
      return false;
    }

    if (!vehicleForm.carModel) {
      setToastMessage("Modelo do veículo é obrigatório");
      setShowToast(true);
      return false;
    }

    if (!vehicleForm.seats_number || !parseInt(`${vehicleForm.seats_number}`)) {
      setToastMessage("Número de passageiros inválido");
      setShowToast(true);
      return false;
    }

    if (Number(vehicleForm.seats_number) < 1) {
      setToastMessage("Número de passageiros deve ser positivo!");
      setShowToast(true);
      return false;
    }

    if (vehicleForm.isRented) {
      return validateRentalForm();
    } else {
      clearRentalData();
    }

    return true;
  };

  const validateRentalForm = (): boolean => {
    const locatorForm = {
      locator_name: inputValues.locator_name,
      locator_address: inputValues.locator_address,
      locator_complement: inputValues.locator_complement,
      locator_city: inputValues.locator_city,
      locator_state: inputValues.locator_state,
    };

    if (!locatorForm.locator_name) {
      setToastMessage("Nome do Locador é obrigatório");
      setShowToast(true);
      return false;
    }

    if (
      !locatorForm.locator_city ||
      !locatorForm.locator_city.match(/([A-zà-úÀ-Ú])/g)
    ) {
      setToastMessage("Cidade inválida");
      setShowToast(true);
      return false;
    }

    if (
      !locatorForm.locator_state ||
      !locatorForm.locator_state.match(/([A-zà-úÀ-Ú])/g)
    ) {
      setToastMessage("Estado inválido");
      setShowToast(true);
      return false;
    }

    return true;
  };

  const loadCarModels = async (carBrandId: string) => {
    const carModelsRes = await carsService.getCarModels(carBrandId);

    if (carModelsRes.error) {
      setToastColor("danger");
      setToastMessage(carModelsRes.error.errorMessage);
      setInputValues({ carBrand: "" });
      return;
    }

    if (carModelsRes.data) {
      setCarModels(carModelsRes.data);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [redirectData, setRedirectData] = useState<RedirectData>();

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    // cria registro da vehicle
    await vehiclesRoutes
      .create({
        plate: inputValues.carPlate,
        brand: inputValues.carBrand,
        model: inputValues.carModel,
        seats_number: inputValues.seats_number,
        locator_name: inputValues.locator_name,
        locator_address: inputValues.locator_address,
        locator_complement: inputValues.locator_complement,
        locator_city: inputValues.locator_city,
        locator_state: inputValues.locator_state,
      })
      .then((response) => {
        if (response.status === "error") {
          setToastMessage(response.message);
          setShowToast(true);

          return;
        }

        setShowModal(true)
        setRedirectData({
          url: '/veiculos/meus',
          toastInfo: {
            color: "success",
            message: response.message,
          }
        })

      })
      .catch((err) => {
        setToastColor("danger");
        setToastMessage(err);
        setShowToast(true);
      });
  };

  useEffect(() => {
    let isMounted = true;

    const getCarsBrands = async () => {
      const carBrandsRes = await carsService.getAllCarBrands();

      if (carBrandsRes.error) {
        setToastColor("danger");
        setToastMessage(carBrandsRes.error.errorMessage);
        setShowToast(true);
        return;
      }

      if (carBrandsRes.data) {
        if (isMounted) {
          setCarBrands(carBrandsRes.data);
        }
      }
    };

    getCarsBrands();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <IonPage>
      <PageHeader
        pageName="Cadastro de veículo"
        backButtonPageUrl="/perfil"
      ></PageHeader>

      <IonContent>
        <IonList lines="full" class="ion-no-margin">
          <IonItemDivider color={"primary"}>
            Informações do veículo
          </IonItemDivider>
          <IonItem>
            <IonLabel position="fixed">Placa </IonLabel>
            <IonInput
              type="text"
              clearInput
              maxlength={7}
              onIonChange={(e: any) =>
                setInputValues({ carPlate: e.target.value })
              }
            />
          </IonItem>

          {/* TODO, problema de setState para valores vindos de um evento sendo triggerado por um ion-select */}
          <IonItem>
            <IonLabel>Marca</IonLabel>
            <IonSelect
              onIonChange={(e: any) => {
                setInputValues({ carBrand: e.detail.value });
                loadCarModels(e.detail.value);
              }}
            >
              {carBrands ? (
                carBrands.map((carBrand, index) => {
                  return (
                    <IonSelectOption key={index} value={carBrand.codigo}>
                      {carBrand.nome}
                    </IonSelectOption>
                  );
                })
              ) : (
                <></>
              )}
            </IonSelect>
          </IonItem>

          {inputValues.carBrand ? (
            <IonItem>
              <IonLabel>Modelo</IonLabel>
              <IonSelect
                onIonChange={(e: any) => {
                  setInputValues({ carModel: e.detail.value });
                }}
              >
                {carModels ? (
                  carModels.map((carModel, index) => {
                    return (
                      <IonSelectOption key={index} value={carModel.nome}>
                        {carModel.nome}
                      </IonSelectOption>
                    );
                  })
                ) : (
                  <></>
                )}
              </IonSelect>
            </IonItem>
          ) : (
            <></>
          )}

          <IonItem>
            <IonLabel position="fixed">Nº assentos</IonLabel>
            <IonInput
              type="number"
              min={1}
              clearInput
              onIonChange={(e: any) =>
                setInputValues({ seats_number: e.target.value })
              }
              slot="end"
            />
          </IonItem>
        </IonList>

        <IonItemDivider color={"medium"}>Informações de locação</IonItemDivider>

        <IonList lines="full" class="ion-no-margin">
          <IonItem>
            <IonLabel>O veículo é alugado?</IonLabel>
            <IonCheckbox
              checked={inputValues.isRented}
              onIonChange={(e) =>
                setInputValues({ isRented: e.detail.checked })
              }
            />
          </IonItem>

          {inputValues.isRented && (
            <IonItem>
              <IonLabel position="stacked" />
              <IonInput
                type="text"
                clearInput
                placeholder="Nome completo do Locador"
                onIonChange={(e: any) =>
                  setInputValues({ locator_name: e.target.value })
                }
              />

              <IonInput
                type="text"
                clearInput
                placeholder="Endereço do locador"
                onIonChange={(e: any) =>
                  setInputValues({ locator_address: e.target.value })
                }
              />
              <IonInput
                type="text"
                clearInput
                placeholder="Complemento"
                onIonChange={(e: any) =>
                  setInputValues({ locator_complement: e.target.value })
                }
              />
              <IonInput
                type="text"
                clearInput
                placeholder="Cidade"
                onIonChange={(e: any) =>
                  setInputValues({ locator_city: e.target.value })
                }
              />
              <IonInput
                type="text"
                clearInput
                placeholder="Estado"
                onIonChange={(e: any) =>
                  setInputValues({ locator_state: e.target.value })
                }
              />
            </IonItem>
          )}
        </IonList>

        {/* <ModalInfoEntendi id="modal-info" isOpen={showModal} messages={['Veículo cadastrado com sucesso!', 'Obs.: para criar um itinerário, você precisa enviar os documentos do veículo em "Meus Veículos" e aguardar a aprovação.']} redirectData={redirectData} /> */}
        <ModalInfoEntendi isOpen={showModal} messages={['Veículo cadastrado com sucesso!', 'Obs.: para criar um itinerário, você precisa enviar os documentos do veículo em "Meus Veículos" e aguardar a aprovação.']} redirectData={redirectData} />

        <IonToast
          position="top"
          color={toastColor}
          isOpen={showToast}
          onDidDismiss={() => closeToast(setShowToast)}
          message={toastMessage}
          duration={2500}
        />
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonButton onClick={handleSubmit} expand="full">Cadastrar</IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default VeiculoCadastro;
