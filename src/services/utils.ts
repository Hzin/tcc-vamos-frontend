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