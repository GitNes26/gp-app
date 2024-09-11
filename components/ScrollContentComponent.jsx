import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ScrollContentComponent = ({ children }) => {
   const [keyboardHeight, setKeyboardHeight] = useState(0);

   // useEffect(() => {
   //    console.log("useEFect del KeyBoard");
   //    // console.log("🚀 ~ keyboardDidShowListener ~ Keyboard:", Keyboard);
   //    console.log("🚀 ~ keyboardDidShowListener ~ Keyboard:", Keyboard.metrics().height);
   //    // Evento que se dispara cuando el teclado aparece
   //    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (event) => {
   //       setKeyboardHeight(event.endCoordinates.height); // Guardamos la altura del teclado
   //    });

   //    // // Evento que se dispara cuando el teclado desaparece
   //    // const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
   //    //    setKeyboardHeight(0); // Restablecemos la altura cuando el teclado desaparece
   //    // });

   //    // // Limpia los listeners cuando el componente se desmonte
   //    // return () => {
   //    //    keyboardDidShowListener.remove();
   //    //    keyboardDidHideListener.remove();
   //    // };
   // }, [Keyboard?.metrics()?.height]);

   return (
      <KeyboardAwareScrollView
         contentContainerStyle={{ flexGrow: 1 }}
         // contentInsetAdjustmentBehavior="automatic"
         // extraScrollHeight={300} // Ajusta el valor según tus necesidades
         enableOnAndroid={true} // Asegúrate de que también funcione en Android
         keyboardShouldPersistTaps="handled" // Permitir que los taps persistan incluso con el teclado abierto
         // snapToOffsets={5}
         // automaticallyAdjustContentInsets={false}
         // enableAutomaticScroll={true} // Asegúrate de que el scroll esté habilitado automáticamente
         // extraScrollHeight={200} // Ajusta esta altura si necesitas más espacio para los campos de entrada
         // contentContainerStyle={{ flexGrow: 1 }}
         // keyboardShouldPersistTaps="handled"
         automaticallyAdjustContentInsets={true}
         automaticallyAdjustKeyboardInsets={true}
         alwaysBounceVertical={true}
      >
         {children}
      </KeyboardAwareScrollView>
   );
};
export default ScrollContentComponent;
