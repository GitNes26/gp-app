// import Toast from "./Toast";
import dayjs from "dayjs";

dayjs.locale("es");

//#region /** FECHAS - FORMATEADO */
function validateRangeDates(action, input_initial_date, input_final_date) {
   let current_date = new Date();
   yesterday = new Date(current_date.setDate(current_date.getDate() - 1));
   yesterday = new Date(yesterday.setHours(23, 59, 59));
   yesterday = yesterday.getTime();

   date1 = new Date(input_initial_date.val());
   date1 = new Date(date1.setDate(date1.getDate() + 1));
   date1 = new Date(date1.setHours(0, 0, 0));
   data_date1 = new Date(date1).getTime();

   date2 = new Date(input_final_date.val());
   date2 = new Date(date2.setDate(date2.getDate() + 1));
   date2 = new Date(date2.setHours(11, 59, 59));
   data_date2 = new Date(date2).getTime();

   if (action == "create") {
      if (data_date1 <= yesterday) {
         showToast("warning", "No puedes publicar con fecha anterior a hoy.");
         input_initial_date.focus();
         return false;
      }
   }
   if (data_date1 > data_date2) {
      showToast("warning", "Rango de fechas inválido.");
      input_final_date.focus();
      return false;
   }
   return true;
}

function binaryDateTimeFormat(the_date) {
   let date = new Date(parseInt(the_date.substr(6)));
   let datetime = dayjs(date).format("MM-DD-YYYY h:mm:ss a");
   // let datetime = new Intl.DateTimeFormat("es-MX", { day: '2-digit', month: '2-digit', year: 'numeric', hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }).format(date);

   return datetime;
}

export function formatDatetime(the_date, long_format = true, format = null) {
   if (the_date == null) return "Sin Fecha";
   dayjs.locale("es");
   let date = new Date(the_date);
   let datetime;

   if (the_date.length <= 10) {
      date = new Date(date.setDate(date.getDate() + 1));
      return (datetime = dayjs(date).format("DD-MM-YYYY"));
   }

   date = new Date(the_date);
   const formato = !format ? (long_format ? "DD-MM-YYYY h:mm:ss a" : "DD-MM-YYYY") : format;
   return (datetime = dayjs(date).format(formato));
}

export function formatDatetimeToSQL(the_date) {
   let datetime = dayjs(the_date).format("YYYY-MM-DDTh:mm:ss");
   return datetime;
}
//#endregion /** FECHAS - FORMATEADO */

export function formatCurrency(amount, MX = true, show_currency = true) {
   let divisa = "MXN";
   let total = new Intl.NumberFormat("es-MX").format(amount);
   if (!MX) {
      divisa = "USD";
      total = new Intl.NumberFormat("en-US").format(amount);
   }

   if (!total.includes(".")) total += ".00";
   let decimales = total.split(".").reverse();
   if (decimales[0].length == 1) total += "0";
   if (amount == 0) total == "0.00";
   show_currency ? (total = `$${total} ${divisa}`) : (total = `$${total}`);

   return total;
}
export function formatearCantidadDeRenglones(tds) {
   $.each(tds, function (i, elemento) {
      let td = $(elemento);
      let cantidad = td.text();
      let cantidad_formateada = formatCurrency(cantidad);
      td.html(`${cantidad_formateada}`);
   });
}

export function formatPhone(phone) {
   if (!phone) return "Sin numero";
   return `${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6, 8)}${phone.slice(-2)}`;
}

export function formatToLowerCase(event) {
   const newText = event.target.value.toLowerCase();
   return newText;
}
export function formatToUpperCase(event) {
   const newText = event.target.value.toUpperCase();
   return newText;
}

export const handleInputFormik = async (e, setFieldValue, input, toUpper = true) => {
   try {
      const newText = toUpper ? await formatToUpperCase(e) : await formatToLowerCase(e);
      setFieldValue(input, newText);
   } catch (error) {
      console.log(error);
      Toast.Error(error);
   }
};
export const handleInputStringCase = async (e, setState, toUpper = true) => {
   try {
      const newText = toUpper ? await formatToUpperCase(e) : await formatToLowerCase(e);
      setState(newText);
   } catch (error) {
      console.log(error);
      Toast.Error(error);
   }
};

export const splitArroba = (string, returnFirst = true) => {
   try {
      const array = string.split("@");
      const value = returnFirst ? array[0] : array.reverse()[0];
      return value;
   } catch (error) {
      console.log(error);
      Toast.Error(error);
   }
};

/**
 * const groupedData = groupBy(data, "category");
 *
 * @param {array} data - la data
 * @param {string} key - nombre de la propiedad para filtrar
 * @param {boolean} returnArray - retornar el valor como array o como objeto
 * @param {boolean} consoleLogResult - por si quieres ver el resultaod en consola
 * @returns La data filtrada
 */
