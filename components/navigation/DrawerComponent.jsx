import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Drawer } from "expo-router/drawer";
import { Redirect, router } from "expo-router";
import useAuthStore, { logout } from "../../stores/authStore";
import useGlobalStore from "../../stores/globalStore";
import { Image, Text, View } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import colors from "../../constants/colors";
import images from "../../constants/images";
import { Ionicons } from "@expo/vector-icons";
import ButtonCompnent from "../ButtonCompnent";
import TouchableContentComponent from "../TouchableContentComponent";
import { useEffect } from "react";
import AvatarComponent from "../AvatarComponent";

const CustomDrawerContent = ({ ...props }) => {
   const { setIsLoading } = useGlobalStore();
   const { auth } = useAuthStore();
   const { top, bottom } = useSafeAreaInsets();

   const handlePressLogout = async () => {
      setIsLoading(true);
      await logout();
      setIsLoading(false);
      // return <Redirect href={"(auth)"} />;
      if (router.canDismiss()) router.dismissAll();
      else return <Redirect href={"(auth)"} />;
   };

   return (
      <View className={"flex-1"}>
         <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: colors.primary[200] }}>
            <TouchableContentComponent onPress={() => router.push("profile")}>
               <AvatarComponent size={"md"} caption={<Text className={`font-msemibold text-primary-100 text-[15px]`}>{auth?.email}</Text>} styleContainer={`py-5`} />
            </TouchableContentComponent>
            <View className={`bg-white pt-1`}>
               <DrawerItemList {...props} />
            </View>
         </DrawerContentScrollView>
         <View className={`pb-[${20 + bottom}]`} style={{ borderTopColor: colors.gray[100], borderTopWidth: 1 }}>
            <ButtonCompnent
               containerStyles={`w-full bg-gray-100/50 rounded-none`}
               textStyles={`text-gray-500`}
               icon={<Ionicons name="arrow-back-circle-sharp" size={22} color={colors.gray[500]} />}
               title={"Cerrar Sesión"}
               handleOnPress={() => handlePressLogout()}
            />
         </View>
      </View>
   );
};

const DrawerGroup = ({ data }) => {
   return (
      <Drawer
         drawerContent={CustomDrawerContent}
         screenOptions={{
            drawerActiveBackgroundColor: colors.primary.DEFAULT,
            drawerActiveTintColor: colors.primary[100],
            drawerLabelStyle: { marginLeft: -20, fontWeight: "bold" },
            // drawerHideStatusBarOnOpen: true,
            headerTitleStyle: {
               fontWeight: "800"
            },
            headerTitleContainerStyle: {
               // backgroundColor: "red",
               width: "100%",
               alignItems: "center"
            },
            headerStyle: {
               // backgroundColor: "yellow",
               // height: "10%",
            },
            headerShown: true,
            headerShadowVisible: true
            // header: () => <HeaderComponent />,
            // headerLeft: () => (
            //    <ImagePressableComponent
            //       image={images.profile_manada}
            //       imageClassesStyle={`rounded-full ml-2`}
            //    />
            // ),
            // headerRight: () => (
            //    <View className={`mr-2`}>
            //       <LogoComponent />
            //    </View>
            // ),
         }}
      >
         {data.map((item) => (
            <Drawer.Screen
               key={`key-drawer-screen-${item.name}`}
               name={item.name} // This is the name of the page and must match the url from root
               options={({ route }) => ({
                  drawerItemStyle: {
                     display: !item.show ? "none" : "flex"
                  },
                  headerShown: item.headerShown,
                  header: item.header,
                  drawerLabel: item.label,
                  headerTitle: item.title,
                  drawerIcon: ({ size, color, focused }) => {
                     // let iconName = "";
                     // if (route.name === "home")
                     //    iconName = focused ? "home" : "home-outline";
                     // else if (route.name === "index")
                     //    iconName = focused
                     //       ? "notifications"
                     //       : "notifications-outline";
                     // else if (route.name === "Settings")
                     //    iconName = focused ? "settings" : "settings-outline";
                     return <Ionicons name={focused ? item.icon.focus : item.icon.disfocus} size={size} color={color} />;
                  }
               })}
            />
         ))}
      </Drawer>
   );
};
export default DrawerGroup;
