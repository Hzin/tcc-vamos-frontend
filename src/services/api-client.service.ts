import axios from "axios";

export class ApiClient{
  private static api = axios.create({
    baseURL: "http://localhost:8080"
  });

  public static async doPost (url: string, body: any): Promise<any> {
    return await this.api
      .post(url, body)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
}