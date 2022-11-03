import instance from "./api";

import searchesRoutes from "../../constants/routes/searchesRoutes";
import { CreateBody, SearchInRadiusBody } from "../functions/searchesService";

// list
// create
// searchInRadius

export async function list() {
  const response = await instance.get(searchesRoutes.list.url);
  return response.data;
}

export async function create(body: CreateBody) {
  const response = await instance.post(searchesRoutes.create.url, body);
  return response.data;
}

export async function searchInRadius(body: SearchInRadiusBody) {
  const response = await instance.post(searchesRoutes.searchInRadius.url, body);
  return response.data;
}