export const groupBy = (data, key, returnArray, consoleLogResult = false) => {
   let result = data.reduce((result, currentValue) => {
      const keys = key.includes(".") && key.split(".");

      // Extraer el valor clave
      const keyValue = keys ? currentValue[keys[0]][keys[1]] : currentValue[key];

      // Si el valor clave no existe en el objeto de resultado, cree datos para él
      if (!result[keyValue]) {
         result[keyValue] = [];
      }

      // Agregue el valor actual a los datos correspondientes.
      result[keyValue].push(currentValue);

      return result;
   }, {});
   if (returnArray) result = Object.entries(result);

   if (consoleLogResult) console.log(`🚀 ~ groupBy ~ result ${returnArray ? "array" : "object"}:`, result);
   return result;
};

/**
 *
 * @param {array<objecT>} data - para arreglos de objetos [{}]
 * @param {string} key - nombre de la propiedad por la cual se desea filtrar
 * @returns {array}
 */
export const unifyBy = (data, key) => {
   return Array.from(new Map(data.map((item) => [item[key], item])).values());
};

export const cutLinesPDF = (text, lengthRow = 100) => {
   if (typeof text != "string") return;
   // console.log("🚀 ~ cutLinesPDF ~ text:", text);
   const lines = text.split(/\r\n|\n/);
   const rows = [];
   lines.map((line) => {
      for (let i = 0; i < line.length; i += lengthRow) {
         const fragment = line.slice(i, i + lengthRow);
         rows.push(fragment);
      }
   });
   // console.log("🚀 ~ cutLinesPDF ~ rows:", rows);
   return rows;
};

