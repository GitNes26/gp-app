import { Image, Text, View } from "react-native";
import images from "../constants/images";
import { useEffect, useState } from "react";
import { stringAvatar } from "../utils/formats";
import colors from "../constants/colors";
import useAuthStore from "../stores/authStore";

const AvatarComponent = ({ caption, img = false, size, styleContainer }) => {
   const { auth } = useAuthStore();
   // const [avatar, setAvatar] = useState({ bgcolor: colors.primary[100], color: colors.primary[200], letters: "US" });

   const letters = auth ? `${auth.name.slice(0, 1)}${auth.paternal_last_name.slice(0, 1)}` : "?";

   let bgSize;
   let fontSize;
   switch (size) {
      case "sm":
         bgSize = "w-[50px] h-[50px]";
         fontSize = "text-[20px]";
         break;
      case "md":
         bgSize = "w-[100px] h-[100px]";
         fontSize = "text-[45px]";
         break;
      case "lg":
         bgSize = "w-[150px] h-[150px]";
         fontSize = "text-[65px]";
         break;
      default:
         bgSize = "w-[100px] h-[100px]";
         fontSize = "text-[45px]";
         break;
   }

   // useEffect(() => {
   //    console.log("el efect");
   //    (async () => {
   //       console.log("el async del efect");
   //       if (name) {
   //          setAvatar(stringAvatar(name));
   //          console.log("🚀 ~ stringAvatar(name):", stringAvatar(name));
   //       }
   //    })();
   // }, []);

   return (
      <View className={`justify-center items-center my-4 ${styleContainer}`}>
         {img ? (
            <Image source={images.profile_manada} className={`w-${size} h-${size} rounded-full`} resizeMode="contain" />
         ) : (
            <View className={`${bgSize} bg-primary text-center rounded-full flex items-center justify-center mb-1`}>
               <Text className={`${fontSize} text-primary-100 font-mbold`}>{letters.toUpperCase()}</Text>
            </View>
         )}
         {caption && caption}
      </View>
   );
};
export default AvatarComponent;
