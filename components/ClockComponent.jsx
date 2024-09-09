import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { formatDatetime } from "../utils/formats";

const ClockComponent = ({ stylesBox, styleText }) => {
   const [currentDatetime, setCurrenDatetime] = useState(new Date());

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrenDatetime(new Date());
      }, 1000);

      return () => clearInterval(interval);
   }, []);

   return (
      <View sx={stylesBox}>
         <Text className={`font-msemibold text-gray-700 ${styleText}`}>
            {formatDatetime(currentDatetime, true, "dddd DD/MM/YYYY h:mm:ss a")}
         </Text>
      </View>
   );
};

export default ClockComponent;
