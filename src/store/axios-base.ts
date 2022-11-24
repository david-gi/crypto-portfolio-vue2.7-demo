import axios from "axios";
import { data } from "./db-data"

// For serverless start without json.db
const SERVERLESS = true;

export const axiosInst = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
  },
});

export const fetch = async <T>(
  subpath: string,
  setter: (x: T) => void,
  converter: (x: object) => T
) => {
  if (!SERVERLESS) {
    await axiosInst.get(subpath)
      .then((res) => {
        if (res?.data?.result == undefined) return;
        const obj: T = converter(res.data.result);
        setter(obj);
      });
  } else {
    if (subpath == '/events') {
      const obj: T = converter(data.events.result);
      setter(obj);
    } else {
      const obj: T = converter(data.balances.result);
      setter(obj);
    }
  }
}
