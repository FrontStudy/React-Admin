import axios from "axios";
import { servicesGetStorage, servicesSetStorage } from "./storage";
import * as TOA from "./toast";
import { TOKEN, urlSetAdminRole  } from "./string";

export { servicesGetStorage } from "./storage";
const storageGetToken = servicesGetStorage(TOKEN);

export function servicesGetData(url, reqData) {
    let headers = {
      "Content-Type": "application/json",
    };
    if (storageGetToken) {
      headers.Authorization = `Bearer ${storageGetToken}`;
    }

    return axios({
      url: url,
      method: "get",
      params: reqData,
      headers: headers 
    })
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

  export function servicesPutData(url, reqData) {
    return axios
      .put(url, reqData, {
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

  export function servicesPatchData(url, reqData) {
    return axios
      .patch(url, reqData, {
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

