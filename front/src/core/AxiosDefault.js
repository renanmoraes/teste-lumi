import axios from "axios";

class AxiosDefault {
  constructor() {
    this.request = axios.create({
      baseURL: "http://localhost:8080/api/v1/",
    });
  }

  async get(url, config) {
    try {
      const response = await this.request.get(url, {
        ...config,
      });

      return response.data;
    } catch (error) {
      console.error("error", error);
    }
  }
}

export default new AxiosDefault();
