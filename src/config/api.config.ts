import environment from "../constants/environment";

const getBaseUrl = (): string => {
  // const { hostname } = window.location;
  
  const { url } = environment;

  let apiUrl = null;
  
  // if (hostname === 'projeto-integrado-f-web.herokuapp.com') {
  //   apiUrl = url.prod;
  // } else {
    apiUrl = url.local;
  // }

  return apiUrl;
}

export default { getBaseUrl };