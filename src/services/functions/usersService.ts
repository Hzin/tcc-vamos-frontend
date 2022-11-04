import { User } from "../../models/user.model";
import * as usersRoutes from "../api/users";

interface getByIdReturn {
  userData?: {
    name: string;
    lastname: string;
    email: string;
    phone_number: string;
    birth_date: string;
    bio: string;
    document_type: string;
    document: string;
  };
  error?: {
    errorMessage: string;
  };
}

interface getByIdRes {
  status?: string;
  message?: string;
  error?: string;

  avatar_image: string,
  bio: string,
  birth_date: string,
  document: string,
  document_type: string,
  email: string,
  id_user: string,
  lastname: string,
  name: string,
  phone_number: string,

}

// export const getById = async (userId: string): Promise<getByIdRes> => {
export const getById = async (userId: string): Promise<User> => {
  const res = await usersRoutes.getById(userId);

  if (res.status === "error") throw new Error('Usuário inválido...')

  return res.data
};

// interface getByIdReturn {
//   data?: {
//     phone: "";
//     whatsapp: "";
//     facebook: "";
//     telegram: "";
//   };
//   error?: {
//     errorMessage: string;
//   };
// }

// export const getUserSocialInfo = async (
//   userId: string
// ): Promise<getByIdReturn> => {
//   try {
//     let res: getByIdRes = await usersRoutes.getSocialInfo(userId);

//     if (res.status === "error") {
//       return {
//         error: {
//           errorMessage: res.message,
//         },
//       };
//     }

//     return {
//       userData: res.data,
//     };
//   } catch (err) {
//     return {
//       error: {
//         errorMessage: "Por favor, autentique-se.",
//       },
//     };
//   }
// };

interface checkIfUserIsDriverReturn {
  result?: boolean;
  error?: {
    errorMessage: string;
  };
}

interface checkIfUserIsDriverResponse {
  status: string;
  message: string;
  result?: boolean;
  error?: {
    errorMessage: string;
  };
}

export const checkIfUserIsDriver = async (
  id_user: string
): Promise<checkIfUserIsDriverReturn> => {
  try {
    let res: checkIfUserIsDriverResponse =
      await usersRoutes.checkIfUserIsDriver(id_user);

    if (res.status === "error") {
      return {
        error: {
          errorMessage: res.message,
        },
      };
    }

    return {
      result: res.result,
    };
  } catch (err) {
    return {
      error: {
        errorMessage: "Por favor, autentique-se.",
      },
    };
  }
};

export async function checkIfUserIsAdmin(): Promise<boolean> {
  let res: any;

  try {
    res = await usersRoutes.checkIfUserIsAdmin();
  } catch (error) {
    // TODO
  }

  return res.data;
}