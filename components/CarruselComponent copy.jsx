import {
   FlatList,
   Image,
   ImageBackground,
   TouchableOpacity,
} from "react-native";
import { useState } from "react";
import * as Animatable from "react-native-animatable";
import icons from "../constants/icons";
import { ResizeMode, Video } from "expo-av";

const zoomIn = {
   0: { scale: 0.9 },
   1: { scale: 1 },
};
const zoomOut = {
   0: { scale: 1 },
   1: { scale: 0.9 },
};

const CarruselItem = ({ item, activeItem }) => {
   const [play, setPlay] = useState(false);

   console.log(
      "🚀 ~ CarruselItem ~ activeItem === item:",
      activeItem,
      " --- ",
      item,
   );
   return (
      <Animatable.View
         className={"mr-5"}
         animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
         duration={500}>
         {play ? (
            <Video
               key={`key-Video-${item.$id}`}
               source={{
                  uri: "../assets/videos/DEADPOOL-WOLVERINE.mp3",
               }}
               className={"w-52 h-72 rounded-[35px] mt-3 bg-white/10"}
               resizeMode={ResizeMode.CONTAIN}
               useNativeControls={true}
               shouldPlay={true}
               onPlaybackStatusUpdate={(status) => {
                  if (status.didJustFinish) setPlay(false);
               }}
            />
         ) : (
            <TouchableOpacity
               activeOpacity={0.7}
               className={
                  "rounded-xl mt-3 relative justify-center items-center"
               }
               onPress={() => setPlay(true)}>
               <ImageBackground
                  source={{ uri: item.thumbnailUrl }}
                  className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
                  resizeMode="cover"
               />
               <Image
                  source={icons.play}
                  className="w-12 h-12 absolute"
                  resizeMode="contain"
               />
            </TouchableOpacity>
         )}
      </Animatable.View>
   );
};

const CarruselComponent = ({ data }) => {
   const [activeItem, setActiveItem] = useState(data[1]);

   const handleViewableChanged = ({ viewableItems }) => {
      console.log("🚀 ~ handleViewableChanged ~ viewableItems:", viewableItems);
      if (viewableItems.length > 0) setActiveItem(viewableItems[0].key);
   };

   return (
      <FlatList
         data={data}
         keyExtractor={(item) => item.$id}
         renderItem={({ item }) => (
            <CarruselItem item={item} activeItem={activeItem} />
         )}
         // onViewableItemsChanged={handleViewableChanged}
         // viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
         contentOffset={{ x: 170 }}
         horizontal
      />
   );
};

export default CarruselComponent;
