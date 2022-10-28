import axios from "axios";

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
) =>
  await axiosInst.get(subpath)
    .then((res) => {
      if (res?.data?.result == undefined) {
        return;
      }
      const data: T = converter(res.data.result);
      setter(data);
    });
