import Axios from "axios"

export const api = getAPIClient()

function getAPIClient() {
  const API_URL = "https://swapi.dev/api/";

  const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_REACT_APP_BACKENDURL || API_URL,
  });


  return axios;
}