const unidades = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
const especiales = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
const decenas = ["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
const centenas = ["", "cien", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];
/**
 * @param {number} number
 */
export const numberToText = (number) => {
   try {
      return convertirNumeroATexto(number);

      function convertirNumeroATexto(numero) {
         let [enteros, decimales] = numero.toString().split(".");

         let textoEnteros = convertirParteEntera(enteros);
         let textoDecimales = convertirParteDecimal(decimales);

         let resultado = `son ${textoEnteros} peso${parseInt(enteros) !== 1 ? "s" : ""}`;
         if (textoDecimales) {
            resultado += ` con ${textoDecimales} centavo${parseInt(decimales) !== 1 ? "s" : ""}`;
         }

         return resultado;
      }

      function convertirParteEntera(numero) {
         if (numero === "0") return "cero";

         let partes = [];
         let num = parseInt(numero, 10);
         // console.log("🚀 ~ convertirParteEntera ~ num:", num);

         if (num >= 10000 && num < 20000) {
            partes.push(`${especiales[parseInt(num.toString().slice(0, 2)) - 10]} mil`);
            num = num % 1000;
         } else if (num >= 20000 && num <= 100000) {
            const miles = Math.floor(num / 1000);
            if (miles >= 30) partes.push(`${decenas[Math.floor(parseInt(num.toString().slice(0, 2)) / 10)]}`);
            num = num % 10000;

            if (miles === 20) {
               partes.push("veinte mil");
               num = num % 1000;
            } else if (miles === 21) {
               partes.push("veintiún mil");
               num = num % 1000;
            } else if (miles >= 22 && miles < 30) {
               partes.push(`veinti${unidades[Math.floor(num / 1000)]} mil`);
               num = num % 1000;
            } else {
               if (miles % 10 > 0) partes.push("y");
               if (miles % 10 === 1) partes.push("un mil");
               else partes.push(`${unidades[Math.floor(num / 1000)]} mil`);
               num = num % 1000;
            }
         } else if (num >= 1000) {
            partes.push(`${unidades[Math.floor(num / 1000)]} mil`);
            num = num % 1000;
         }

         if (num >= 100) {
            if (num >= 101 && num < 200) {
               partes.push("ciento");
            } else {
               partes.push(centenas[Math.floor(num / 100)]);
            }
            num = num % 100;
         }

         if (num >= 10 && num < 20) {
            partes.push(especiales[num - 10]);
         } else {
            const dec = Math.floor(num / 10);
            if (dec >= 3) partes.push(decenas[Math.floor(num / 10)]);
            if (dec === 2) {
               const uni = num % 10;
               num = num % 10;

               if (uni === 0) partes.push("veinte");
               else if (uni === 1) partes.push("veintiún");
               else partes.push(`veinti${unidades[num]}`);
            } else {
               num = num % 10;
               if (dec >= 3 && num > 0) partes.push("y");
               if (includesInArray(partes, ["cien", "ciento", "mil"]) && num === 1) partes.push("un");
               else partes.push(unidades[num]);
            }
         }

         return partes
            .filter((p) => p !== "")
            .join(" ")
            .trim();
      }

      function convertirParteDecimal(numero) {
         if (!numero) return "";

         if (numero.length === 1) {
            numero += "0";
         }

         return convertirParteEntera(numero);
      }
   } catch (error) {
      console.log("🚀 ~ includesInArray ~ error:", error);
      Toast.Error(error);
   }
};

/**
 * Esta función nos ayuda a saber si almenos un valor de un array se encuentra en otro array o todos los valores, segun se indique en allValues
 * @param {[*]} array1 - Array que se desea inspeccionar
 * @param {[*]} array2 - Array de valores a buscar
 * @param {boolean} allValues - Indicar si deseas que coinsidan todos los valores del array2 (true) o almenos uno (false)
 * @returns {boolean}
 */
export const includesInArray = (array1, array2, allValues = false) => {
   try {
      if (allValues) return array2.every((element) => array1.includes(element));
      else return array2.map((element) => array1.includes(element));
   } catch (error) {
      console.log("🚀 ~ includesInArray ~ error:", error);
      Toast.Error(error);
   }
};

/**
 * Función para filtrar propiedades basadas en el objeto original,
 * si tenes un objeto con más propiedades de las originales,
 * seran ignoradas.
 * @param {object} original objeto original
 * @param {object} newArray objeto con valores nuevos
 * @returns {object}
 */
export function setPropsOriginals(original, newArray) {
   return Object.keys(original).reduce((obj, key) => {
      if (newArray.hasOwnProperty(key)) {
         obj[key] = newArray[key];
      }
      return obj;
   }, {});
}

/**
 * Función para convertir la imagen en un tipo "File-like"
 * @param {string} uri  Url para obtenrer el contenido de la imagen
 * @param {string} fileName   Nombre que se le asignara al File
 * @param {string} mimeType   Tipo de mime de la imagen a exportar
 * @returns
 */
export const convertImageToFile = async (uri, fileName, mimeType) => {
   // Crear un "File-like" object (Blob) para usarlo en FormData
   const file = {
      uri, // El uri de la imagen para React Native
      name: fileName, // Nombre del archivo
      type: mimeType, // Tipo MIME (image/jpeg, image/png, etc.)

      originalName: uri,
      fileName: fileName,
      mimeType: mimeType
   };

   // const response = await fetch(uri); // Obtener el contenido del archivo
   // const blob = await response.blob(); // Convertir la respuesta en un Blob (similar a File en web)
   // const file = new File([blob], fileName, {
   //    type: mimeType,
   //    lastModified: new Date().toISOString(),
   // });

   // console.log("🚀 ~ convertImageToFile ~ file:", file);
   return file;
};

/**
 * Esta función nos ayuda a convertir un objeto sencillo a un tipo FormData
 * @param {{}} objForm Formulario con una estructura de objeto sencillo
 * @returns
 */
export const convertToFormData = async (objForm) => {
   const formData = new FormData();
   Object.keys(objForm).map((key) => {
      if (typeof objForm[key] === "object" && objForm[key] != null) {
         if (includesInArray(Object.keys(objForm[key]), ["uri", "name", "type"], true))
            formData.append(key, {
               uri: objForm[key].uri,
               name: objForm[key].name,
               type: objForm[key].type
            });
         else formData.append(key, JSON.stringify(objForm[key]));
      } else formData.append(key, objForm[key]);
   });

   return formData;
};

// export const RenderJsonComponent = ({ jsonData }) => {
//    return (
//       <div>
//          <h3>Datos JSON</h3>
//          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
//       </div>
//    );
// };

// export const RenderFileComponent = ({ file }) => {
//    return (
//       <div>
//          <h3>Detalles del Archivo</h3>
//          <p>
//             <strong>Nombre:</strong> {file.name}
//          </p>
//          <p>
//             <strong>Tamaño:</strong> {(file.size / 1024).toFixed(2)} KB
//          </p>
//          <p>
//             <strong>Tipo:</strong> {file.type}
//          </p>
//       </div>
//    );
// };

export function stringToColor(string) {
   let hash = 0;
   let i;

   /* eslint-disable no-bitwise */
   for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
   }

   let color = "#";

   for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
   }
   /* eslint-enable no-bitwise */

   return color;
}

export function stringAvatar(name) {
   let letters = "US";
   // console.log(name);
   if (name != undefined) {
      if (name.includes(" ")) {
         letters = name.length < 3 ? "?" : `${name.split(" ")[0][0].toUpperCase()}${name.split(" ")[1][0].toUpperCase()}`;
      } else {
         letters = name.length < 2 ? "?" : `${name.substring(0, 2).toUpperCase()}`;
      }
   }

   const reverse = `${letters.charAt(1)}${letters.charAt(0)}`;
   console.log("🚀 ~ stringAvatar ~ reverse:", reverse);

   return {
      bgcolor: stringToColor(letters),
      color: stringToColor(letters),
      letters
   };
}
