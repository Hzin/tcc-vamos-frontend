import { getStaticUrl } from '../config/api.config';
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
