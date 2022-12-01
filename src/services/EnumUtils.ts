import { itineraryContractTypes } from "../constants/itineraryContractTypes"
import { schoolPeriods } from "../constants/schoolPeriods"
import { tripStatus } from "../constants/tripStatus"

import { Color } from "@ionic/core";
import { TripType } from "../models/tripType.models";

class EnumUtils {
  public static getSchoolPeriodEnumFormatted = (schoolPeriod: schoolPeriods): string => {
    switch (schoolPeriod) {
      case schoolPeriods.diurnal:
        return 'Diurno'
      case schoolPeriods.evening:
        return 'Vespertino'
      case schoolPeriods.integral:
        return 'Integral'
      case schoolPeriods.night:
        return 'Noturno'
    }
  }

  public static getContractTypeEnumFormatted = (contractType: itineraryContractTypes): string => {
    switch (contractType) {
      case itineraryContractTypes.recurring:
        return 'Recorrente'
      case itineraryContractTypes.avulse:
        return 'Avulso'
    }
  }

  public static getTripTypeEnumFormatted = (tripTypeString: TripType | string): string => {
    switch (tripTypeString) {
      case TripType.going:
        return 'Ida'
      case TripType.return:
        return 'Volta'
    }

    throw new Error("tripTypeString inválido.")
  }

  public static getTripStatusEnumFormatted = (tripStatusString: tripStatus | string): string => {
    switch (tripStatusString) {
      case tripStatus.pending:
        return 'Pendente'
      case tripStatus.confirmed:
        return 'Confirmada'
      case tripStatus.canceled:
        return 'Cancelada'
      case tripStatus.inProgress:
        return 'Em progresso'
      case tripStatus.finished:
        return 'Finalizada'

      case tripStatus.pendingGoingTrip:
        return 'Pendente viagem de ida'
    }

    throw new Error("tripStatusString inválido.")
  }

  public static getTripStatusEnumColor = (tripStatusString: tripStatus | string): Color => {
    switch (tripStatusString) {
      case tripStatus.pending:
        return 'secondary'
      case tripStatus.confirmed:
        return 'success'
      case tripStatus.canceled:
        return 'warning'
      case tripStatus.inProgress:
        return 'primary'
      case tripStatus.finished:
        return 'success'

      case tripStatus.pendingGoingTrip:
        return 'warning'
    }

    throw new Error(`tripStatusString "${tripStatusString}" inválido.`)
  }
}

export default EnumUtils