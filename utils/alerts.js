import { ToastAndroid } from "react-native";

/**
 *
 * @param {string} msg Mensaje a emitir
 * @param {string} gravity "center" | "bottom" | "top"
 * @returns
 */
export const SimpleToast = (msg, gravity = "center") => {
   return ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.LONG,
      gravity === "top"
         ? ToastAndroid.TOP
         : gravity === "bottom"
           ? ToastAndroid.BOTTOM
           : ToastAndroid.CENTER,
   );
};
