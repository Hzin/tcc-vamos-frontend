import { itineraryContractTypes } from "../constants/itineraryContractTypes"
import { schoolPeriods } from "../constants/schoolPeriods"
import { tripStatus } from "../constants/tripStatus"

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

  public static getTripStatusEnumFormatted = (tripStatusString: tripStatus): string => {
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
    }
  }
}

export default EnumUtils