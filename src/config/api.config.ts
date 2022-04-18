import environment from "../environments/environment";

function getBaseUrl() {
  const { hostname } = window.location;
  const { url } = environment;

  let apiUrl = null;
  
  // if (hostname === '') {
  //   apiUrl = url.prod;
  // } else {
    apiUrl = url.local;
  // }

  return apiUrl;
}

export default { getBaseUrl };