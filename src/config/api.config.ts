import environment from "../environments/environment";

export const getBaseUrl = (): string => {
  // const { hostname } = window.location;
  const { url } = environment;

  let apiUrl = null;

  // if (hostname === '') {
  //   apiUrl = url.prod;
  // } else {
  apiUrl = url.local;
  // }

  return apiUrl;
}

export const getStaticUrl = (): string => {
  // const { hostname } = window.location;
  const { url } = environment;

  let apiUrl = null;

  // if (hostname === '') {
  //   apiUrl = url.prod;
  // } else {
  apiUrl = url.local + '/static';
  // }

  return apiUrl;
}

// export default { getBaseUrl, getStaticUrl };