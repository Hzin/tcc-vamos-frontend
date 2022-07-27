import instance from '../services/api/api';

export async function autoCompleteAddress(address:string) {

  const response = await instance.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=ee574aacff6f440a84378bbbf7e2f20d`);
  return response.data.features;
}