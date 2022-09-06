interface CoordinatesRequest {
  coordinatesFrom: {
    lat: number;
    lng: number;
  };
  coordinatesTo: {
    lat: number;
    lng: number;
  };
}

export async function getTransportes(
  request: CoordinatesRequest
): Promise<any> {
  try {
    // let res : any = await transportsRoutes.get(request);
  } catch (error) {}
}
