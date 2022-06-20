import * as sessionRoutes from "../api/session";

interface refreshSessionReturn {
  userId?: string;
  error?: boolean;
  errorMessage?: string;
}

interface refreshSessionResponse {
  status?: string;
  message?: string;
  userId?: string;
}

const refreshSession = async (): Promise<refreshSessionReturn> => {
  try {
    let res: refreshSessionResponse = await sessionRoutes.refresh()

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
  // catch (err: any) {
  //   if (err.response) {
  //       // The client was given an error response (5xx, 4xx)
  //   } else if (err.request) {
  //       // The client never received a response, and the request was never left
  //   } else {
  //       // Anything else
  //   }
// }
};

export default { refreshSession }