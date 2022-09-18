import * as carsRoutes from "../api/cars";

interface CarObject {
  codigo: string;
  nome: string;
}

interface getAllCarBrandsReturn {
  data?: CarObject[];

  error?: {
    errorMessage: string;
  };
}

interface getAllCarBrandsRes {
  status?: string;

  message: string;

  data?: CarObject[];
}

const getAllCarBrands = async (): Promise<getAllCarBrandsReturn> => {
  try {
    let res: getAllCarBrandsRes = await carsRoutes.listAllBrands();

    if (res.status === "error") {
      return {
        error: {
          errorMessage: res.message,
        },
      };
    }

    return {
      data: res.data,
    };
  } catch (err) {
    return {
      error: {
        errorMessage: "Por favor, tente novamente.",
      },
    };
  }
};

const getCarModels = async (
  carBrandId: string
): Promise<getAllCarBrandsReturn> => {
  try {
    let res: getAllCarBrandsRes = await carsRoutes.listCarModels(carBrandId);

    if (res.status === "error") {
      return {
        error: {
          errorMessage: res.message,
        },
      };
    }

    return {
      data: res.data,
    };
  } catch (err) {
    return {
      error: {
        errorMessage: "Por favor, tente novamente.",
      },
    };
  }
};

export default { getAllCarBrands, getCarModels };
