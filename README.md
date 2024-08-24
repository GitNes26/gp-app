# Welcome to your Expo app 👋
1. Crear Proyecto (Blank JS)

   ```bash
   npx create-expo-app . -t
   ```

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).



## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```


## Installacion de dependencias Basicas

2. librerias expo y react-native

   ```bash
   npm install react-dom --force

   npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-reanimated react-native-animatable expo-system-ui
   ```

   Si se utilizara una navegacion de Drawer...
   ```bash
   npx expo install @react-navigation/drawer react-native-gesture-handler react-native-reanimated
   ```


2. Tailwind con expo

   ```bash
   npm install nativewind
   npm install --save-dev tailwindcss@3.3.2
   npx tailwindcss init
   ```

3. Iconos - se ven lindos los de AntDesign

   ```bash
   npm install @expo/vector-icons
   ```

4. Animaciones - expo av, se comenta que significa audio y video

   ```bash
   npm install react-native-animatable expo-av
   ```

5. Instalar es lint -- para aviso de errores de sintaxis (teniendo instalado las extensiones de 'EsLint' y 'Prettier-Code Formater')

   ```bash
   npx expo lint
   npm install --save --save-dev --force prettier eslint-config-prettier eslint-plugin-prettier
   ```

6. Utilizar la cámara

   ```bash
   expo install expo-media-library
   expo install expo-camera
   ```


## Configuraciones

#### En el archivo babel.config.js

agregar la siguiente linea en el return como una propiedad más, debajo de **presets**

```json
plugins: ["nativewind/babel", "react-native-reanimated/plugin"],
```

#### En el archivo package.json

```json
  "main": "expo-router/entry",
```

#### En el archivo principal app (App.js)  //POSIBLEMENTE ESE SE OMITA

```js
import "react-native-gesture-handler";
```

#### En el archivo de tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
     extend: {
        colors: {
           primary: "#161622",
           secondary: {
              DEFAULT: "#FF9C01",
              100: "#FF9001",
              200: "#FF8E01",
           },
           black: {
              DEFAULT: "#000",
              100: "#1E1E2D",
              200: "#232533",
           },
           gray: {
              100: "#CDCDE0",
           },
        },
        fontFamily: {
           mthin: ["Montserrat-Thin", "sans-serif"],
           mextralight: ["Montserrat-ExtraLight", "sans-serif"],
           mlight: ["Montserrat-Light", "sans-serif"],
           mregular: ["Montserrat-Regular", "sans-serif"],
           mmedium: ["Montserrat-Medium", "sans-serif"],
           msemibold: ["Montserrat-SemiBold", "sans-serif"],
           mbold: ["Montserrat-Bold", "sans-serif"],
           mextrabold: ["Montserrat-ExtraBold", "sans-serif"],
           mblack: ["Montserrat-Black", "sans-serif"],
        },
     },
  },
  plugins: [],
};
```


#### En el archivo de .eslintrc.js

```js
// https://docs.expo.dev/guides/using-eslint/
module.exports = {
   extends: ["expo", "prettier"],
   plugins: ["prettier"],
   rules: { "prettier/prettier": "error" },
};

```