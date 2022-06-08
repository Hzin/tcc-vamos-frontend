import * as usersRoutes from "../api/users";

interface getByIdReturn {
  userData?: {
    name: string;
    lastname: string;
    email: string;
    birth_date: string;
    bio: string;
  },
  error?: {
    errorMessage: string;
  }
}

interface getByIdRes {
  status: string;
  message: string;
  userId?: string;
  data: {
    name: string;
    lastname: string;
    email: string;
    birth_date: string;
    bio: string;
  },
}

const getById = async (userId: string): Promise<getByIdReturn> => {
  try {
    let res: getByIdRes = await usersRoutes.getById(userId)

    if (res.status === "error") {
      return {
        error: {
          errorMessage: res.message,
        }
      };
    }

    return {
      userData: res.data,
    };
  } catch(err) {
    return {
      error: {
        errorMessage: "Por favor, autentique-se.",
      }
    };
  }
};

interface getByIdReturn {
  data?: {
    phone: '',
    whatsapp: '',
    facebook: '',
    telegram: '',
  },
  error?: {
    errorMessage: string;
  }
}

const getUserSocialInfo = async (userId: string): Promise<getByIdReturn> => {
  try {
    let res: getByIdRes = await usersRoutes.getSocialInfo(userId)

    if (res.status === "error") {
      return {
        error: {
          errorMessage: res.message,
        }
      };
    }

    return {
      userData: res.data,
    };
  } catch(err) {
    return {
      error: {
        errorMessage: "Por favor, autentique-se.",
      }
    };
  }
};

export default { getById, getUserSocialInfo }