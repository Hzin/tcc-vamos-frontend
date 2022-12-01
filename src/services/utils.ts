import { getStaticUrl } from '../config/api.config';
import { Destination } from '../models/destination.model';
import { NeighborhoodServed } from '../models/NeighborhoodServed.model';
import { User } from '../models/user.model';
import instance from '../services/api/api';

export async function autoCompleteAddress(address: string) {

  const response = await instance.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=ee574aacff6f440a84378bbbf7e2f20d`);
  return response.data.features;
}

export async function closeToast(setShowToast: React.Dispatch<React.SetStateAction<boolean>>) {
  setShowToast(false)
  window.history.replaceState({}, document.title)
}

export function convertNumberToPrice(price: number) {
  // Create our number formatter.
  var formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return formatter.format(price);
}

export const convertNumberToPrice2 = (number: number): string => {
  return `R$ ${number.toFixed(2).toString()}`
}

export function reloadPage() {
  window.location.reload();
}

export function startTime() {
  // setInterval(() => {
  const today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  const todayDate = dd + "/" + mm + "/" + yyyy;
  return todayDate;
  // }, 1000);
}

export const convertFilePathToStaticUrl = (filepath: string) => {
  return `${getStaticUrl()}/${filepath}`
}

export const createElement = (htmlCode: string) => {
  var frag = document.createDocumentFragment(), temp = document.createElement('div');
  temp.innerHTML = htmlCode;

  while (temp.firstChild) {
    frag.appendChild(temp.firstChild);
  }

  document.body.insertBefore(frag, document.body.childNodes[0]);
}

export const getUserFullName = (user: User): string => {
  return `${user.name} ${user.lastname}`
}

export interface DaysOfWeekObject {
  sunday: boolean,
  monday: boolean,
  tuesday: boolean,
  wednesday: boolean,
  thursday: boolean,
  friday: boolean,
  saturday: boolean,
}

// exemplo: 0111110
export const convertDaysOfWeekToObject = (daysOfWeek: string): DaysOfWeekObject => {
  const daysOfWeekSplit = daysOfWeek.split('')

  if (daysOfWeekSplit.length !== 7) throw new Error('String inválida')

  return {
    sunday: daysOfWeekSplit[0] === '1' ? true : false,
    monday: daysOfWeekSplit[1] === '1' ? true : false,
    tuesday: daysOfWeekSplit[2] === '1' ? true : false,
    wednesday: daysOfWeekSplit[3] === '1' ? true : false,
    thursday: daysOfWeekSplit[4] === '1' ? true : false,
    friday: daysOfWeekSplit[5] === '1' ? true : false,
    saturday: daysOfWeekSplit[6] === '1' ? true : false,
  }
}

export const formatTimeField = (time: string): string => {
  const separator = ':'

  const timeSplit = time.split(separator)

  if (timeSplit.length !== 3) return time

  timeSplit.pop()
  if (!timeSplit) return time

  return timeSplit.join(separator)
}

export const getFormatedAddresses = (object: NeighborhoodServed[] | Destination[]): string[] => {
  let returnObject: string[] = []

  object.forEach((item) => {
    returnObject.push(item.formatted_address)
  })

  return returnObject
}

export const convertObjectToStringArray = (object: Object): string[] => {
  let returnObject: string[] = []

  Object.entries(object).forEach((entry) => {
    returnObject.push(`${entry[0]}: ${entry[1]}`)
  })

  return returnObject
}

export const formatDateObjectToDate = (date: string): string => {
  const dateObj = new Date(date)
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
}

const timezoneOffset = 6
export const formatDateObjectToTime = (date: string): string => {
  const dateObj = new Date(date);

  dateObj.setHours(dateObj.getHours() - timezoneOffset);

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  return hours + ':' + minutes
}