import axios from "axios";
import { TOKEN } from "./string";
import { servicesGetStorage, servicesSetStorage } from "./storage";
import * as TOA from "./toast";

export { servicesGetStorage } from "./storage";
const storageGetToken = servicesGetStorage(TOKEN);

export function servicesGetData(url, reqData) {
    let headers = {
      "Content-Type": "application/json",
    };
    if (storageGetToken) {
      headers.Authorization = `Bearer ${storageGetToken}`;
    }
  
    return axios(
      {
        url: url,
        method: "get",
        data: reqData,
      },
      { headers }
    )
      .then((res) => res.data)
      .catch((error) => {
        console.log("error", error);
        if (error.message === "code 403") {
          setTimeout(() => {
            document.location.href = "/";
          }, 2000);
        }
      });
  }

  export function servicesPostData(url, reqData) {
    console.log(storageGetToken);
    return axios
      .post(url, reqData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storageGetToken}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.log("error", error);
      });
  }

