import * as carsRoutes from "../api/cars";

interface getAllCarModelsReturn {
  data?: {
    id_model: string;
    name: string;
  }[];

  error?: {
    errorMessage: string;
  }
}

interface getAllCarModelsRes {
  status?: string;

  message: string

  data?: {
    id_model: string;
    name: string;
  }[];

  
}

const getAllCarModels = async (): Promise<getAllCarModelsReturn> => {
  try {
    let res: getAllCarModelsRes = await carsRoutes.list();

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
        errorMessage: "Por favor, autentique-se.",
      },
    };
  }
};

export default { getAllCarModels };
