import instance from '../services/api';
// import LocalStorage from '../LocalStorage';

let token:string;
let header:string;

function updateHeader() {
//   token = LocalStorage.getToken();
  header = `{
    "Accept": 'application/json',
    "Content-Type": 'application/json',
    "Authorization": 'Bearer ' + token
  }`
}

export interface CadastroResponse {
    message?: string;
  
    token?: {
      token: string;
    };
  
    error?: string;
}

export interface CadastroRequest {
    name: string;
    username: string;
    email: string;
    birth_date: string;
    password: string;
}

// export async function get(cpf) {
//   updateHeader();

//   const response = await instance.get(userRoutes.get.url + `/${cpf}`, { headers: header });
//   return response.data;
// }

export async function create(CadastroRequest: any) {
  updateHeader();

  const response = await instance.post("http://localhost:3333/users/", CadastroRequest);
  return response.data;
}