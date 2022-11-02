
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonText,
  IonCheckbox,
  IonFooter,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { IonGrid } from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  IonLabel,
} from "@ionic/react";

import { PageHeader } from "../components/PageHeader";

import * as itinerariesService from "../services/functions/itinerariesService";
import { Itinerary } from "../models/itinerary.model";
import { CardItinerary } from "../components/CardItinerary";
import { convertNumberToPrice, getUserFullName } from "../services/utils";
import { itineraryContractTypes } from "../constants/itineraryContractTypes";

interface ScanNewProps {
  match: {
    params: {
      id: string;
    };
  };
}

const ItinerarioContratos: React.FC<ScanNewProps> = (props) => {
  const [itinerary, setItinerary] = useState<Itinerary>()
  const [selectedContract, setSelectedContract] = useState<itineraryContractTypes>()

  const history = useHistory();

  useEffect(() => {
    loadItineraryData()
  }, [])

  const loadItineraryData = async () => {
    const itineraryId = props.match.params.id;
    const itinerary = await itinerariesService.getById(itineraryId)
    setItinerary(itinerary)
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {itinerary && (
          <>
            <PageHeader pageName="Contratos" backButtonPageUrl={`/itinerario/${itinerary.id_itinerary}`} />

            <IonGrid>
              <CardItinerary itinerary={itinerary} onlyHeader />

              <IonCard>
                <IonCardContent>
                  <IonLabel slot='end'>Escolha o contrato desejado</IonLabel>
                </IonCardContent>
              </IonCard>

              <IonCard button onClick={() => { setSelectedContract(itineraryContractTypes.recurring) }}>
                <IonCardHeader>
                  <IonCardSubtitle className="flex justify-between">
                    <div />
                    <div>
                      <IonCheckbox disabled checked={selectedContract === itineraryContractTypes.recurring} />
                    </div>
                  </IonCardSubtitle>
                  <IonCardTitle>Contrato: Recorrente </IonCardTitle>
                  {/* <IonCardSubtitle>Renovação: 22/09/2022 </IonCardSubtitle> */}
                </IonCardHeader>
                <IonCardContent>
                  <div>
                    <h2>
                      O Contrato Recorrente é o plano mensal de vínculo do itinerário do motorista <IonText color="primary">{getUserFullName(itinerary.user)}</IonText>,
                      {' '}portador do documento de tipo <IonText color="primary">{itinerary.user.document_type}</IonText> <IonText color="primary">{itinerary.user.document}</IonText>,
                      {' '}ao passageiro (Nome do passageiro) no valor pré estabelecido de <IonText color="primary">{itinerary.user.document}{convertNumberToPrice(itinerary.monthly_price)}</IonText>
                      {' '}a ser pago mensalmente no dia <IonText color="primary">1</IonText> e o contrato é renovado a cada mês até o seu encerramento.
                    </h2>
                  </div>
                  <div className="mt-4">
                    <h2>
                      O pagamento é feito diretamente ao motorista, e o mesmo atualizará o status do contrato do itinerário pelo aplicativo.
                    </h2>
                  </div>
                </IonCardContent>
              </IonCard>

              <IonCard button onClick={() => { setSelectedContract(itineraryContractTypes.avulse) }} disabled={!itinerary.accept_daily}>
                <IonCardHeader>
                  <IonCardSubtitle className="flex justify-between">
                    <div />
                    <div>
                      {/* <IonCheckbox disabled={!itinerary.accept_daily} checked={selectedContract === itineraryContractTypes.avulse} /> */}
                      <IonCheckbox disabled checked={selectedContract === itineraryContractTypes.avulse} />
                    </div>
                  </IonCardSubtitle>
                  <IonCardTitle>Contrato: Vaga Avulsa </IonCardTitle>
                  {/* <IonCardSubtitle>Renovação: 22/09/2022 </IonCardSubtitle> */}
                </IonCardHeader>
                <IonCardContent>
                  <div>
                    <h2>
                      O Contrato Vaga Avulsa é o plano de uma vaga única em uma viagem do itinerário do motorista <IonText color="primary">{getUserFullName(itinerary.user)}</IonText>,
                      {' '}portador do documento de tipo <IonText color="primary">{itinerary.user.document_type}</IonText> <IonText color="primary">{itinerary.user.document}</IonText>,
                      {' '}ao passageiro (Nome do passageiro) no valor pré estabelecido {itinerary.accept_daily && (<> de <IonText color="primary">{itinerary.user.document}{convertNumberToPrice(itinerary.daily_price)}</IonText> </>)}
                      {' '}a ser pago no dia desejado.
                    </h2>
                  </div>
                  <div className='mt-4'>
                    <h2>
                      O contrato é encerrado automaticamente no dia seguinte.
                    </h2>
                  </div>
                  <div className='mt-4'>
                    <h2>
                      O pagamento é feito diretamente ao motorista, e o mesmo atualizará o status do contrato do itinerário pelo aplicativo.
                    </h2>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonGrid>
          </>
        )}
      </IonContent>

      <IonFooter>
        <IonToolbar>
          {itinerary && (
            <IonButton
              disabled={!selectedContract}
              expand='block'
              color='success'
              onClick={() => {
                history.push(
                  {
                    pathname: `/itinerario/${itinerary.id_itinerary}/contratos/resumo`,
                    state: {
                      contractData: {
                        type: selectedContract,
                      },
                    },
                  },
                )
              }}
            >Continuar</IonButton>)}
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ItinerarioContratos;