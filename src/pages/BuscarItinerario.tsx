import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useEffect, useState } from "react";
import { useHistory } from "react-router";

interface coordinates {
  lat: number;
  lgn: number;
}

interface Itinerario {
  motorista: string;
  valor: string;
  lugares: string;
  avaliacao: string;
  bairros_atendidos: coordinates[];
  destinos: coordinates[];
}

const BuscarItinerario: React.FC = () => {
  const [selectedBairro, setSelectedBairro] = useState("");
  const [selectedFaculdade, setSelectedFaculdade] = useState("");

  const [itinerarios, setItinerarios] = useState<Itinerario[]>();

  useEffect(() => {
    setItinerarios([
      {
        motorista: "João",
        valor: "R$ 150,00",
        lugares: "2",
        avaliacao: "4.5",
        bairros_atendidos: [{ lat: -22.873432, lgn: -47.142274 }],
        destinos: [{ lat: -22.833645, lgn: -47.048905 }],
      },
      {
        motorista: "Ricardo",
        valor: "R$ 180,00",
        lugares: "5",
        avaliacao: "4.0",
        bairros_atendidos: [{ lat: -22.873432, lgn: -47.142274 }],
        destinos: [{ lat: -22.833645, lgn: -47.048905 }],
      },
      {
        motorista: "Luiz",
        valor: "R$ 200,00",
        lugares: "1",
        avaliacao: "4.3",
        bairros_atendidos: [{ lat: -22.873432, lgn: -47.142274 }],
        destinos: [{ lat: -22.833645, lgn: -47.048905 }],
      },
      {
        motorista: "Marcos",
        valor: "R$ 199,00",
        lugares: "6",
        avaliacao: "4.9",
        bairros_atendidos: [{ lat: -22.873432, lgn: -47.142274 }],
        destinos: [{ lat: -22.833645, lgn: -47.048905 }],
      },
      {
        motorista: "Orandi",
        valor: "R$ 210,00",
        lugares: "8",
        avaliacao: "5.0",
        bairros_atendidos: [{ lat: -22.873432, lgn: -47.142274 }],
        destinos: [{ lat: -22.833645, lgn: -47.048905 }],
      },
      {
        motorista: "Pedro",
        valor: "R$ 189,00",
        lugares: "4",
        avaliacao: "4.1",
        bairros_atendidos: [{ lat: -22.873432, lgn: -47.142274 }],
        destinos: [{ lat: -22.833645, lgn: -47.048905 }],
      },
      {
        motorista: "Pericles",
        valor: "R$ 220,00",
        lugares: "19",
        avaliacao: "4.5",
        bairros_atendidos: [{ lat: -23.873432, lgn: -47.142274 }],
        destinos: [{ lat: -22.833645, lgn: -47.048905 }],
      },
    ]);
  }, []);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Buscar itinerários</IonTitle>
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/buscas" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* <IonGrid>
          <IonRow> */}
            <IonList>
              <IonListHeader>Filtros de busca</IonListHeader>
              <IonItem>
                <IonLabel>Bairro de origem</IonLabel>
                <IonSelect
                  // placeholder="Selecione o bairro de origem"
                  onIonChange={(e) => {
                    setSelectedBairro(e.detail.value!);
                  }}
                >
                  <IonSelectOption value="1">Vila Marieta</IonSelectOption>
                  <IonSelectOption value="2">Botafogo</IonSelectOption>
                  <IonSelectOption value="3">Cambuí</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel>Instituição de ensino de destino</IonLabel>
                <IonSelect
                  // placeholder="Selecione a instituição de ensino de destino"
                  onIonChange={(e) => {
                    setSelectedFaculdade(e.detail.value!);
                  }}
                >
                  <IonSelectOption value="1">
                    PUC Campinas (campus 1)
                  </IonSelectOption>
                  <IonSelectOption value="2">Unicamp</IonSelectOption>
                  <IonSelectOption value="3">UNIP</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>
          {/* </IonRow> */}

          {/* <IonRow> */}
            {selectedBairro && selectedFaculdade ? (
              <>
                {itinerarios ? (
                  itinerarios.map((itinerario, index) => {
                    return (
                      <IonCard key={index}>
                        <IonCardHeader>
                          <IonCardTitle>
                            <p>Bairros atendidos: {itinerario.bairros_atendidos[0].lat},{itinerario.bairros_atendidos[0].lgn}</p>
                            <p>Instituições de ensino atendidas: {itinerario.destinos[0].lat},{itinerario.destinos[0].lgn}</p>
                          </IonCardTitle>
                          <IonCardSubtitle>
                            <p>Vagas disponíveis: {itinerario.lugares}</p>
                            <p>Motorista: {itinerario.motorista}</p>
                            <p>Valor: {itinerario.valor}</p>
                          </IonCardSubtitle>
                        </IonCardHeader>
                      </IonCard>
                    );
                  })
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          {/* </IonRow>
        </IonGrid> */}
      </IonContent>
    </IonPage>
  );
};

export default BuscarItinerario;
