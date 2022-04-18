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
  IonText,
  IonList,
  IonRadioGroup,
  IonListHeader,
  IonRadio
} from "@ionic/react";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { ApiClient } from "../services/api-client.service";
import { arrowBack } from "ionicons/icons";
import "./CadastroVan.css";

const CadastroVan: React.FC = () => {
  const {
    handleSubmit,
    control,
    setValue,
    register,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      carPlate: "",
      carBrand: "",
      carModel: "",
      maxPassengers: "",
      isRent: "NO"
    }
  });

  useEffect(() => {

  },[]);

  const onSubmit = async (van: any) => {
    await ApiClient.doPost("/cadastro-van", van);
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
        <form onSubmit={handleSubmit(onSubmit)} className='ion-padding'>
          <IonCardTitle>Cadastro do Veículo</IonCardTitle>

          <IonItem>
            <IonLabel position='floating'>Placa *</IonLabel>
            <IonInput
              {...register("carPlate", { required: "Placa é obrigatório" })}
              type='text'
              placeholder='Digite a Placa do Veículo'
            />
          </IonItem>
          <ErrorMessage
            errors={errors}
            name='carPlate'
            as={<div style={{ color: "red" }} />}
          />

          <IonItem>
            <IonLabel position='floating'>Marca *</IonLabel>
            <IonInput
              {...register("carBrand", { required: "Marca é obrigatório" })}
              type='text'
              placeholder='Digite a Marca do Veículo'
            />
          </IonItem>
          <ErrorMessage
            errors={errors}
            name='carBrand'
            as={<div style={{ color: "red" }} />}
          />

          <IonItem>
            <IonLabel position='floating'>Modelo *</IonLabel>
            <IonInput
              {...register("carModel", { required: "Modelo é obrigatório" })}
              type='text'
              placeholder='Digite o Modelo do Veículo'
            />
          </IonItem>
          <ErrorMessage
            errors={errors}
            name='carModel'
            as={<div style={{ color: "red" }} />}
          />

          <IonItem>
            <IonLabel position='floating'>
              Número Máximo de Passageiros *
            </IonLabel>
            <IonInput
              {...register("maxPassengers", {
                required: "Número máximo de passageiros é obrigatório"
              })}
              type='text'
              placeholder='Digite o número máximo de passageiros'
            />
          </IonItem>
          <ErrorMessage
            errors={errors}
            name='maxPassengers'
            as={<div style={{ color: "red" }} />}
          />

          <IonItem>
            <IonText>
              <div style={{ padding: 8, paddingLeft: 0, fontWeight: "bold" }}>
                Veículo alugado?
              </div>
              <div>
                <IonRadioGroup
                  style={{ display: "flex", width: "100%" }}
                  {...register("isRent", { required: true })}
                  defaultValue={getValues("isRent")}
                  onIonChange={e => setValue("isRent", e.detail.value)}
                >
                  <IonItem lines='none' style={{ flexGrow: 2 }}>
                    <IonLabel position='fixed'>Sim</IonLabel>
                    <IonRadio value='YES' />
                  </IonItem>

                  <IonItem style={{ flexGrow: 2 }} lines='none'>
                    <IonLabel position='fixed'>Não</IonLabel>
                    <IonRadio value='NO' />
                  </IonItem>
                </IonRadioGroup>
              </div>
            </IonText>
          </IonItem>
          {errors.isRent && (
            <span className='error-msg'>This field is required</span>
          )}

          {getValues("isRent") === "YES" && <div>Teste Novos Campos</div>}

          <div>
            <IonButton className='ion-margin-top' type='submit' expand='block'>
              Salvar
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CadastroVan;
