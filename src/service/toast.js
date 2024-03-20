import { toast } from "react-toastify";
/**
 * 알림창
 * @param {*} contentText
 * @param {*} messageType
 */
export function servicesUseToast(contentText, messageType) {
  switch (messageType) {
    case "s":
      toast.success(contentText, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      break;

    case "e":
      toast.error(contentText, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      break;

    default:
      toast.warn(contentText, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  }
}
