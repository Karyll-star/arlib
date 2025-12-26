import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Placeholder for Library Camera View
const LIBRARY_BG = 'https://images.unsplash.com/photo-1507842217153-69055ab90e47?q=80&w=2670&auto=format&fit=crop';

// --- Components ---

const DashboardCard = ({ icon, label, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    className="bg-background/95 w-[45%] p-4 rounded-2xl items-center justify-center mb-4 shadow-sm backdrop-blur-md"
  >
    <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mb-2">
      <Text className="text-xl text-primary">{icon}</Text>
    </View>
    <Text className="font-bold text-text-main">{label}</Text>
  </TouchableOpacity>
);

const MiniMap = ({ isNavigating }) => (
  <View className="absolute top-12 left-4 bg-background/90 p-3 rounded-xl shadow-lg max-w-[150px]">
    <View className="w-24 h-24 relative mb-2">
       <View className="absolute top-0 w-full h-2 bg-gray-300 rounded-full" />
       <View className="absolute top-6 w-full h-2 bg-gray-300 rounded-full" />
       <View className="absolute top-12 w-full h-2 bg-text-main rounded-full" />
       <View className="absolute top-18 w-full h-2 bg-gray-300 rounded-full" />
       
       <View className="absolute top-11 left-8 w-4 h-4 bg-primary rounded-full border-2 border-white shadow-sm z-10" />
       
       {isNavigating && (
          <View className="absolute top-12 left-8 w-16 h-12 border-l-2 border-b-2 border-primary rounded-bl-lg" />
       )}
    </View>
    <Text className="font-bold text-text-main text-xs">
      {isNavigating ? '前往：心理学书架' : '当前：书架B3区'}
    </Text>
  </View>
);

const ARArrow3D = () => (
  <View className="absolute top-20 right-8 items-center justify-center w-24 h-24">
    <View className="w-20 h-20 bg-primary/30 rounded-full absolute" />
    <View className="w-16 h-16 bg-primary/50 rounded-full absolute" />
    <View 
      className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px] border-b-primary"
      style={{ transform: [{ rotate: '45deg' }] }}
    />
  </View>
);

const ARPathOverlay = () => (
  <View className="absolute bottom-0 w-full h-1/2 items-center pointer-events-none">
     <View 
       className="h-full w-40 bg-accent/40"
       style={{ 
         transform: [
           { perspective: 800 },
           { rotateX: '60deg' },
           { scaleY: 2 }
         ],
         borderRadius: 20,
       }}
     >
       <View className="mt-10 items-center space-y-20 opacity-50">
          <View className="w-10 h-10 border-t-4 border-l-4 border-white rotate-45" />
          <View className="w-10 h-10 border-t-4 border-l-4 border-white rotate-45" />
          <View className="w-10 h-10 border-t-4 border-l-4 border-white rotate-45" />
       </View>
     </View>
  </View>
);

// --- Main Screen ---

export default function ARScreen() {
  const [step, setStep] = useState(0); 

  return (
    <ImageBackground 
      source={{ uri: LIBRARY_BG }} 
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1 bg-black/10 relative">
        
        {/* Top Overlay: Mini Map - Always visible */}
        <MiniMap isNavigating={step === 2} />

        {/* --- Step 0: Scanning Prompt --- */}
        {step === 0 && (
          <View className="flex-1 items-center justify-center">
            <View className="w-64 h-64 border-2 border-white/50 rounded-3xl items-center justify-center mb-8 relative">
                {/* Corner Markers */}
                <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl" />
                <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl" />
                <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl" />
                <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl" />
                
                <Ionicons name="scan-outline" size={48} color="white" style={{ opacity: 0.8 }} />
            </View>

            <TouchableOpacity 
              onPress={() => setStep(1)}
              className="bg-black/60 px-6 py-3 rounded-full flex-row items-center border border-white/20 backdrop-blur-md"
            >
              <Ionicons name="phone-portrait-outline" size={20} color="white" style={{ marginRight: 8 }} />
              <Text className="text-white text-base font-medium">
                请缓慢移动手机以识别周围环境
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* --- Step 1: Selection Mode --- */}
        {step === 1 && (
          <View className="flex-1 justify-end pb-32 px-4">
             {/* Center Prompt */}
             <View className="absolute top-1/2 left-0 right-0 items-center">
               <TouchableOpacity 
                 onPress={() => setStep(2)}
                 className="bg-primary/90 px-8 py-4 rounded-full shadow-lg border border-primary/50"
               >
                 <Text className="text-white text-lg font-bold">请选择目的地</Text>
               </TouchableOpacity>
             </View>

             {/* Bottom Grid */}
             <View className="flex-row flex-wrap justify-between">
               <DashboardCard icon="📕" label="询问AI" onPress={() => {}} />
               <DashboardCard icon="🤖" label="查看推荐" onPress={() => {}} />
               <DashboardCard icon="❤️" label="我的收藏" onPress={() => {}} />
               <DashboardCard icon="✏️" label="常用地点" onPress={() => {}} />
             </View>
          </View>
        )}

        {/* --- Step 2: Navigation Mode --- */}
        {step === 2 && (
          <View className="flex-1">
             {/* AR Overlays */}
             <ARArrow3D />
             <ARPathOverlay />

             {/* Destination Marker */}
             <View className="absolute top-1/3 left-1/2 -ml-10 items-center">
                <View className="bg-background/90 px-3 py-1 rounded-full mb-1">
                   <Text className="font-bold text-text-main">目标: 心理学区</Text>
                </View>
                <View className="w-4 h-4 bg-accent rounded-full border-2 border-white shadow-lg" />
                <View className="w-1 h-16 bg-white/50" />
             </View>

             {/* Bottom Controls */}
             <View className="absolute bottom-32 w-full items-center">
                <TouchableOpacity 
                  onPress={() => setStep(0)}
                  className="bg-white px-8 py-3 rounded-full shadow-lg elevation-5 flex-row items-center"
                >
                  <Text className="text-accent text-xl font-bold mr-2">⏹</Text>
                  <Text className="text-text-main text-lg font-bold">结束导航</Text>
                </TouchableOpacity>
             </View>
          </View>
        )}

      </SafeAreaView>
    </ImageBackground>
  );
}