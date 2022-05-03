<<<<<<< HEAD
import environment from "../constants/environment";

const getBaseUrl = (): string => {
  // const { hostname } = window.location;
  
=======
import environment from "../environments/environment";

function getBaseUrl() {
  const { hostname } = window.location;
>>>>>>> 561e8597e0534b18b8dfbf5b454030b6d9a0cdbc
  const { url } = environment;

  let apiUrl = null;
  
<<<<<<< HEAD
  // if (hostname === 'projeto-integrado-f-web.herokuapp.com') {
=======
  // if (hostname === '') {
>>>>>>> 561e8597e0534b18b8dfbf5b454030b6d9a0cdbc
  //   apiUrl = url.prod;
  // } else {
    apiUrl = url.local;
  // }

  return apiUrl;
}

export default { getBaseUrl };