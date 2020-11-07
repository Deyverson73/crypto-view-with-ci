import axios from "axios";

const apiKey =
  "3de4c5b2921ed6f1d621a090c661aeeb495de5c042c00c25b4ebf317e87fa4f1";

export const cryptoHttp = axios.create({
  baseURL: "https://min-api.cryptocompare.com/data",
  headers: {
    authorization: `Apikey ${apiKey}`,
  },
});
