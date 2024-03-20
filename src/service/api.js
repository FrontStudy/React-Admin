import axios from "axios";
import { TOKEN, urlSetAdminRole  } from "./string";
import { servicesGetStorage, servicesSetStorage  } from "./storage";

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
        if (error.message === "Request failed with status code 403") {
          // servicesUseToast(
          //   "로그인 정보가 만료되었습니다. 다시 로그인해주십시오.",
          //   "e"
          // );
          setTimeout(() => {
            document.location.href = "/login";
          }, 2000);
        }
      });
  }
