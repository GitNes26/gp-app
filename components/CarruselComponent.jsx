import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
   FlatList,
   Image,
   ImageBackground,
   TouchableOpacity,
} from "react-native";
import icons from "../constants/icons";

const zoomIn = {
   0: {
      scale: 0.9,
   },
   1: {
      scale: 1,
   },
};

const zoomOut = {
   0: {
      scale: 1,
   },
   1: {
      scale: 0.9,
   },
};

const CarruselItem = ({ activeItem, item }) => {
   // console.log(
   //    "🚀 ~ CarruselItem ~ activeItem, item :",
   //    activeItem,
   //    "--------------",
   //    item,
   // );
   const [play, setPlay] = useState(false);

   return (
      <Animatable.View
         key={`key-Animatable.View${item.id}`}
         className="mr-5"
         animation={activeItem === item.$id ? zoomIn : zoomOut}
         duration={500}>
         {play ? (
            <Video
               key={`key-Video-${item.$id}`}
               source={{
                  uri: "../assets/videos/DEADPOOL-WOLVERINE.mp3",
               }}
               className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
               resizeMode={ResizeMode.CONTAIN}
               useNativeControls
               shouldPlay
               onPlaybackStatusUpdate={(status) => {
                  if (status.didJustFinish) {
                     setPlay(false);
                  }
               }}
            />
         ) : (
            <TouchableOpacity
               className="relative flex justify-center items-center"
               activeOpacity={0.7}
               onPress={() => setPlay(true)}>
               <ImageBackground
                  source={{
                     uri: item.thumbnailUrl,
                  }}
                  className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
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
   const [activeItem, setActiveItem] = useState(data[0]);

   const viewableItemsChanged = ({ viewableItems }) => {
      console.log("algo porfaaaa");
      if (viewableItems.length > 0) {
         setActiveItem(viewableItems[0].key);
      }
   };

   return (
      <FlatList
         data={data}
         horizontal
         keyExtractor={(item) => item.$id}
         renderItem={({ item }) => (
            <CarruselItem activeItem={activeItem} item={item} />
         )}
         onViewableItemsChanged={viewableItemsChanged}
         viewabilityConfig={{
            itemVisiblePercentThreshold: 70,
         }}
         contentOffset={{ x: 170 }}
      />
   );
};

export default CarruselComponent;
