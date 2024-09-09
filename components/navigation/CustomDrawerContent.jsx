import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Redirect, router, useRouter } from "expo-router";
import useAuthStore, { logout } from "../../stores/authStore";
import useGlobalStore from "../../stores/globalStore";
import { Image, Pressable, Text, View } from "react-native";
import {
   DrawerContentScrollView,
   DrawerItemList,
} from "@react-navigation/drawer";
import colors from "../../constants/colors";
import images from "../../constants/images";
import { Ionicons } from "@expo/vector-icons";
import ButtonCompnent from "../ButtonCompnent";
import TouchableContentComponent from "../TouchableContentComponent";

const CustomDrawerContent = async ({ ...props }) => {
   const { setIsLoading } = useGlobalStore();
   const { auth } = useAuthStore();
   const { top, bottom } = useSafeAreaInsets();

   const handlePressLogout = async () => {
      setIsLoading(true);
      await logout();
      setIsLoading(false);
      // return <Redirect href={"(auth)"} />;
      router.canDismiss() ? router.dismissAll() : router.replace("(auth)");
   };

   return (
      <View className={"flex-1"}>
         <DrawerContentScrollView
            {...props}
            contentContainerStyle={{ backgroundColor: colors.primary[200] }}>
            <TouchableContentComponent onPress={() => router.push("/profile")}>
               <View className={`justify-center items-center py-6 `}>
                  <Image
                     source={images.profile_manada}
                     className={"w-[100px] h-[100px] rounded-full"}
                     resizeMode="contain"
                  />
                  <Text
                     className={`font-msemibold text-primary-100 text-[15px]`}>
                     {auth?.email}
                  </Text>
               </View>
            </TouchableContentComponent>
            <View className={`bg-white pt-1`}>
               <DrawerItemList {...props} />
            </View>
         </DrawerContentScrollView>
         <View
            className={`pb-[${20 + bottom}]`}
            style={{ borderTopColor: colors.gray[100], borderTopWidth: 1 }}>
            <ButtonCompnent
               containerStyles={`w-full bg-gray-100/50 rounded-none`}
               textStyles={`text-gray-500`}
               icon={
                  <Ionicons
                     name="arrow-back-circle-sharp"
                     size={22}
                     color={colors.gray[500]}
                  />
               }
               title={"Cerrar Sesión"}
               handleOnPress={() => handlePressLogout()}
            />
         </View>
      </View>
   );
};
export default CustomDrawerContent;
