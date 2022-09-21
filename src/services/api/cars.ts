import instance from './api';

import carsRoutes from '../../constants/routes/carsRoutes';

export async function listAllBrands() {

  const response = await instance.get(carsRoutes.listAllBrands.url);

  return response.data;
}

export async function listCarModels(carBrandId: string) {

  const response = await instance.get(carsRoutes.listCarModels.url + `/${carBrandId}`);

  return response.data;
}