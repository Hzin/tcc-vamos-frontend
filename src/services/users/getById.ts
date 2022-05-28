import * as usersRoutes from "../../services/api/users";

interface getByIdReturn {
  userId?: string;
  error?: boolean;
  errorMessage?: string;
}

interface getByIdResponse {
  status?: string;
  message?: string;
  userId?: string;
}

export const getById = async (userId: string): Promise<getByIdReturn> => {
  try {
    let res: getByIdResponse = await usersRoutes.getById(userId)

    if (res.status === "error") {
      return {
        error: true,
        errorMessage: res.message,
      };
    }

    return {
      userId: res.userId,
    };
  } catch(err) {
    return {
      error: true,
      errorMessage: "Por favor, autentique-se.",
    };
  }
};
